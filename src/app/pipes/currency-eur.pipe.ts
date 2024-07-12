import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyEur'
})
export class CurrencyEurPipe implements PipeTransform {
  transform(value: number): string {
    if (value !== null && value !== undefined) {
      return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}€`;
    }
    return '';
  }
}
