export function validarCPF(cpf:string): boolean {
    if (cpf.length == 14) {
        const numeroCPF = cpf.replace(/\./g, '').replace('-', '');
        
        let soma = 0;
        for (let i = 10; i >= 2; i--) {
            soma += parseInt(numeroCPF[10 - i]) * i;
        }

        const digito1 = ((soma * 10) % 11) % 10;
        if (digito1 == parseInt(numeroCPF[9])) {
            soma = 0
            for (let i = 11; i >= 2; i--) {
                soma += parseInt(numeroCPF[11- i]) * i;
            }
        
            const digito2 = ((soma * 10) % 11) % 10;
            if (digito2 == parseInt(numeroCPF[10])) {
                return true
            }
        }
    }
    return false
}
