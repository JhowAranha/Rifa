import { supabase } from "./supabase.js"
import bcrypt from "bcrypt"
import { hashNewPassword } from "./utilities.js"

async function GetData(id) {
    if (id) {
        const { data, error } = await supabase
            .from('numero')
            .select(`*`)
            .eq('id', id)

        return {data}
    } else {
        const { data, error } = await supabase
            .from('numero')
            .select(`*`)

        return {data}
    }
}

async function InsertData() {
    const { data, error } = await supabase
        .from('numero')
        .insert([
            { checked: false }
        ])

    return {data}
}

async function ToggleNumber(id) {
    // 1. Busca o dado atual
    const { data: num, error: fetchError } = await GetData(id);

    if (fetchError) {
        // Lidar com o erro de busca, se necessário
        console.error("Erro ao buscar dados:", fetchError);
        return { error: fetchError };
    }

    console.log(num[0])
    // Pega o valor booleano atual
    const currentValue = num[0].checked; 

    // 2. Define o novo valor como o INVERSO do valor atual
    const newValue = !currentValue; 

    // 3. Atualiza o banco de dados com o novo valor
    const { data, error } = await supabase
        .from('numero')
        .update({ 'checked': newValue }) // <<< CORREÇÃO AQUI
        .eq('id', id) // É crucial adicionar a condição (WHERE) para atualizar APENAS o registro correto
        .select();

    if (error) {
        // Lidar com o erro de atualização
        console.error("Erro ao atualizar dados:", error);
        return { error };
    }

    return { data };
}

async function insertHashes(password) {
    // Cria o array de strings (texto)
    const hashesArray = [await hashNewPassword(password)];

    const { data, error } = await supabase
    .from('admin_config')
    .insert([
        { 
        id: 1, 
        valid_hashes: hashesArray // Passa o array de strings
        }
    ]);

    if (error) {
        console.error('Erro ao inserir array:', error);
    } else {
        console.log('Array inserido com sucesso:', data);
    }

    return { data };
}

async function getAdminHashes() {
  const { data, error } = await supabase // <-- USE ESTE CLIENTE
    .from('admin_config')
    .select('valid_hashes') // Selecione apenas a coluna de hashes
    .eq('id', 1); // Filtre pela linha única

  if (error) {
    console.error('Erro ao buscar hashes:', error);
    return null;
  } 

  // Certifique-se de que o dado existe antes de retornar
  if (data && data.length > 0) {
    return data[0].valid_hashes;
  }
  
  return null;
}

async function loginAdmin(inputPassword) {
  const validHashes = await getAdminHashes();
  let isAuthenticated = false;

  // 2. Iterar e Comparar
  for (const hash of validHashes) {
    // bcrypt.compare(senha_fornecida, hash_salvo_no_banco)
    const match = await bcrypt.compare(inputPassword, hash);
    
    if (match) {
      isAuthenticated = true;
      break;
    }
  }

  return isAuthenticated;
}

export { GetData, InsertData, ToggleNumber, insertHashes, getAdminHashes, loginAdmin };