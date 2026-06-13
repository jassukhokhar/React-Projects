import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, X, IndianRupee } from 'lucide-react';

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Entertainment', 'Bills', 'Others'];

const ExpenseForm = ({ onAddExpense, onUpdateExpense, editingExpense, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || parseFloat(amount) <= 0 || !date) {
      alert('Please enter a valid title, positive amount, and date.');
      return;
    }

    const expenseData = {
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
    };

    if (editingExpense) {
      onUpdateExpense({
        ...editingExpense,
        ...expenseData,
      });
    } else {
      onAddExpense({
        id: Date.now(),
        ...expenseData,
      });
      resetForm();
    }
  };

  return (
    <div className="bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-2xl p-6 shadow-xs transition-all duration-300">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {editingExpense ? 'Edit Expense' : 'Add New Expense'}
        </h3>
        {editingExpense && (
          <button
            onClick={onCancelEdit}
            className="p-1 hover:bg-slate-100 dark:hover:bg-brand-container-dark text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
            title="Cancel Editing"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-brand-container-dark/50 border border-brand-border-light dark:border-brand-border-dark rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium placeholder-slate-400 dark:placeholder-slate-500 text-sm"
            placeholder="e.g. Weekly Groceries"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <IndianRupee size={15} />
              </span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 dark:bg-brand-container-dark/50 border border-brand-border-light dark:border-brand-border-dark rounded-xl pl-9 pr-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium placeholder-slate-400 dark:placeholder-slate-500 text-sm"
                placeholder="0.00"
                min="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-brand-container-dark/50 border border-brand-border-light dark:border-brand-border-dark rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 dark:bg-brand-container-dark/50 border border-brand-border-light dark:border-brand-border-dark rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-medium text-sm appearance-none cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-sm hover:shadow-md cursor-pointer mt-2"
        >
          {editingExpense ? (
            <>
              <Save size={16} />
              Update Expense
            </>
          ) : (
            <>
              <PlusCircle size={16} />
              Add Expense
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
