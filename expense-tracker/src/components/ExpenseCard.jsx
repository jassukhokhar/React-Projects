import React from 'react';
import { 
  Utensils, 
  Car, 
  ShoppingBag, 
  Film, 
  Receipt, 
  HelpCircle, 
  Trash2, 
  Edit3,
  Calendar
} from 'lucide-react';

const CATEGORY_META = {
  Food: {
    icon: Utensils,
    colorClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-150 dark:border-emerald-900/50',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    badgeColor: 'bg-emerald-500',
  },
  Travel: {
    icon: Car,
    colorClass: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 border-sky-150 dark:border-sky-900/50',
    iconColor: 'text-sky-500 dark:text-sky-400',
    badgeColor: 'bg-sky-500',
  },
  Shopping: {
    icon: ShoppingBag,
    colorClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-150 dark:border-purple-900/50',
    iconColor: 'text-purple-500 dark:text-purple-400',
    badgeColor: 'bg-purple-500',
  },
  Entertainment: {
    icon: Film,
    colorClass: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400 border-pink-150 dark:border-pink-900/50',
    iconColor: 'text-pink-500 dark:text-pink-400',
    badgeColor: 'bg-pink-500',
  },
  Bills: {
    icon: Receipt,
    colorClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-150 dark:border-amber-900/50',
    iconColor: 'text-amber-500 dark:text-amber-400',
    badgeColor: 'bg-amber-500',
  },
  Others: {
    icon: HelpCircle,
    colorClass: 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-150 dark:border-slate-700/50',
    iconColor: 'text-slate-500 dark:text-slate-400',
    badgeColor: 'bg-slate-500',
  },
};

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  const { id, title, amount, category, date } = expense;
  const meta = CATEGORY_META[category] || CATEGORY_META.Others;
  const CategoryIcon = meta.icon;

  const formatDate = (dateStr) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-IN', options);
    } catch (e) {
      return dateStr;
    }
  };

  const formatRupees = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-brand-surface-light dark:bg-brand-surface-dark border border-brand-border-light dark:border-brand-border-dark rounded-2xl hover:shadow-md hover:border-slate-350 dark:hover:border-slate-650 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${meta.colorClass} shadow-xs`}>
          <CategoryIcon size={20} className={meta.iconColor} />
        </div>
        
        <div className="flex flex-col">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors text-sm md:text-base leading-snug">
            {title}
          </h4>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <Calendar size={12} />
              {formatDate(date)}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wider uppercase ${meta.colorClass}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${meta.badgeColor}`}></span>
              {category}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="font-bold text-slate-850 dark:text-slate-100 text-base md:text-lg tabular-nums">
          {formatRupees(amount)}
        </p>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(expense)}
            className="p-2 text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-brand-container-dark rounded-xl transition-all cursor-pointer"
            title="Edit Expense"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 text-slate-400 hover:text-danger dark:text-slate-500 dark:hover:text-danger-light hover:bg-danger/10 dark:hover:bg-danger/25 rounded-xl transition-all cursor-pointer"
            title="Delete Expense"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
