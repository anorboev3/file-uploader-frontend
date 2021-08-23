import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteToMb'
})
export class ByteToMbPipe implements PipeTransform {

  transform(byte: number): string {
    if(byte < 1024) {
      return `${byte} Byte`
    }
    else if(byte >= 1024 && byte < 1048576) {
      return `${(byte / 1024).toFixed(2)} KB`;
    }
    else {
      return `${(byte / 1048576).toFixed(2)} MB`;
    }
  }

}
