import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortened'
})

/**
* Custom pipe to return/create a "résumé" from a to long personnage description.
* if the text is cut : a message is added.
* @return string short description
*/
export class ShortenedPipe implements PipeTransform {

  transform(description: String, ...args: any[]): any {
    return description.length > 10 ? (description.substr(0,10) + "... (Suite au dos)") : description;
  }

}
