import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.announcement.createMany({
    data: [
      {
        title: 'Room block reminder',
        body: 'Hotel blocks are held until March 1, 2027. Mention Clara and Mateo when booking.',
        priority: 'HIGH'
      },
      {
        title: 'Welcome drinks',
        body: 'Join us Friday at 20:30 at Bar Alfalfa for informal tapas and hugs.',
        priority: 'NORMAL'
      }
    ],
    skipDuplicates: true
  });

  const parties = [
    {
      invitationCode: 'OLIVE-2027',
      primaryName: 'Sofia Alvarez',
      email: 'sofia@example.com',
      attendees: ['Sofia Alvarez', 'Diego Marin']
    },
    {
      invitationCode: 'ROSE-2027',
      primaryName: 'The Bennett Family',
      email: 'bennetts@example.com',
      attendees: ['Amelia Bennett', 'Noah Bennett', 'Luca Bennett']
    },
    {
      invitationCode: 'BURGUNDY-2027',
      primaryName: 'Isabel Romero',
      email: 'isabel@example.com',
      attendees: ['Isabel Romero']
    }
  ];

  for (const party of parties) {
    await prisma.guestParty.upsert({
      where: { invitationCode: party.invitationCode },
      update: {},
      create: {
        invitationCode: party.invitationCode,
        primaryName: party.primaryName,
        email: party.email,
        partySize: party.attendees.length,
        attendees: {
          create: party.attendees.map((name) => ({ name }))
        }
      }
    });
  }

  await prisma.guestbookEntry.createMany({
    data: [
      { name: 'Lucia', message: 'Counting down to the most beautiful Sevillian night.' },
      { name: 'Andre', message: 'My dance shoes are already packed.' }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
