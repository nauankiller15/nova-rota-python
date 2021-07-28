import { DatePipe } from "@angular/common";

export function data(data:string) {
    const datePipe: DatePipe = new DatePipe('en-US')
    let dataFormatada = datePipe.transform(data, 'dd/MM/YYYY');

    return dataFormatada
}