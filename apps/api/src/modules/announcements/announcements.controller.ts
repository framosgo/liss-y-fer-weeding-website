import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.announcement.findMany({
      where: {
        isActive: true,
        OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }]
      },
      orderBy: [{ priority: 'desc' }, { publishedAt: 'desc' }]
    });
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  create(@Body() body: { title: string; body: string; priority?: 'LOW' | 'NORMAL' | 'HIGH' }) {
    return this.prisma.announcement.create({
      data: {
        title: body.title,
        body: body.body,
        priority: body.priority ?? 'NORMAL'
      }
    });
  }
}
