import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('guests')
@Controller('guests')
export class GuestsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('lookup/:code')
  async lookup(@Param('code') code: string) {
    const party = await this.prisma.guestParty.findUnique({
      where: { invitationCode: code.toUpperCase() },
      include: { attendees: true }
    });
    if (!party) throw new NotFoundException('Invitation code not found');
    return party;
  }
}
