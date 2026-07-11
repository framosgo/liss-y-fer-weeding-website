import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { PrismaService } from '../prisma/prisma.service';

const entrySchema = z.object({
  name: z.string().min(1).max(80),
  message: z.string().min(1).max(700)
});

@ApiTags('guestbook')
@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.guestbookEntry.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
      take: 30
    });
  }

  @Post()
  create(@Body() body: unknown) {
    const parsed = entrySchema.safeParse(body);
    if (!parsed.success) throw new BadRequestException(parsed.error.flatten());
    return this.prisma.guestbookEntry.create({ data: parsed.data });
  }
}
