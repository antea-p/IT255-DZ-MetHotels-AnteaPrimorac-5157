export class ConsoleSpy {
    logs: string[] = [];
    log(...args) {
        this.logs.push(args.join(' '));
    }
    warn(...args) {
        this.log(...args);
    }
    error(...args) {
        this.log(...args);
    }
}