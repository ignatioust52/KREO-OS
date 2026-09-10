const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // 1. Create User
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {
      passwordHash: passwordHash,
      name: 'John Doe',
    },
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      passwordHash: passwordHash,
    },
  });

  // 2. Create Business
  const business = await prisma.business.upsert({
    where: { slug: 'john-photography' },
    update: {},
    create: {
      name: 'John Photography',
      slug: 'john-photography',
    }
  });

  // Ensure membership
  const existingMembership = await prisma.businessMember.findFirst({
    where: { userId: user.id, businessId: business.id }
  });
  
  if (!existingMembership) {
    await prisma.businessMember.create({
      data: {
        userId: user.id,
        businessId: business.id,
        role: 'OWNER',
      }
    });
  }

  // 3. Create Clients
  const client1 = await prisma.client.upsert({
    where: { id: 'seed-client-1' }, // Upsert on non-unique might fail if not careful, but let's use first matching by name or just use findFirst
    update: {},
    create: {
      name: 'Sarah K.',
      type: 'INDIVIDUAL',
      email: 'sarah@example.com',
      businessId: business.id,
    }
  }).catch(async () => {
    return (await prisma.client.findFirst({ where: { email: 'sarah@example.com' } })) || 
      await prisma.client.create({ data: { name: 'Sarah K.', type: 'INDIVIDUAL', email: 'sarah@example.com', businessId: business.id } });
  });

  const client2 = await prisma.client.findFirst({ where: { email: 'hello@blisspaints.co.ug' } }) || 
    await prisma.client.create({
      data: {
        name: 'Bliss Paints',
        type: 'BUSINESS',
        email: 'hello@blisspaints.co.ug',
        businessId: business.id,
      }
    });

  // 4. Create Projects
  const project1 = await prisma.project.findFirst({ where: { name: 'Sarah & John Wedding' } }) || 
    await prisma.project.create({
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
