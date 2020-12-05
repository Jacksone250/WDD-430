import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charactersFilter'
})
export class CharactersFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
