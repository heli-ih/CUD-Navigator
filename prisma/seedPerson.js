const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedData() {
  try {
    const personsData = [
      {
        name: "Dr. Said Elnaffar",
        position: "Associate Professor",
        locationTag: "HUB G09",
        photo: null,
      },
      {
        name: "Dr. Ziad El-Khatib",
        position: "Assistant Professor",
        locationTag: "HUB G06",
        photo: null,
      },
      {
        name: "Dr. Maha Salman",
        position: "Head of Department of Interior Design",
        locationTag: "HUB G05",
        photo: null,
      },
      {
        name: "Dr. Ahmed Al Gindy",
        position: "Assistant Professor",
        locationTag: "HUB G08",
        photo: null,
      },
      {
        name: "Dr. Tamer Mohamed",
        position: "Assistant Professor",
        locationTag: "HUB G10",
        photo: null,
      },
      {
        name: "Mr. Ahmed Seyam",
        position: "Lecturer",
        locationTag: "HUB G11",
        photo: null,
      },
      {
        name: "Dr. Yasir Fahim",
        position: "Associate Professor",
        locationTag: "HUB G07",
        photo: null,
      },
      {
        name: "Dr. Salih Majeed",
        position: "Assistant Professor",
        locationTag: "HUB G11",
        photo: null,
      },
    ];

    for (const personData of personsData) {
      await prisma.person.create({
        data: {
          name: personData.name,
          position: personData.position,
          photo: personData.photo,
          location: {
            connect: { name: personData.locationTag },
          },
        },
      });
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
