import "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
import { update } from "./index.js";

const { createClient } = supabase;

const _supabase = createClient(
  "https://bqecplanaeqkgzvfoynn.supabase.co",
  "sb_publishable_FHQ51ohsl-UfUY2QMpAf4g_KPktREu8"
);

console.log(_supabase);

export async function createConnection() {
    _supabase
  .channel('public:numero') // Nome do canal baseado na tabela
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'numero' },
    (payload) => {
      console.log('✅ Notificação Recebida:', payload);

      // Aqui, você atualiza a interface do usuário (UI) para o usuário
    //   alert('Houve uma mudança nos dados! Verifique o console.');
        update();
    }
  )
    .subscribe((status) => { // <-- A função de callback de status é AQUI
    
    // Switch/Case para lidar com os diferentes estados:
    switch (status) {
      case 'SUBSCRIBED':
        console.log('✅ CONECTADO! A conexão Realtime foi estabelecida com sucesso.');
        // Aqui você pode mudar o estado da UI para "Conectado"
        break;
        
      case 'TIMED_OUT':
        console.warn('⚠️ TEMPO ESGOTADO. Não foi possível conectar ao servidor Realtime.');
        break;
        
      case 'CLOSED':
        console.warn('❌ FECHADO. A conexão WebSocket foi fechada.');
        break;
        
      case 'CHANNEL_ERROR':
        console.error('🔥 ERRO NO CANAL. Ocorreu um erro fatal na conexão.');
        break;
        
      case 'CHANNEL_TIMEOUT':
        console.warn('⏳ TIMEOUT. A solicitação do canal excedeu o tempo limite.');
        break;
        
      // 'JOINING' e outros status intermediários também podem aparecer
      default:
        console.log(`Status atual: ${status}`);
    }
  });
}