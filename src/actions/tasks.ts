'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { requireBusinessId } from '@/lib/auth-utils';

export async function getTasks() {
  try {
    const businessId = await requireBusinessId();
    
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        projects: {
          include: {
            tasks: {
              orderBy: { createdAt: 'desc' }
            }
          }
        }
      }
    });
    
    if (!business) return { success: true, tasks: [], projects: [] };

    // Flatten all tasks from all projects in this business
    const tasks = business.projects.flatMap(p => p.tasks.map(t => ({
      ...t,
      projectName: p.name,
    })));

    const sanitizedProjects = business.projects.map(p => ({
      ...p,
      value: Number(p.value)
    }));

    return { success: true, tasks, projects: sanitizedProjects };
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return { success: false, error: 'Failed to fetch tasks' };
  }
}

export async function createTask(data: { projectId: string; title: string; description?: string }) {
  try {
    const task = await prisma.task.create({
      data: {
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        status: 'TODO',
      },
    });
    
    revalidatePath('/dashboard/tasks');
    return { success: true, task };
  } catch (error) {
    console.error('Failed to create task:', error);
    return { success: false, error: 'Failed to create task' };
  }
}

export async function updateTaskStatus(id: string, status: string) {
  try {
    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });
    
    revalidatePath('/dashboard/tasks');
    return { success: true, task };
  } catch (error) {
    console.error('Failed to update task:', error);
    return { success: false, error: 'Failed to update task' };
  }
}
