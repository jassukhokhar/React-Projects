import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filter from './components/Filter';
import Summary from './components/Summary';
import {
  Wallet,
  Sun,
  Moon,
  Bell,
  Settings,
  BarChart3,
  LayoutDashboard,
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const MOCK_EXPENSES = [
  {
    id: 1,
    title: "Whole Foods Grocery",
    amount: 2450.00,
    category: "Food",
    date: "2026-06-12"
  },
  {
    id: 2,
    title: "Fuel Station Refill",
    amount: 3200.00,
    category: "Travel",
    date: "2026-06-11"
  },
  {
    id: 3,
    title: "Abonnement Broadband Bill",
    amount: 1250.00,
    category: "Bills",
    date: "2026-06-10"
  },
  {
    id: 4,
    title: "Movie Tickets & Snacks",
    amount: 850.00,
    category: "Entertainment",
    date: "2026-06-08"
  },
  {
    id: 5,
    title: "Summer Cotton Shirt",
    amount: 1999.00,
    category: "Shopping",
    date: "2026-06-05"
  }
];

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : MOCK_EXPENSES;
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      if (editingExpense && editingExpense.id === id) {
        setEditingExpense(null);
      }
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory = activeCategory === 'All' || exp.category === activeCategory;
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-brand-bg-light dark:bg-brand-bg-dark text-slate-800 dark:text-slate-100 min-h-screen flex transition-colors duration-300">

      <nav className="hidden lg:flex flex-col h-screen fixed left-0 top-0 p-6 bg-brand-surface-light dark:bg-brand-surface-dark border-r border-brand-border-light dark:border-brand-border-dark w-64 z-20 transition-all duration-300">

        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/20">
            <Wallet size={22} />
          </div>
          <span className="font-bold text-xl tracking-tight text-primary dark:text-primary-light">
            FinTrack Pro
          </span>
        </div>

        <div className="flex items-center gap-3.5 mb-8 p-3 rounded-2xl bg-brand-container-light dark:bg-brand-container-dark/40 border border-brand-border-light dark:border-brand-border-dark/60">
          <img
            alt="Sarah Jenkins"
            className="w-10 h-10 rounded-full object-cover border border-white dark:border-slate-800 shadow-xs"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
          />
          <div>
            <p className="font-bold text-xs text-slate-850 dark:text-slate-200">Sarah Jenkins</p>
            <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-0.5 font-medium">Wealth Manager</p>
          </div>
        </div>

        <ul className="flex flex-col gap-2 flex-1">
          <li>
            <button className="w-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light font-bold flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs cursor-pointer">
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button className="w-full text-slate-500 hover:text-slate-850 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-brand-container-dark/50 font-bold flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs cursor-pointer">
              <BarChart3 size={16} />
              <span>Analytics</span>
            </button>
          </li>
          <li>
            <button className="w-full text-slate-500 hover:text-slate-850 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-brand-container-dark/50 font-bold flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs cursor-pointer">
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </li>
        </ul>

        <div className="border-t border-brand-border-light dark:border-brand-border-dark pt-5">
          <ul className="flex flex-col gap-2">
            <li>
              <button className="w-full text-slate-500 hover:text-slate-850 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-brand-container-dark/50 font-bold flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs cursor-pointer">
                <HelpCircle size={16} />
                <span>Help Support</span>
              </button>
            </li>
            <li>
              <button className="w-full text-slate-500 hover:text-danger hover:bg-danger/10 dark:text-slate-400 dark:hover:text-danger-light dark:hover:bg-danger/15 font-bold flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs cursor-pointer">
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity">
          <div className="fixed inset-y-0 left-0 w-64 bg-brand-surface-light dark:bg-brand-surface-dark p-6 flex flex-col border-r border-brand-border-light dark:border-brand-border-dark animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Wallet className="text-primary" size={24} />
                <span className="font-bold text-lg text-primary dark:text-primary-light">FinTrack</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-brand-container-dark rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 mb-6 p-2 rounded-xl bg-brand-container-light dark:bg-brand-container-dark/50 border border-brand-border-light dark:border-brand-border-dark">
                <img
                  alt="Sarah"
                  className="w-8 h-8 rounded-full object-cover border border-white"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                />
                <div>
                  <p className="font-bold text-xs text-slate-800 dark:text-slate-200">Sarah Jenkins</p>
                </div>
              </div>
              <ul className="space-y-1">
                <li>
                  <button className="w-full text-left bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light font-bold flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs">
                    <LayoutDashboard size={14} />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button className="w-full text-left text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs">
                    <BarChart3 size={14} />
                    <span>Analytics</span>
                  </button>
                </li>
                <li>
                  <button className="w-full text-left text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs">
                    <Settings size={14} />
                    <span>Settings</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="border-t border-brand-border-light dark:border-brand-border-dark pt-4 space-y-1">
              <button className="w-full text-left text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs">
                <HelpCircle size={14} />
                <span>Help Support</span>
              </button>
              <button className="w-full text-left text-slate-500 hover:text-danger dark:text-slate-400 dark:hover:text-danger-light font-bold flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs">
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">

        <header className="bg-brand-surface-light dark:bg-brand-surface-dark border-b border-brand-border-light dark:border-brand-border-dark sticky top-0 z-10 transition-colors duration-300">
          <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-brand-container-dark rounded-xl text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <Menu size={20} />
              </button>
              <span className="font-bold text-lg text-primary dark:text-primary-light">FinTrack</span>
            </div>

            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                Financial Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDarkMode(prev => !prev)}
                className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-all p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-brand-container-dark/50 dark:hover:bg-brand-container-dark cursor-pointer border border-brand-border-light dark:border-brand-border-dark"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-all p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-brand-container-dark/50 dark:hover:bg-brand-container-dark cursor-pointer border border-brand-border-light dark:border-brand-border-dark"
              >
                <Bell size={16} />
              </button>
              <img
                alt="Sarah Jenkins"
                className="w-8 h-8 rounded-full border border-brand-border-light dark:border-brand-border-dark lg:hidden"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6 overflow-y-auto">

          <Summary expenses={expenses} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <ExpenseForm
                onAddExpense={handleAddExpense}
                onUpdateExpense={handleUpdateExpense}
                editingExpense={editingExpense}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            <div className="lg:col-span-8 space-y-6">

              <Filter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              <ExpenseList
                expenses={filteredExpenses}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
              />

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}

export default App;
