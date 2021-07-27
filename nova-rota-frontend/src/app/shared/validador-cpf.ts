export function validarCPF(cpf: string): boolean {
  if (cpf.length == 14) {
    const numeroCPF = cpf.replace(/\./g, '').replace('-', '');
    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      console.log('Certo')
    )
      return false;
    let soma = 0;
    for (let i = 10; i >= 2; i--) {
      soma += parseInt(numeroCPF[10 - i]) * i;
    }

    const digito1 = ((soma * 10) % 11) % 10;
    if (digito1 == parseInt(numeroCPF[9])) {
      soma = 0;
      for (let i = 11; i >= 2; i--) {
        soma += parseInt(numeroCPF[11 - i]) * i;
      }

      const digito2 = ((soma * 10) % 11) % 10;
      if (digito2 == parseInt(numeroCPF[10])) {
        return true;
      }
    }
  }
  return false;
}
