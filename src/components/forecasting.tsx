import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  
  const forecastData = [
    { month: 'Jan', actual: 1200, predicted: 1250 },
    { month: 'Feb', actual: 1300, predicted: 1350 },
    { month: 'Mar', actual: 1400, predicted: 1450 },
    { month: 'Apr', actual: null, predicted: 1550 },
    { month: 'May', actual: null, predicted: 1650 },
    { month: 'Jun', actual: null, predicted: 1750 },
  ];
  
  const categories = [
    { name: 'Food & Dining', current: 450, predicted: 480 },
    { name: 'Transportation', current: 200, predicted: 220 },
    { name: 'Entertainment', current: 150, predicted: 180 },
    { name: 'Shopping', current: 300, predicted: 320 },
    { name: 'Utilities', current: 250, predicted: 260 },
  ];
  
  export default function Forecasting() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Spending Forecast</h2>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    name="Actual Spending"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Predicted Spending"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category Predictions</h3>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-500">
                      Predicted increase: {((category.predicted - category.current) / category.current * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-indigo-600 rounded"
                          style={{ width: `${(category.current / category.predicted) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">${category.current}</span>
                      <span className="text-gray-500"> → </span>
                      <span className="font-medium text-indigo-600">${category.predicted}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }