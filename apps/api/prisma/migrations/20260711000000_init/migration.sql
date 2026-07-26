CREATE TYPE "RSVPStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DECLINED');
CREATE TYPE "AnnouncementPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH');

CREATE TABLE "GuestParty" (
  "id" TEXT NOT NULL,
  "invitationCode" TEXT NOT NULL,
  "primaryName" TEXT NOT NULL,
  "email" TEXT,
  "partySize" INTEGER NOT NULL,
  "status" "RSVPStatus" NOT NULL DEFAULT 'PENDING',
  "note" TEXT,
  "songRequest" TEXT,
  "requiresBus" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "GuestParty_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Guest" (
  "id" TEXT NOT NULL,
  "partyId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "attending" BOOLEAN,
  "allergies" TEXT,
  CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Announcement" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "priority" "AnnouncementPriority" NOT NULL DEFAULT 'NORMAL',
  "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3),
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "GuestbookEntry" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "approved" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GuestbookEntry_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "GuestParty_invitationCode_key" ON "GuestParty"("invitationCode");
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "GuestParty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
