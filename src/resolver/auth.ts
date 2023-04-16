import { Op } from 'sequelize';
import { getUserByAuthInfo } from '../middlewares/auth';
import User from '../models/user';

import { comparePassword, hashPassword, signJWT } from '../utils/utils';

const signUp = async (parent: any, args: any, context: any) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: args.email }, { username: args.username }],
      },
    });
    if (user) {
      throw new Error('email or username already exists');
    } else {
      const password = await hashPassword(args.password);
      const user = await User.create({
        username: args.username,
        email: args.email,
        password: password,
      });
      const jwt = signJWT({
        id: user.getDataValue('id'),
        email: user.getDataValue('email'),
      });
      return {
        token: jwt,
        user: {
          id: user.getDataValue('id'),
          email: user.getDataValue('email'),
        },
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const logIn = async (parent: any, args: any, context: any) => {
  try {
    if (!args.username || !args.password) {
      throw new Error('username and password cannot be empty');
    }
    const user = await User.findOne({
      where: {
        username: args.username,
      },
    });
    if (!user) {
      throw new Error('username is incorrect');
    } else {
      const match = await comparePassword(
        args.password,
        user.getDataValue('password')
      );
      if (!match) {
        throw new Error('password is incorrect');
      }
      const jwt = signJWT({
        id: user.getDataValue('id'),
        email: user.getDataValue('email'),
      });
      return {
        token: jwt,
        user: {
          id: user.getDataValue('id'),
          email: user.getDataValue('email'),
        },
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const changePassword = async (parent: any, args: any, context: any) => {
  try {
    if (args.oldPassword == '' || args.newPassword == '') {
      throw new Error('old password and new password cannot be empty');
    }
    if (args.oldPassword == args.newPassword) {
      throw new Error('new password cannot be the same as old password');
    }
    const authUser = await getUserByAuthInfo(context.authInfo);
    const newPassword = await hashPassword(args.newPassword);
    if (!authUser) {
      throw new Error('unauthorized access');
    } else {
      const match = await comparePassword(
        args.oldPassword,
        authUser.getDataValue('password')
      );
      if (!match) {
        throw new Error('incorrect old password');
      }
      await User.update(
        { password: newPassword },
        { where: { id: context.authInfo.id }, returning: true }
      );
      return {
        message: 'successfully changed password',
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export { signUp, logIn, changePassword };
