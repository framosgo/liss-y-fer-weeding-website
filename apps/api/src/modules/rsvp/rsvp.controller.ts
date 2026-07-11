import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { PrismaService } from '../prisma/prisma.service';

const rsvpSchema = z.object({
  invitationCode: z.string().min(3),
  guests: z.array(
    z.object({
      id: z.string(),
      attending: z.boolean(),
      meal: z.string(),
      allergies: z.string().optional()
    }),
  ),
  songRequest: z.string().optional(),
  note: z.string().optional()
});

const mealMap: Record<string, 'SEA_BASS' | 'CHICKEN' | 'RISOTTO' | 'CHILD'> = {
  'Sea bass': 'SEA_BASS',
  'Herb roasted chicken': 'CHICKEN',
  'Wild mushroom risotto': 'RISOTTO',
  'Child meal': 'CHILD'
};

@ApiTags('rsvp')
@Controller('rsvp')
export class RsvpController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async submit(@Body() body: unknown) {
    const parsed = rsvpSchema.safeParse(body);
    if (!parsed.success) throw new BadRequestException(parsed.error.flatten());
    const party = await this.prisma.guestParty.findUnique({
      where: { invitationCode: parsed.data.invitationCode.toUpperCase() },
      include: { attendees: true }
    });
    if (!party) throw new BadRequestException('Invitation code not found');

    const anyAttending = parsed.data.guests.some((guest) => guest.attending);
    await this.prisma.$transaction([
      this.prisma.guestParty.update({
        where: { id: party.id },
        data: {
          status: anyAttending ? 'CONFIRMED' : 'DECLINED',
          note: parsed.data.note,
          songRequest: parsed.data.songRequest
        }
      }),
      ...parsed.data.guests.map((guest) =>
        this.prisma.attendee.update({
          where: { id: guest.id },
          data: {
            attending: guest.attending,
            meal: mealMap[guest.meal] ?? 'RISOTTO',
            allergies: guest.allergies
          }
        }),
      )
    ]);

    return { ok: true, status: anyAttending ? 'CONFIRMED' : 'DECLINED' };
  }
}
