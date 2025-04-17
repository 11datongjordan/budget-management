import { useState, useEffect } from "react";
import { format } from "date-fns";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Wallet,
  TrendingUp,
  PieChart,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Transaction, Budget, PredictiveData } from "../types";
import TransactionForm from "./transactionform";


// Sample budget and predictive data
const sampleBudgets: Budget[] = [
  { category: "Food", limit: 500, spent: 350 },
  { category: "Transport", limit: 200, spent: 150 },
  { category: "Entertainment", limit: 300, spent: 280 },
];

const predictiveData: PredictiveData[] = [
  { month: "Jan", predicted: 1200, actual: 1150 },
  { month: "Feb", predicted: 1300, actual: 1250 },
  { month: "Mar", predicted: 1400, actual: 1300 },
  { month: "Apr", predicted: 1450 },
  { month: "May", predicted: 1500 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions from the backend on page load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = (transaction: Transaction) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                BudgetSmart
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Balance</p>
                <p className="text-2xl font-semibold text-gray-900">$4,250.00</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Savings</p>
                <p className="text-2xl font-semibold text-gray-900">$850.00</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <PieChart className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Budget Status</p>
                <p className="text-2xl font-semibold text-gray-900">75%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

      
   

        {/* Budget Overview & Predictions Tabs */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("overview")}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("predictions")}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "predictions"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Predictions
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sampleBudgets}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="limit" fill="#4F46E5" name="Budget Limit" />
                  <Bar dataKey="spent" fill="#818CF8" name="Spent" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#4F46E5"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Transaction Form */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Add a Transaction</h3>
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(transaction.date), "MMM d, yyyy")} • {transaction.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${transaction.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
