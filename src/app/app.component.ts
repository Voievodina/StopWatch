import { Component } from '@angular/core';
import {  fromEvent, Observable, timer } from 'rxjs';
import { buffer, map, debounceTime, filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  subsription;
  counter:Observable<number>;
  count:number=0;
  time:number=0;
  isRunning:boolean=false;
  click:Observable<Event>;
  doubleClick:Observable<number>;
 

  
  start() {
    this.isRunning=true;
    this.counter=timer(0, 1000).pipe(map(() => this.count++));
    this.subsription=this.counter.subscribe(t=>this.time=t)
  }
  stop(){
    this.isRunning=false;
    this.subsription.unsubscribe();
    this.time=0;
    this.count=0;
  }

  wait(){
    let pause:HTMLElement=document.getElementById('pause');
    this.click=fromEvent (pause, 'click');
    this.doubleClick=this.click.pipe(buffer(this.click.pipe(debounceTime(300))), map(list => {return list.length}),filter(x=>x==2));
    this.doubleClick.subscribe(()=>{this.subsription.unsubscribe();this.isRunning=false;})
  }

  reset(){
    this.subsription.unsubscribe();
    this.time=0;
    this.count=0;
    this.counter=timer(0, 1000).pipe(map(() => this.count++));
    this.subsription=this.counter.subscribe(t=>this.time=t)
  }
  
}
