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
      allergies: z.string().optional()
    }),
  ),
  songRequest: z.string().optional(),
  requiresBus: z.boolean().optional(),
  note: z.string().optional()
});

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
      include: { guests: true }
    });
    if (!party) throw new BadRequestException('Código de invitación no encontrado');

    const anyAttending = parsed.data.guests.some((guest) => guest.attending);
    await this.prisma.$transaction([
      this.prisma.guestParty.update({
        where: { id: party.id },
        data: {
          status: anyAttending ? 'CONFIRMED' : 'DECLINED',
          note: parsed.data.note,
          songRequest: parsed.data.songRequest,
          requiresBus: anyAttending ? (parsed.data.requiresBus ?? false) : false
        }
      }),
      ...parsed.data.guests.map((guest) =>
        this.prisma.guest.update({
          where: { id: guest.id },
          data: {
            attending: guest.attending,
            allergies: guest.allergies
          }
        }),
      )
    ]);

    return { ok: true, status: anyAttending ? 'CONFIRMED' : 'DECLINED' };
  }
}
