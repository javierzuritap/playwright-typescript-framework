type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'

export class Logger {
    private static readonly isDebugEnabled = process.env.DEBUG_LOGS === 'true'

    private static format(level: LogLevel, message: string): string {
        const timestamp = new Date().toISOString()
        return `[${timestamp}] [${level}] ${message}`
    }

    static info(message: string): void {
        console.log(Logger.format('INFO', message))
    }

    static warn(message: string): void {
        console.warn(Logger.format('WARN', message))
    }

    static error(message: string, error?: unknown): void {
        console.error(Logger.format('ERROR', message))
        if (error instanceof Error) {
            console.error(error.stack ?? error.message)
        } else if (error !== undefined) {
            console.error(error)
        }
    }

    static debug(message: string): void {
        if (Logger.isDebugEnabled) {
            console.log(Logger.format('DEBUG', message))
        }
    }

    static step(stepName: string): void {
        Logger.info(`STEP -> ${stepName}`)
    }
}
