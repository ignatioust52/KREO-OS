'use server';

import { prisma } from '@/lib/prisma';
import { requireBusinessId } from '@/lib/auth-utils';

export async function getAnalytics() {
  try {
    const businessId = await requireBusinessId();

    const [quotes, projects, clients, tasks] = await Promise.all([
      prisma.quote.findMany({ where: { businessId } }),
      prisma.project.findMany({ where: { businessId } }),
      prisma.client.findMany({ where: { businessId }, include: { projects: true } }),
      prisma.task.findMany({ where: { project: { businessId } } })
    ]);

    // 1. Win Rate (Accepted Quotes / Total Quotes)
    const acceptedQuotes = quotes.filter(q => q.status === 'ACCEPTED').length;
    const winRate = quotes.length > 0 ? Math.round((acceptedQuotes / quotes.length) * 100) : 0;

    // 2. Avg Project Value
    const totalValue = projects.reduce((sum, p) => sum + Number(p.value), 0);
    const avgProjectValue = projects.length > 0 ? totalValue / projects.length : 0;

    // 3. Client Retention (Clients with > 1 project / Total Clients)
    const returningClients = clients.filter(c => c.projects.length > 1).length;
    const clientRetention = clients.length > 0 ? Math.round((returningClients / clients.length) * 100) : 0;

    // 4. On-Time Delivery (Tasks completed before due date)
    const completedTasks = tasks.filter(t => t.status === 'DONE');
    const onTimeTasks = completedTasks.filter(t => !t.dueDate || t.updatedAt <= t.dueDate).length;
    const onTimeDelivery = completedTasks.length > 0 ? Math.round((onTimeTasks / completedTasks.length) * 100) : 0;

    return {
      success: true,
      data: {
        winRate,
        avgProjectValue,
        clientRetention,
        onTimeDelivery,
        totalProjects: projects.length,
        totalRevenue: totalValue
      }
    };
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return { success: false, error: 'Failed to fetch analytics' };
  }
}
