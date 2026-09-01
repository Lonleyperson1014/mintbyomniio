const express = require('express');
const serverless = require('serverless-http');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const tokenStore = new Map();

function generateSecureToken() {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 10 * 60 * 1000;
    return { token, expiresAt };
}

function verifyToken(storedTokenData, suppliedToken) {
    if (!storedTokenData) return { valid: false, reason: "Token not found" };
    if (Date.now() > storedTokenData.expiresAt) {
        tokenStore.delete(suppliedToken);
        return { valid: false, reason: "Token expired" };
    }
    try {
        const isValid = crypto.timingSafeEqual(
            Buffer.from(storedTokenData.token, 'hex'),
            Buffer.from(suppliedToken, 'hex')
        );
        return { valid: isValid, reason: isValid ? "Success" : "Invalid token" };
    } catch (err) {
        return { valid: false, reason: "Malformed token format" };
    }
}

const sample = generateSecureToken();
tokenStore.set(sample.token, { ...sample, batchId: "OMNI-BATCH-001" });

app.post('/api/token/generate', (req, res) => {
    const { batchId } = req.body;
    const { token, expiresAt } = generateSecureToken();
    tokenStore.set(token, { token, expiresAt, batchId });
    res.json({ success: true, protocol: "Mint by OMNI DPP", token, expiresAt });
});

app.post('/api/token/verify', (req, res) => {
    const { token, batchId } = req.body;
    const storedData = tokenStore.get(token);
    const verification = verifyToken(storedData, token);

    if (!verification.valid) {
        return res.status(401).json({ success: false, error: verification.reason });
    }

    res.json({
        success: true,
        protocol: "Carifika Exchange / Data Layer Integration",
        batchId: storedData.batchId || batchId,
        status: "Verified",
        provenance: {
            origin: "Mogoditshane Bio-Refinery / Digital Asset Lab",
            compliance: "EN 14214 / IoT Tracked",
            exchangeSync: "Active"
        }
    });
});

module.exports.handler = serverless(app);
