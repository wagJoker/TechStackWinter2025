import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 50; i++) {
        await prisma.artwork.create({
            data: {
                title: faker.lorem.words(3),
                artist: faker.name.fullName(),
                type: faker.helpers.arrayElement(['painting', 'sculpture', 'photography', 'digital', 'mixed_media']),
                price: parseFloat(faker.commerce.price(100, 10000, 2)),
                availability: faker.datatype.boolean(),
                imageUrl: faker.image.imageUrl(),
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
