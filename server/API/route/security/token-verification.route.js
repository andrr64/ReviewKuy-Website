import express from 'express';
import { checkToken } from '../../controller/security/token-verification.controller.js';

const router = express.Router();

router.post('/token-verification', async (req, res) => {
    const token = req.cookies.access_token; // Mengambil token dari cookie
    if (checkToken(token)) {
        return res.status(200).send('OK');
    }
    return res.status(401).send('Unauthorized');
});

export default router;
