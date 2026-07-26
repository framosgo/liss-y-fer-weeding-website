import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('invitations')
@Controller('invitations')
export class InvitationController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':code')
  async lookup(@Param('code') code: string) {
    const party = await this.prisma.guestParty.findUnique({
      where: { invitationCode: code.toUpperCase() },
      include: { guests: true }
    });
    if (!party) throw new NotFoundException('Invitation code not found');
    return party;
  }
}
