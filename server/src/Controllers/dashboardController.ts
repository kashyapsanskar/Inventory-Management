import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        take: 5,
        orderBy: {
          date: "desc",
        },
      }
    );
    // const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
    //   (item:ExpenseItem) => ({
    //     ...item,
    //     amount: item.amount.toString(),
    //   })
    // );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item: unknown) => {
        if (typeof item === 'object' && item !== null && 'amount' in item) {
          const itemTyped = item as { amount: { toString: () => string } };
          return {
            ...itemTyped,
            amount: itemTyped.amount.toString()
          };
        }
        // Handle case where item does not match expected structure
        return item;
      });

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};