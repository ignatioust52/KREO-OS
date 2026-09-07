'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { requireBusinessId } from '@/lib/auth-utils';

export async function getProjects(status?: string) {
  try {
    const businessId = await requireBusinessId();

    const projects = await prisma.project.findMany({
      where: {
        businessId,
        ...(status ? { status } : {}),
      },
      include: {
        client: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return { success: true, projects };
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return { success: false, error: 'Failed to fetch projects' };
  }
}

export async function createProject(data: { name: string; clientId: string; value?: number; dueDate?: Date }) {
  try {
    const businessId = await requireBusinessId();
    
    const project = await prisma.project.create({
      data: {
        name: data.name,
        businessId,
        clientId: data.clientId,
        status: 'ACTIVE',
      },
    });
    
    revalidatePath('/dashboard/projects');
    return { success: true, project };
  } catch (error) {
    console.error('Failed to create project:', error);
    return { success: false, error: 'Failed to create project' };
  }
}
