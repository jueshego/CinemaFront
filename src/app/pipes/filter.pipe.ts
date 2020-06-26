import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
  */

  transform(value: any, ...input: any): any {
    const resultList = [];

    input = input.toString().toLocaleLowerCase()

    console.log('input:' + input)

    for(const item of value){
      if(item.titulo.toLocaleLowerCase().indexOf(input) > -1){
        resultList.push(item); 
      }
    }

    return resultList;
  }
}
