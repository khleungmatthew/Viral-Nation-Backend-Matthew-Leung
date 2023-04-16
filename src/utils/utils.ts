import bcrypt from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken';
import { JWTPayload } from '../types/types';

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

const signJWT = (payload: JWTPayload): string => {
  const secret = 'vnsecretkey';
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const verifyJWT = (token: string) => {
  const secret = 'vnsecretkey';
  const decoded = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return { id: 0, email: '' };
    } else {
      return decoded;
    }
  });
  return decoded;
};

export { comparePassword, hashPassword, signJWT, verifyJWT };
