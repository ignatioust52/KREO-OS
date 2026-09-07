const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // 1. Create User
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      passwordHash: passwordHash,
    },
  });

  // 2. Create Business
  const business = await prisma.business.create({
    data: {
      name: 'John Photography',
      slug: 'john-photography',
      members: {
        create: {
          userId: user.id,
          role: 'OWNER',
        }
      }
    }
  });

  // 3. Create Clients
  const client1 = await prisma.client.create({
    data: {
      name: 'Sarah K.',
      type: 'INDIVIDUAL',
      email: 'sarah@example.com',
      businessId: business.id,
    }
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Bliss Paints',
      type: 'BUSINESS',
      email: 'hello@blisspaints.co.ug',
      businessId: business.id,
    }
  });

  // 4. Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Sarah & John Wedding',
      status: 'ACTIVE',
      businessId: business.id,
      clientId: client1.id,
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
