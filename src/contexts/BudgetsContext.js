import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [incomes, setIncomes] = useLocalStorage("incomes", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId);
  }

  function addExpense({description, amount, budgetId, month}) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId, month }];
    });
  }

  function addBudget({name, max, month}) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max, month }];
    });
  }

  function addIncome({source, value, month}) {
    setIncomes(prevIncomes => {
      if (prevIncomes.find(income => income.source === source)) {
        return prevIncomes;
      }
      return [...prevIncomes, { id: uuidV4(), source, value, month }];
    });
  }

  function deleteBudget({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if(expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  function deleteIncome({ id }) {
    setIncomes((prevIncomes) => {
      return prevIncomes.filter((income) => income.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        addIncome,
        deleteBudget,
        deleteExpense,
        deleteIncome,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
