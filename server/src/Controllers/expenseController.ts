import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        orderBy: {
          date: "desc",
        },
      }
    );
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
      

    res.json(expenseByCategorySummary);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};