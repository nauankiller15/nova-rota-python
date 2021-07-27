export function validarCNPJ(cnpj:string): boolean {
    if (cnpj.length == 18) {
        const numeroCNPJ = cnpj.replace(/\./g, '').replace('/', '').replace('-', '');
        const multiplicadores = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        
        const digitos = new Set(numeroCNPJ);
        if (digitos.size <= 1) {
            return false
        }

        let soma = 0;
        for (let i = 0; i < 12; i++) {
            soma += parseInt(numeroCNPJ[i]) * multiplicadores[i+1];
        }

        const digito1 = (soma * 10 % 11) % 10;
        
        if (digito1 == parseInt(numeroCNPJ[12])) {
            soma = 0;
            for (let i = 0; i < 13; i++) {
                soma += parseInt(numeroCNPJ[i]) * multiplicadores[i];
            }

            const digito2 = (soma * 10 % 11) % 10;
            
            if (digito2 == parseInt(numeroCNPJ[13])) {
                return true
            }
        }
    }
    return false
}
