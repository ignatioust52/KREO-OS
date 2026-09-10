import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function requireBusinessId() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Verify the user actually exists in the database (safeguard against stale JWTs after DB resets)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect('/api/auth/signout');
  }

  let membership = await prisma.businessMember.findFirst({
    where: { userId: session.user.id },
    include: { business: true },
  });

  if (!membership) {
    // Auto-provision a business for new users instead of throwing an error
    const userName = session.user.name || session.user.email?.split('@')[0] || 'My';
    const businessName = `${userName}'s Business`;
    const slug = `${businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(Math.random() * 10000)}`;
    
    const business = await prisma.business.create({
      data: {
        name: businessName,
        slug: slug,
        members: {
          create: {
            userId: session.user.id,
            role: 'OWNER',
          }
        }
      }
    });

    return business.id;
  }

  return membership.businessId;
}
