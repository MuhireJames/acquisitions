import 'dotenv/config';
import {neon, neonConfig} from '@neondatabase/serverless';
import {drizzle} from 'drizzle-orm/neon-http';

const sql=neon(process.env.DATABASE_UL);
const db=drizzle(sql,neonConfig);

export {db,sql};
