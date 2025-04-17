// ChatAssistant.jsx
import { useState } from 'react';
import axios from 'axios';

const ChatAssistant = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const res = await axios.post('http://localhost:5000/chat', { message });
    setResponse(res.data.response);
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">💬 Finance Assistant</h2>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Ask something like 'How much did I spend on food?'"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
        Ask
      </button>
      {response && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
