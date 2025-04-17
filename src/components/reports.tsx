import { useState } from 'react';
import { format } from 'date-fns';

const transactionData = [
  { id: 1, date: '2024-03-01', category: 'Food', amount: 45.50, description: 'Grocery Shopping' },
  { id: 2, date: '2024-03-02', category: 'Transportation', amount: 30.00, description: 'Gas' },
  { id: 3, date: '2024-03-03', category: 'Entertainment', amount: 60.00, description: 'Movie Night' },
  { id: 4, date: '2024-03-04', category: 'Shopping', amount: 120.00, description: 'Clothing' },
  { id: 5, date: '2024-03-05', category: 'Utilities', amount: 85.00, description: 'Electricity Bill' },
];

const categories = ['All', 'Food', 'Transportation', 'Entertainment', 'Shopping', 'Utilities'];

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '2024-03-01', end: '2024-03-31' });

  const filteredTransactions = transactionData.filter(transaction => {
    const matchesCategory = selectedCategory === 'All' || transaction.category === selectedCategory;
    const transactionDate = new Date(transaction.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    const matchesDate = transactionDate >= startDate && transactionDate <= endDate;
    return matchesCategory && matchesDate;
  });

  const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Financial Reports</h2>
        <p className="mt-2 text-gray-600">View and analyze your transaction history</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Summary</h3>
            <p className="mt-2 text-3xl font-bold text-indigo-600">${totalAmount.toFixed(2)}</p>
            <p className="mt-1 text-sm text-gray-500">Total for selected period</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(transaction.date), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                      ${transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}