export const generateId = (i => () => i++)(0)



export class TimerCup {
    constructor(fn, countdown) {
        let timerId, start, remaining = countdown;
        this.cancel = function () {
            window.clearTimeout(timerId);
        };
        this.pause = function () {
            window.clearTimeout(timerId);
            remaining -= Date.now() - start;
        };
        this.resume = function () {
            start = Date.now();
            window.clearTimeout(timerId);
            timerId = window.setTimeout(fn, remaining);
        };
        this.resume();
    }
}
