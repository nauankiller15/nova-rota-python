export function tipoPrioridade(data) {
    const hoje = new Date();
    let dataPrioridade = new Date(data);
    dataPrioridade.setMonth(dataPrioridade.getMonth() + 1);
    let prioridade = 'Prioridade';
    console.log(dataPrioridade, hoje, dataPrioridade > hoje);
    if (dataPrioridade > hoje) {
      prioridade = "Sem Prioridade";
    }

    return prioridade
}