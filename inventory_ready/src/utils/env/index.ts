import dotenv from 'dotenv';
import path from 'path';

function getEnv(name: string): string | undefined {
  dotenv.config({ path: path.resolve(process.cwd(), '..', '.env') });
  return process.env[name];
}
  
export { getEnv };