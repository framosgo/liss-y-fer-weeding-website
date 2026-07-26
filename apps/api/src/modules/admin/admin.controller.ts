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
    const [confirmed, declined, pending, guests, parties] = await Promise.all([
      this.prisma.guestParty.count({ where: { status: 'CONFIRMED' } }),
      this.prisma.guestParty.count({ where: { status: 'DECLINED' } }),
      this.prisma.guestParty.count({ where: { status: 'PENDING' } }),
      this.prisma.guest.findMany({ where: { attending: true } }),
      this.prisma.guestParty.findMany({ where: { status: 'PENDING' }, select: { primaryName: true, invitationCode: true, email: true } })
    ]);

    return {
      confirmed,
      declined,
      pending,
      totalAttending: confirmed,
      allergyCount: guests.filter((guest) => guest.allergies?.trim()).length,
      songRequests: await this.prisma.guestParty.count({ where: { songRequest: { not: null } } }),
      requiresBus: await this.prisma.guest.count({
        where: { attending: true, party: { requiresBus: true } },
      }),
      pendingGuests: parties
    };
  }

  @Get('export')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="wedding-rsvps.csv"')
  async exportCsv() {
    const parties = await this.prisma.guestParty.findMany({ include: { guests: true }, orderBy: { primaryName: 'asc' } });
    const rows = ['party,code,status,guest,attending,allergies,song_request,requires_bus,note'];
    for (const party of parties) {
      for (const guest of party.guests) {
        rows.push(
          [
            party.primaryName,
            party.invitationCode,
            party.status,
            guest.name,
            guest.attending ?? '',
            guest.allergies ?? '',
            party.songRequest ?? '',
            party.requiresBus,
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
