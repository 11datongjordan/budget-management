import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Dashboard from './components/Dashboard';
import Forecasting from './components/forecasting';
import Reports from './components/reports';
import Analytics from './components/Analytics';
import ChatAssistant from './components/ChatAssistant';



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <MenuBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/forecasting" element={<Forecasting />} />
            <Route path="/reports" element={<Reports />}/>
          
            
            <Route path="/analytics" element={<Analytics />} />
            <Route path="ChatAssistant" element={<ChatAssistant/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

