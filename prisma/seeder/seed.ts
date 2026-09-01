import 'dotenv/config';
import {PrismaClient} from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({adapter});

async function main() {
    console.log('Start seeding...');

    const result = await prisma.task.createMany({
        data: [
            {
                title: 'Learn React',
                description: 'Learn React description',
                completed: false,
            },
            {
                title: 'Learn golang',
                description: 'Learn golang description',
                completed: true,
            },
        ],
    });
    console.log(`Inserted ${result.count} tasks`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());