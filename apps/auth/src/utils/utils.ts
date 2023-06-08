import * as bcrypt from 'bcrypt';

const saltOrRounds = process.env.SALT_ROUNDS || 10;

export async function hashPass(password: string) {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function comparePass(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
