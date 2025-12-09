// Senior/Executive Note:
// In a real cloud environment (AWS/GCP), logs should be structured JSON 
// so they can be parsed by tools like Datadog, Splunk, or CloudWatch Logs Insights.
// This abstract logger enforces that pattern.

const LOG_LEVELS = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG',
};

class StructuredLogger {
    constructor(serviceName = 'product-dashboard') {
        this.serviceName = serviceName;
    }

    _log(level, message, metadata = {}) {
        const timestamp = new Date().toISOString();

        // In production, we'd mute DEBUG logs
        // if (process.env.NODE_ENV === 'production' && level === LOG_LEVELS.DEBUG) return;

        const logEntry = JSON.stringify({
            timestamp,
            level,
            service: this.serviceName,
            message,
            ...metadata, // Mixin context like productId, userId, requestId
        });

        // In a real app, this might transport to an external service
        console.log(logEntry);
    }

    info(message, metadata) {
        this._log(LOG_LEVELS.INFO, message, metadata);
    }

    warn(message, metadata) {
        this._log(LOG_LEVELS.WARN, message, metadata);
    }

    error(message, error) {
        // Handle Error objects specifically to capture stack traces
        const errorMeta = error instanceof Error
            ? { errorName: error.name, errorMessage: error.message, stack: error.stack }
            : { error };

        this._log(LOG_LEVELS.ERROR, message, errorMeta);
    }

    debug(message, metadata) {
        this._log(LOG_LEVELS.DEBUG, message, metadata);
    }
}

export const logger = new StructuredLogger();
