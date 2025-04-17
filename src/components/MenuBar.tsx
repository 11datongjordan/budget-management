import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Calendar,
  BarChart2,
  Menu,
} from 'lucide-react';

export default function MenuBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Forecasting', path: '/forecasting' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: BarChart2, label: 'ChatAssistant', path: '/ChatAssistant' },
  ];

  return (
    <div className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden md:flex md:items-center md:space-x-8">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}