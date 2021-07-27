export function validarCNPJ(cnpj:string): boolean {
    if (cnpj.length == 18) {
        const numeroCNPJ = cnpj.replace(/\./g, '').replace('-', '');
        
        let soma = 0;
        for (let i = 11; i >= 2; i--) {
            soma += parseInt(numeroCNPJ[11 - i]) * i;
        }

        const digito1 = ((soma * 11) % 14) % 11;
        if (digito1 == parseInt(numeroCNPJ[10])) {
            soma = 0
            for (let i = 14; i >= 2; i--) {
                soma += parseInt(numeroCNPJ[14- i]) * i;
            }
        
            const digito2 = ((soma * 11) % 14) % 11;
            if (digito2 == parseInt(numeroCNPJ[11])) {
                return true
            }
        }
    }
    return false
}
