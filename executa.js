// Importa a classe principal com a lógica do desafio
import { AbrigoAnimais } from './src/abrigo-animais.js';

// Importa a biblioteca para capturar a entrada do usuário
import promptSync from 'prompt-sync';

// Inicializa a função de prompt
const prompt = promptSync({ sigint: true });

function main() {
  while (true) {
    console.log('\n--- Sistema de Adoção de Animais ---');
    console.log('Bem-vindo! Por favor, insira os dados para encontrar a família ideal para os animais.\n');

    try {
      // Coleta as entradas do usuário na ordem correta
      const brinquedosPessoa1 = prompt('Brinquedos da Pessoa 1 (separados por vírgula): ');
      const brinquedosPessoa2 = prompt('Brinquedos da Pessoa 2 (separados por vírgula): ');
      const ordemAnimais = prompt('Ordem dos animais (separados por vírgula): ');

      // Validação simples para garantir que as entradas não estão vazias
      if (!brinquedosPessoa1 || !brinquedosPessoa2 || !ordemAnimais) {
        console.error('\nErro: Todas as entradas são obrigatórias. Por favor, tente novamente.');
      } else {
        // Instancia a classe e executa a lógica do desafio
        const abrigo = new AbrigoAnimais();
        const resultado = abrigo.encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais);

        // Exibe o resultado final
        console.log('\n--- Resultado da Adoção ---');
        if (resultado.erro) {
          console.log(`Erro: ${resultado.erro}`);
        } else {
          console.log(JSON.stringify(resultado, null, 2));
        }
      }
    } catch (error) {
      // Captura e exibe erros inesperados
      console.error('\nOcorreu um erro inesperado:', error.message);
    }

    // Pergunta ao usuário se ele quer continuar
    const continuar = prompt('\nDeseja rodar novamente? (s/n): ').toLowerCase();
    if (continuar !== 's') {
      console.log('Encerrando a aplicação...');
      break; 
    }
    console.clear(); // Limpa o console para uma nova execução
  }
}

// Executa a função principal
main();