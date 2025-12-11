import bcrypt from "bcrypt"

async function hashNewPassword(password) {
  const saltRounds = 10; // Custo de processamento. 10 é um bom padrão.
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword; // Este é o valor que você armazena no Supabase.
}

export { hashNewPassword };