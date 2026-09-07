'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { requireBusinessId } from '@/lib/auth-utils';

export async function getTeamMembers() {
  try {
    const businessId = await requireBusinessId();
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        members: {
          include: {
            user: true
          }
        }
      }
    });
    
    if (!business) return { success: true, members: [], businessId: null };

    return { success: true, members: business.members, businessId: business.id };
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return { success: false, error: 'Failed to fetch team members' };
  }
}

export async function inviteMember(data: { email: string; name: string; role: string }) {
  try {
    const businessId = await requireBusinessId();
    
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    // Create a dummy user for the invite if they don't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          // No password hash means they can't login yet until they "accept" the invite 
          // (which would require a password reset / signup flow in a real app)
        }
      });
    }

    // Check if already a member
    const existingMember = await prisma.businessMember.findUnique({
      where: {
        userId_businessId: {
          userId: user.id,
          businessId,
        }
      }
    });

    if (existingMember) {
      return { success: false, error: 'User is already a member of this business.' };
    }

    const member = await prisma.businessMember.create({
      data: {
        userId: user.id,
        businessId,
        role: data.role,
      }
    });
    
    revalidatePath('/dashboard/team');
    return { success: true, member };
  } catch (error) {
    console.error('Failed to invite member:', error);
    return { success: false, error: 'Failed to invite member' };
  }
}
