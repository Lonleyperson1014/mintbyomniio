const express = require('express');
const serverless = require('serverless-http');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Initialize Supabase client using environment variables
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY
);

function generateSecureToken() {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 10 * 60 * 1000;
  return { token, expiresAt };
}

app.post('/api/token/generate', async (req, res) => {
  try {
    const { batchid = 'OMNI-BATCH-001' } = req.body || {};
    const { token, expiresAt } = generateSecureToken();

    const { error } = await supabase
      .from('tokens')
      .insert([{ token, batchid, expires_at: expiresAt }]);

    if (error) throw error;

    res.json({
      success: true,
      protocol: 'Mint by OMNI DPP',
      token,
      expiresAt
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/token/verify', async (req, res) => {
  try {
    const { token, batchid = 'OMNI-BATCH-001' } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    // Query Supabase for the token
    const { data, error } = await supabase
      .from('tokens')
      .select('*')
      .eq('token', token)
      .single();

    if (error || !data) {
      return res.status(401).json({ success: false, error: 'Token not found' });
    }

    if (Date.now() > data.expires_at) {
      return res.status(401).json({ success: false, error: 'Token expired' });
    }

    res.json({
      success: true,
      protocol: 'Carifika Exchange / Data Layer Integration',
      batchid: data.batchid || batchid,
      status: 'Verified',
      provenance: {
        origin: 'Mogoditshane Bio-Refinery / Digital Asset Lab',
        compliance: 'EN 14214 / IoT Tracked',
        exchangeSync: 'Active'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports.handler = serverless(app);
