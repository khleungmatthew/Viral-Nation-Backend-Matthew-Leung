import User from '../models/user';
import { JWTPayload } from '../types/types';
import { verifyJWT } from '../utils/utils';

export const getAuthInfo = (token: string) => {
  try {
    if (token && token != '') {
      return verifyJWT(token);
    }
    return { id: 0, email: '' };
  } catch (error) {
    return { id: 0, email: '' };
  }
};

export const getUserByAuthInfo = async (
  authInfo: JWTPayload
): Promise<User> => {
  const user = await User.findOne({
    where: {
      id: authInfo.id,
    },
  });
  return user;
};
