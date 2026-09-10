'use server';

import { prisma } from '@/lib/prisma';
import { requireBusinessId } from '@/lib/auth-utils';

export async function getAIInitialInsights() {
  try {
    const businessId = await requireBusinessId();
    
    // Find overdue invoices
    const overdueInvoices = await prisma.invoice.findMany({
      where: {
        businessId,
        status: { not: 'PAID' },
        dueDate: { lt: new Date() }
      },
      include: { client: true }
    });

    // Find open tasks
    const openTasks = await prisma.task.findMany({
      where: {
        project: { businessId },
        status: 'TODO'
      }
    });

    let message = "Hello! I've analyzed your business data. ";
    if (overdueInvoices.length > 0) {
      message += `You have ${overdueInvoices.length} overdue invoice(s), including one from ${overdueInvoices[0].client.name}. `;
    } else {
      message += "You have no overdue invoices right now! ";
    }

    if (openTasks.length > 0) {
      message += `You also have ${openTasks.length} open tasks.`;
    } else {
      message += "All your tasks are completed.";
    }

    return { success: true, message };
  } catch (error) {
    console.error('Failed to get AI insights:', error);
    return { success: false, error: 'Failed to connect to KAI.' };
  }
}

export async function askKAI(query: string) {
  try {
    await requireBusinessId();
    
    // Simple simulated responses based on keywords
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('invoice') || lowerQuery.includes('overdue')) {
      return { success: true, message: "I can help you draft a reminder email for overdue invoices. Would you like me to generate a template?" };
    }
    
    if (lowerQuery.includes('task') || lowerQuery.includes('project')) {
      return { success: true, message: "Looking at your projects, I suggest prioritizing tasks with upcoming due dates. Do you want me to list them?" };
    }
    
    if (lowerQuery.includes('profit') || lowerQuery.includes('money')) {
      return { success: true, message: "Your profit margins look healthy. Check the Analytics page for a detailed breakdown." };
    }

    return { success: true, message: "I'm your KREO assistant. I can analyze your projects, finances, and clients. What would you like to know?" };
  } catch (error) {
    console.error('KAI Error:', error);
    return { success: false, error: 'KAI is currently unavailable.' };
  }
}
