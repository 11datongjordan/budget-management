import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
  } from 'recharts';
  
  const monthlyData = [
    { month: 'Jan', income: 4500, expenses: 3200 },
    { month: 'Feb', income: 4800, expenses: 3400 },
    { month: 'Mar', income: 4600, expenses: 3300 },
    { month: 'Apr', income: 5000, expenses: 3600 },
    { month: 'May', income: 4900, expenses: 3500 },
    { month: 'Jun', income: 5200, expenses: 3800 },
  ];
  
  const categoryData = [
    { name: 'Housing', value: 1200 },
    { name: 'Food', value: 800 },
    { name: 'Transportation', value: 400 },
    { name: 'Entertainment', value: 300 },
    { name: 'Utilities', value: 250 },
    { name: 'Others', value: 450 },
  ];
  
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  
  export default function Analytics() {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
              <p className="text-2xl font-semibold text-gray-900">$28,900</p>
              <span className="text-sm text-green-600">↑ 12% from last month</span>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
              <p className="text-2xl font-semibold text-gray-900">$20,800</p>
              <span className="text-sm text-red-600">↑ 8% from last month</span>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Savings Rate</h3>
              <p className="text-2xl font-semibold text-gray-900">28%</p>
              <span className="text-sm text-green-600">↑ 3% from last month</span>
            </div>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Income vs Expenses</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#4F46E5" name="Income" />
                    <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }