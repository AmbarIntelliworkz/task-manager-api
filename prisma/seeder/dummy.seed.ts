import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import {faker} from '@faker-js/faker';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({adapter});

async function main() {
    const tasks = Array.from({ length: 30000}, () => ({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        completed: faker.datatype.boolean()
    }));

    await prisma.task.createMany({ data: tasks });

    console.log('Dummy data seeded successfully!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());