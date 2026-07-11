import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('stats')
  async stats() {
    const [confirmed, declined, pending, attendees, parties] = await Promise.all([
      this.prisma.guestParty.count({ where: { status: 'CONFIRMED' } }),
      this.prisma.guestParty.count({ where: { status: 'DECLINED' } }),
      this.prisma.guestParty.count({ where: { status: 'PENDING' } }),
      this.prisma.attendee.findMany({ where: { attending: true } }),
      this.prisma.guestParty.findMany({ where: { status: 'PENDING' }, select: { primaryName: true, invitationCode: true, email: true } })
    ]);

    const mealCounts = attendees.reduce<Record<string, number>>((counts, attendee) => {
      const key = attendee.meal ?? 'UNSELECTED';
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {});

    return {
      confirmed,
      declined,
      pending,
      totalAttending: attendees.length,
      allergyCount: attendees.filter((attendee) => attendee.allergies?.trim()).length,
      songRequests: await this.prisma.guestParty.count({ where: { songRequest: { not: null } } }),
      mealCounts,
      pendingGuests: parties
    };
  }

  @Get('export')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="wedding-rsvps.csv"')
  async exportCsv() {
    const parties = await this.prisma.guestParty.findMany({ include: { attendees: true }, orderBy: { primaryName: 'asc' } });
    const rows = ['party,code,status,guest,attending,meal,allergies,song_request,note'];
    for (const party of parties) {
      for (const attendee of party.attendees) {
        rows.push(
          [
            party.primaryName,
            party.invitationCode,
            party.status,
            attendee.name,
            attendee.attending ?? '',
            attendee.meal ?? '',
            attendee.allergies ?? '',
            party.songRequest ?? '',
            party.note ?? ''
          ]
            .map((value) => `"${String(value).replaceAll('"', '""')}"`)
            .join(','),
        );
      }
    }
    return rows.join('\n');
  }
}
