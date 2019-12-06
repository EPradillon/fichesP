import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortened'
})
export class ShortenedPipe implements PipeTransform {

  transform(description: String, ...args: any[]): any {
    return description.length > 10 ? (description.substr(0,10) + "... (Suite au dos)") : description;
  }

}