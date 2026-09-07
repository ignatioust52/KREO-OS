'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { requireBusinessId } from '@/lib/auth-utils';

export async function getClients() {
  try {
    const businessId = await requireBusinessId();

    const clients = await prisma.client.findMany({
      where: {
        businessId,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return { success: true, clients };
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    return { success: false, error: 'Failed to fetch clients' };
  }
}

export async function createClient(data: { name: string; type: 'INDIVIDUAL' | 'BUSINESS'; email?: string; phone?: string }) {
  try {
    const businessId = await requireBusinessId();
    
    const client = await prisma.client.create({
      data: {
        name: data.name,
        type: data.type,
        email: data.email,
        phone: data.phone,
        businessId,
      },
    });
    
    revalidatePath('/dashboard/clients');
    return { success: true, client };
  } catch (error) {
    console.error('Failed to create client:', error);
    return { success: false, error: 'Failed to create client' };
  }
}
