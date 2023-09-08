import { Logger as GelfLogger } from 'https://deno.land/x/deno_gelf@v1.0.0/mod.ts'

export class Logger {
    private logger: any

    constructor(
        private appwriteLogFn: (message: string) => null,
        private appwriteErrorFn: (message: string) => null,
        gelfHttpEndpoint?: string,
    ) {
        if(gelfHttpEndpoint) {
            this.logger = new GelfLogger(gelfHttpEndpoint)
        }
    }

    info(message: string) {
        this.logger?.info(message)
        this.appwriteLogFn(message)
    }
    
    error(message: string) {
        this.logger?.error(message)
        this.appwriteErrorFn(message)
    }
}
