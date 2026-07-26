import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.announcement.createMany({
    data: [
      {
        title: 'Recordatorio de alojamiento',
        body: 'Os recomendamos reservar alojamiento en Barcelona ciudad para facilitar los traslados.',
        priority: 'HIGH'
      },
      {
        title: 'Bienvenida',
        body: 'Nos vemos el viernes a las 20:30 para un encuentro informal antes de la boda.',
        priority: 'NORMAL'
      }
    ],
    skipDuplicates: true
  });

  const parties = [
    {
      invitationCode: 'GUMIRA-2026',
      primaryName: 'Sofía Álvarez',
      email: 'sofia@example.com',
      guests: ['Sofía Álvarez', 'Diego Marín']
    },
    {
      invitationCode: 'BARCELONA-2026',
      primaryName: 'Familia Romero',
      email: 'romero@example.com',
      guests: ['Amelia Romero', 'Noah Romero', 'Luca Romero']
    },
    {
      invitationCode: 'OLIVA-2026',
      primaryName: 'Isabel Romero',
      email: 'isabel@example.com',
      guests: ['Isabel Romero']
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
        partySize: party.guests.length,
        guests: {
          create: party.guests.map((name) => ({ name }))
        }
      }
    });
  }

  await prisma.guestbookEntry.createMany({
    data: [
      { name: 'Lucía', message: 'Contando los días para una noche preciosa en Barcelona.' },
      { name: 'Andrés', message: 'Mis zapatos de baile ya están preparados.' }
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
