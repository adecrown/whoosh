import {status} from '../../types/index'
export const generateId = (i => () => i++)(0)

export const isCustomStatusesDefined = (statuses?: Array<status>) =>{
    return Array.isArray(statuses) && statuses.length
  };
  

export class TimerCup {
         public cancel: Function;
         public pause: Function;
         public resume: Function;
         public getTimeLeft: Function;
         constructor(fn: Function, countdown: number) {
           let timerId: number,
             start: number,
             running: boolean,
             remaining = countdown;
           this.cancel = function() {
             window.clearTimeout(timerId);
           };
           this.pause = function() {
             running = false;
             window.clearTimeout(timerId);
             remaining -= Date.now() - start;
           };

           this.getTimeLeft = function() {
             if (running) {
               this.pause();
               this.resume();
             }

             return remaining;
           };
           this.resume = function() {
             running = true;
             start = Date.now();
             window.clearTimeout(timerId);
             timerId = window.setTimeout(fn, remaining);
           };
           this.resume();
         }
}
