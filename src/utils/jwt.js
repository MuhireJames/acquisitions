import logger from '#config/logger.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export const jwttoken={
  sign:(payload)=>{
    try {
      return jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRE}); 
    } catch (error) {
      logger.error('Failed to authenticate token', error);
      throw  new Error('Failed to authenticate token');
            
    }},
  verify:(token)=>{
    try {
      return jwt.verify(token,JWT_SECRET); 
    } catch (error) {
      logger.error('Failed to verify token', error);
      throw  new Error('Failed to verify token');
    }
  }

};