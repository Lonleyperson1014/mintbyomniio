import React, { useState } from 'react';
import './App.css';

function App() {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/.netlify/functions/api', {
        method: 'POST',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate token');
      setTokenData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
        <h1 className="text-xl font-bold mb-1">Mint by OMNI</h1>
        <p className="text-sm text-slate-400 mb-6">Digital Product Passport & Supply Chain Verification</p>
        
        <button
          onClick={generateToken}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 mb-4"
        >
          {loading ? 'Securing & Generating...' : 'Generate Live Token'}
        </button>

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-800 text-red-200 text-sm rounded-lg mb-4">
            Error: {error}
          </div>
        )}

        {tokenData && (
          <div className="space-y-3">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="text-xs text-slate-400 block mb-1">Active Security Token</span>
              <code className="text-xs text-blue-400 break-all">{tokenData.token}</code>
            </div>
            {/* This is where your dashboard views, passport items, and UGC assets will render next */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
