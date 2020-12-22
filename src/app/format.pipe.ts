import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "format",
  })

  export class FormatPipe implements PipeTransform {
    transform(time:number) {
      let clock;
      let hours:number|string =  Math.floor(time / 3600);
      let minutes:number|string  =  Math.floor(time % 3600 / 60);
      let seconds:number|string  = Math.floor(time % 3600 % 60);
      if(seconds<10)seconds="0"+seconds;
      if (minutes<10)minutes="0"+minutes;
      if (hours<10)hours="0"+hours;
  
      return clock = `${hours}: ${minutes} : ${seconds}`;
    }
  }