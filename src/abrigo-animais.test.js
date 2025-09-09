import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  // Casos de erro e validação
  test('Deve rejeitar animal inválido ou duplicado', () => {
    const abrigo = new AbrigoAnimais();
    
    // Animal inválido
    const resultadoInvalido = abrigo.encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultadoInvalido.erro).toBe('Animal inválido');
    expect(resultadoInvalido.lista).toBeFalsy();
    
    // Animal duplicado na lista
    const resultadoDuplicado = abrigo.encontraPessoas('RATO,BOLA', 'LASER,RATO', 'Rex,Rex');
    expect(resultadoDuplicado.erro).toBe('Animal inválido');
    expect(resultadoDuplicado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido ou duplicado', () => {
    const abrigo = new AbrigoAnimais();
    
    // Brinquedo inválido
    const resultadoBrinquedoInvalido = abrigo.encontraPessoas('CAIXA,LASER', 'RATO,BOLA,INVALIDO', 'Rex');
    expect(resultadoBrinquedoInvalido.erro).toBe('Brinquedo inválido');
    expect(resultadoBrinquedoInvalido.lista).toBeFalsy();
    
    // Brinquedo duplicado na mesma pessoa
    const resultadoBrinquedoDuplicado = abrigo.encontraPessoas('RATO,BOLA,BOLA', 'LASER,RATO', 'Rex');
    expect(resultadoBrinquedoDuplicado.erro).toBe('Brinquedo inválido');
    expect(resultadoBrinquedoDuplicado.lista).toBeFalsy();
  });

  // Casos de sucesso
  test('Deve encontrar pessoa para um animal (caso de exemplo)', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista).toEqual(['Fofo - abrigo', 'Rex - pessoa 1']);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas(
      'BOLA,NOVELO', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola'
    );
    expect(resultado.lista).toEqual([
      'Bola - abrigo',
      'Fofo - pessoa 2',
      'Mimi - abrigo',
      'Rex - abrigo'
    ]);
    expect(resultado.erro).toBeFalsy();
  });

  // Casos de regras específicas
  test('Gato (Mimi) não aceita brinquedos a mais ou na ordem errada', () => {
    const abrigo = new AbrigoAnimais();
    
    // Pessoa 1 tem brinquedos a mais, não é apta
    const resultadoPessoa1Inapta = abrigo.encontraPessoas('BOLA,NOVELO,LASER', 'LASER,BOLA', 'Mimi');
    expect(resultadoPessoa1Inapta.lista).toEqual(['Mimi - abrigo']);
    expect(resultadoPessoa1Inapta.erro).toBeFalsy();

    // Pessoa 1 tem brinquedos na ordem errada, não é apta
    const resultadoOrdemErrada = abrigo.encontraPessoas('LASER,BOLA', 'BOLA,LASER', 'Mimi');
    expect(resultadoOrdemErrada.lista).toEqual(['Mimi - pessoa 2']);
    expect(resultadoOrdemErrada.erro).toBeFalsy();
  });

  test('Ambas as pessoas aptas: o animal permanece no abrigo', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'LASER,RATO,BOLA', 'Rex');
    expect(resultado.lista).toEqual(['Rex - abrigo']);
    expect(resultado.erro).toBeFalsy();
  });
  
  test('Loco (o jabuti) não se importa com a ordem dos brinquedos se houver outra adoção', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas('RATO,BOLA', 'SKATE,RATO', 'Rex,Loco');
    expect(resultado.lista).toEqual(['Loco - pessoa 2', 'Rex - pessoa 1']);
    expect(resultado.erro).toBeFalsy();
  });

  test('Pessoa não pode adotar mais de 3 animais', () => {
    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas(
      'RATO,BOLA,LASER,CAIXA', 'BOLA,RATO,LASER', 'Rex,Mimi,Fofo,Zero'
    );
    expect(resultado.lista).toEqual([
      'Fofo - pessoa 2',
      'Mimi - abrigo',
      'Rex - pessoa 1',
      'Zero - abrigo',
    ]);
    expect(resultado.erro).toBeFalsy();
  });
});