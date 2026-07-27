import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const parties = [
  {
    invitationCode: 'MACHITA-GONZALEZ',
    primaryName: 'Marilú González',
    guests: ['Marilú González', 'Emérita Castillo']
  },
  {
    invitationCode: 'LLEMPEN-RAMOS',
    primaryName: 'Familia Llempén',
    guests: ['Alejandra Ramos', 'Bruno Llempén', 'Alessia Llempén']
  },
  {
    invitationCode: 'RAMOS-LEE',
    primaryName: 'Renato Ramos',
    guests: ['Renato Ramos', '이혜원']
  },
  {
    invitationCode: 'GONZALEZ-JIMENEZ',
    primaryName: 'Javier Gonzalez',
    guests: ['Javier Gonzalez', 'Flor Jiménez']
  },
  {
    invitationCode: 'PAMELA-JHONNY',
    primaryName: 'Pamela González',
    guests: ['Pamela González', 'Jhonny']
  },
  {
    invitationCode: 'GONZALEZ-LAURA',
    primaryName: 'Laura Gonzalez',
    guests: ['Laura Gonzalez']
  },
  {
    invitationCode: 'GONZALEZ-SANDRA',
    primaryName: 'Sandra González',
    guests: ['Sandra González']
  },
  {
    invitationCode: 'GARCIA-GONZALEZ',
    primaryName: 'Carola García',
    guests: ['Carola García', 'José González']
  },
  {
    invitationCode: 'ROBAYO-MARISA',
    primaryName: 'Marisa Robayo',
    guests: ['Marisa Robayo']
  },
  {
    invitationCode: 'SIMO-MARIN',
    primaryName: 'Carlos Simo',
    guests: ['Carlos Simo', 'Dagmar Marín']
  },
  {
    invitationCode: 'VIANEY-JHILZEN',
    primaryName: 'Vianey Balderrama',
    guests: ['Vianey Balderrama']
  },
  {
    invitationCode: 'ANGEL-ALEJANDRO',
    primaryName: 'Angel Jiménez',
    guests: ['Angel Jiménez']
  },
  {
    invitationCode: 'WENBIN-SUN',
    primaryName: 'Wenbin Sun',
    guests: ['Wenbin Sun']
  },
  {
    invitationCode: 'CARRILLO-ALBERTO',
    primaryName: 'Alberto Carrillo',
    guests: ['Alberto Carrillo']
  },
  {
    invitationCode: 'AVILES-LASCANO',
    primaryName: 'Familia Aviles',
    guests: ['Gloria Aviles', 'Fausto Lascano', 'Jacinta Pérez', 'Miguel Aviles']
  },
  {
    invitationCode: 'PARRAGA-HOMERO',
    primaryName: 'Homero Párraga',
    guests: ['Homero Párraga']
  },
  {
    invitationCode: 'PARRAGA-QIU',
    primaryName: 'Joseline Párraga',
    guests: ['Joseline Párraga', 'Luca Qiu', 'Serena']
  },
  {
    invitationCode: 'PARRAGA-DEREK',
    primaryName: 'Derek Párraga',
    guests: ['Derek Párraga']
  },
  {
    invitationCode: 'PARRAGA-MUNIZ',
    primaryName: 'Paola Párraga',
    guests: ['Paola Párraga', 'Tainara Muñiz']
  },
  {
    invitationCode: 'AVILES-MIGUEL',
    primaryName: 'Miguel Aviles',
    guests: ['Miguel Aviles']
  },
  {
    invitationCode: 'LASCANO-RAMOS',
    primaryName: 'Pablo Lascano',
    guests: ['Pablo Lascano', 'Alondra Ramos', 'Elijah', 'Lyana']
  },
  {
    invitationCode: 'CALDERON-AZUERO',
    primaryName: 'Emilia Calderón',
    guests: ['Emilia Calderón', 'Raúl Azuero', 'Mariana']
  },
  {
    invitationCode: 'AZUERO-KORINA',
    primaryName: 'Korina Azuero',
    guests: ['Korina Azuero']
  },
  {
    invitationCode: 'AZUERO-PRISCILA',
    primaryName: 'Priscila Azuero',
    guests: ['Priscila Azuero']
  },
  {
    invitationCode: 'AZUERO-LILIBETH',
    primaryName: 'Lilibeth Azuero',
    guests: ['Lilibeth Azuero']
  },
  {
    invitationCode: 'AZUERO-LIAM',
    primaryName: 'Liam Azuero',
    guests: ['Liam Azuero']
  },
  {
    invitationCode: 'ANGULO-OLILIA',
    primaryName: 'Olilia Angulo',
    guests: ['Olilia Angulo']
  },
  {
    invitationCode: 'CALDERON-ROBERTO',
    primaryName: 'Roberto Calderón',
    guests: ['Roberto Calderón']
  },
  {
    invitationCode: 'CALDERON-TARQUINO',
    primaryName: 'Paul Calderón',
    guests: ['Paul Calderón', 'Lida Tarquino', 'Aylen', 'Chloe', 'Johan']
  },
  {
    invitationCode: 'CALDERON-MENDEZ',
    primaryName: 'Saida Calderón',
    guests: ['Saida Calderón', 'Daniel Méndez']
  },
  {
    invitationCode: 'CALDERON-MARQUEZ',
    primaryName: 'Sonia Márquez',
    guests: ['Manuel Calderón', 'Sonia Márquez', ]
  },
  {
    invitationCode: 'CALDERON-CAROLINA',
    primaryName: 'Carolina Calderón',
    guests: ['Carolina Calderón']
  },
  {
    invitationCode: 'CALDERON-GUZMAN',
    primaryName: 'Julio Calderón',
    guests: ['Julio Calderón', 'Nicole Guzmán']
  },
  {
    invitationCode: 'SILVA-KEVIN',
    primaryName: 'Kevin Silva',
    guests: ['Kevin Silva']
  },
  {
    invitationCode: 'MELLADO-BARBA',
    primaryName: 'Jessica Mellado',
    guests: ['Jessica Mellado', 'Chema Barba', 'Adam Barba']
  },
  {
    invitationCode: 'MIR-ALBA',
    primaryName: 'Alba Mir',
    guests: ['Alba Mir']
  },
  {
    invitationCode: 'MONCLUS-ANNA',
    primaryName: 'Anna Monclús',
    guests: ['Anna Monclús']
  },
  {
    invitationCode: 'PENA-LIDIA',
    primaryName: 'Lidia Peña',
    guests: ['Lidia Peña']
  },
  {
    invitationCode: 'ALLAUCA-DAYANA',
    primaryName: 'Dayana Allauca',
    guests: ['Dayana Allauca']
  },
  {
    invitationCode: 'MARTINEZ-DANIELA',
    primaryName: 'Daniela Martinez',
    guests: ['Daniela Martinez']
  },
  {
    invitationCode: 'SCHMITT-MARCELA',
    primaryName: 'Marcela Schmitt',
    guests: ['Marcela Schmitt']
  },
  {
    invitationCode: 'QUISPE-MICHAEL',
    primaryName: 'Michael Quispe',
    guests: ['Michael Quispe']
  }
];

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

  await prisma.guest.deleteMany();
  await prisma.guestParty.deleteMany();

  for (const party of parties) {
    await prisma.guestParty.create({
      data: {
        invitationCode: party.invitationCode,
        primaryName: party.primaryName,
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

  console.log(`Seeded ${parties.length} invitations`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
