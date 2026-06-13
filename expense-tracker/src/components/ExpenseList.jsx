import React from 'react';
import ExpenseCard from './ExpenseCard';
import { ClipboardList } from 'lucide-react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col h-full bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-2xl p-6 shadow-xs">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <ClipboardList size={20} className="text-primary" />
          Expense Log
        </h3>
        <span className="text-xs bg-slate-100 dark:bg-brand-container-dark text-slate-600 dark:text-slate-350 px-2.5 py-1 rounded-full font-bold">
          {expenses.length} Item{expenses.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="expense-list flex-1 overflow-y-auto pr-1 space-y-3 max-h-[500px]">
        {expenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-brand-container-dark flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500">
              <ClipboardList size={32} />
            </div>
            <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
              No expenses recorded
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 max-w-[200px]">
              Add a new expense or change your category filters.
            </p>
          </div>
        ) : (
          expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
