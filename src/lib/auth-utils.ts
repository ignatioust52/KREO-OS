import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function requireBusinessId() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Find the first business this user belongs to
  const membership = await prisma.businessMember.findFirst({
    where: { userId: session.user.id },
    include: { business: true },
  });

  if (!membership) {
    // Ideally redirect to an onboarding flow, but for now we throw error
    throw new Error('User does not belong to any business');
  }

  return membership.businessId;
}
