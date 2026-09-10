'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { requireBusinessId } from '@/lib/auth-utils';

export async function getInvoices() {
  try {
    const businessId = await requireBusinessId();

    const invoices = await prisma.invoice.findMany({
      where: { businessId },
      include: { client: true, project: true },
      orderBy: { issueDate: 'desc' },
    });
    return { success: true, invoices, businessId };
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
    return { success: false, error: 'Failed to fetch invoices' };
  }
}

export async function getQuotes() {
  try {
    const businessId = await requireBusinessId();
    
    // We still need business to get its clients and projects
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        clients: true,
        projects: true
      }
    });
    
    if (!business) return { success: true, quotes: [], clients: [], projects: [] };

    const quotes = await prisma.quote.findMany({
      where: { businessId },
      include: { client: true, project: true },
      orderBy: { createdAt: 'desc' },
    });
    
    // Convert Prisma Decimals to numbers for client component serialization
    const sanitizedProjects = business.projects.map(p => ({
      ...p,
      value: Number(p.value)
    }));

    return { 
      success: true, 
      quotes, 
      clients: business.clients, 
      projects: sanitizedProjects, 
      businessId: business.id 
    };
  } catch (error) {
    console.error('Failed to fetch quotes:', error);
    return { success: false, error: 'Failed to fetch quotes' };
  }
}

export async function getExpenses() {
  try {
    const businessId = await requireBusinessId();

    const expenses = await prisma.expense.findMany({
      where: { businessId },
      orderBy: { date: 'desc' },
    });
    return { success: true, expenses, businessId };
  } catch (error) {
    console.error('Failed to fetch expenses:', error);
    return { success: false, error: 'Failed to fetch expenses' };
  }
}

// Cleanup

export async function createInvoice(data: { clientId: string; projectId: string; amount: number; issueDate: Date; dueDate: Date }) {
  try {
    const businessId = await requireBusinessId();
    
    const invoice = await prisma.invoice.create({
      data: {
        businessId,
        clientId: data.clientId,
        projectId: data.projectId,
        totalAmount: data.amount,
        currency: 'UGX',
        invoiceNumber: `INV-${Date.now()}`,
        issueDate: data.issueDate,
        dueDate: data.dueDate,
        status: 'DRAFT',
      },
    });
    
    revalidatePath('/dashboard/invoices');
    return { success: true, invoiceId: invoice.id };
  } catch (error) {
    console.error('Failed to create invoice:', error);
    return { success: false, error: 'Failed to create invoice' };
  }
}

export async function createExpense(data: { category: string; amount: number; vendor?: string; date: Date; description?: string }) {
  try {
    const businessId = await requireBusinessId();
    
    const expense = await prisma.expense.create({
      data: {
        businessId,
        category: data.category,
        amount: data.amount,
        currency: 'UGX',
        vendor: data.vendor,
        date: data.date,
        description: data.description,
      },
    });
    
    revalidatePath('/dashboard/finance');
    return { success: true, expenseId: expense.id };
  } catch (error) {
    console.error('Failed to create expense:', error);
    return { success: false, error: 'Failed to create expense' };
  }
}

export async function createQuote(data: { clientId: string; projectId?: string; totalAmount: number; validUntil?: Date }) {
  try {
    const businessId = await requireBusinessId();
    
    const quote = await prisma.quote.create({
      data: {
        businessId,
        clientId: data.clientId,
        projectId: data.projectId,
        totalAmount: data.totalAmount,
        validUntil: data.validUntil,
        status: 'DRAFT',
      },
    });
    
    revalidatePath('/dashboard/quotes');
    return { success: true, quoteId: quote.id };
  } catch (error) {
    console.error('Failed to create quote:', error);
    return { success: false, error: 'Failed to create quote' };
  }
}

export async function convertQuoteToInvoice(quoteId: string) {
  try {
    const quote = await prisma.quote.findUnique({ where: { id: quoteId } });
    if (!quote) return { success: false, error: 'Quote not found' };

    const invoice = await prisma.invoice.create({
      data: {
        businessId: quote.businessId,
        clientId: quote.clientId,
        projectId: quote.projectId,
        totalAmount: quote.totalAmount,
        currency: 'UGX',
        invoiceNumber: `INV-${Date.now()}`,
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        status: 'DRAFT',
      },
    });

    await prisma.quote.update({
      where: { id: quoteId },
      data: { status: 'ACCEPTED' },
    });
    
    revalidatePath('/dashboard/quotes');
    revalidatePath('/dashboard/invoices');
    return { success: true, invoiceId: invoice.id };
  } catch (error) {
    console.error('Failed to convert quote:', error);
    return { success: false, error: 'Failed to convert quote' };
  }
}
