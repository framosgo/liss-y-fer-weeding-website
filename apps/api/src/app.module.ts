import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './modules/prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { RsvpModule } from './modules/rsvp/rsvp.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { GuestbookModule } from './modules/guestbook/guestbook.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
    PrismaModule,
    HealthModule,
    InvitationModule,
    RsvpModule,
    AnnouncementsModule,
    GuestbookModule,
    AuthModule,
    AdminModule
  ]
})
export class AppModule {}
