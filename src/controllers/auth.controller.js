import logger from '#config/logger.js';
import { cookies } from '#utils/cookies.js';
import { jwttoken } from '#utils/jwt.js';

import { signupSchema, signInSchema } from '../validations/auth.validation.js';
import { formatValidationErrors } from '#utils/format.js';
import { createUser, authenticateUser } from '#services/auth.service.js';


export const signup = async (req, res,next) => {
  try {
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        errors: 'Validation failed',
        details: formatValidationErrors(validation.error)
      });
    }

    const { name, email, role, password } = validation.data;

    const user=await createUser({name,email,role,password});

    const token = jwttoken.sign({ id: user.id, email: user.email, role: user.role });
    cookies.set(res, 'token', token);

    logger.info(`User registered successfully: ${email}`);
    return res.status(201).json({
      message: 'User registered',
      user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
      }
       
    });
  } catch (error) {
    logger.error('Signup error:', error);
    if(error.message === 'User already exists'){
      return res.status(409).json({ message: error.message });
    }
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const validation = signInSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        errors: 'Validation failed',
        details: formatValidationErrors(validation.error)
      });
    }

    const { email, password } = validation.data;

    const user = await authenticateUser({ email, password });

    const token = jwttoken.sign({ id: user.id, email: user.email, role: user.role });
    cookies.set(res, 'token', token);

    logger.info(`User signed in successfully: ${email}`);
    return res.status(200).json({
      message: 'User signed in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    logger.error('Signin error:', error);
    if (error.message === 'User not found' || error.message === 'Invalid password') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    cookies.clear(res);
    logger.info('User signed out successfully');
    return res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    logger.error('Signout error:', error);
    next(error);
  }
};
