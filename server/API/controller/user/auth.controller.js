import jwt from 'jsonwebtoken';
import { serverResponse } from '../../response.js';

export const userLogin = async (req, res) => {
    const { username, password } = req.body;

    const token = jwt.sign({ username, password }, process.env.JWT_SECRET, { expiresIn: '1m' });

    return res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(serverResponse(200, 'OK', {'name': 'andreas'}));
}
