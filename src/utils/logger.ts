// Centralized logging system for portfolio application
// Handles different log levels and environments

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  userAgent?: string;
  url?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  
  // Core logging method
  private log(level: LogLevel, message: string, context?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Always log to console in development
    if (this.isDevelopment) {
      this.logToConsole(level, message, context);
    }

    // In production, only log warnings and errors
    if (!this.isDevelopment && (level === 'warn' || level === 'error')) {
      this.logToConsole(level, message, context);
      
      // Send to external service in production (future integration)
      this.sendToExternalService(entry);
    }
  }

  private logToConsole(level: LogLevel, message: string, context?: Record<string, any>): void {
    const emoji = {
      debug: '🐛',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌'
    }[level];

    const method = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
    
    console[method](`${emoji} [${level.toUpperCase()}] ${message}`, context || '');
  }

  private sendToExternalService(entry: LogEntry): void {
    // Future integration with Sentry, LogRocket, or custom endpoint
    // For now, collect critical errors for manual review
    if (entry.level === 'error') {
      // Could send to API endpoint, Sentry, etc.
      // Example: fetch('/api/log', { method: 'POST', body: JSON.stringify(entry) })
    }
  }

  // Public API
  debug(message: string, context?: Record<string, any>): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, any>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, any>): void {
    this.log('error', message, context);
  }

  // Specialized methods for common scenarios
  accessibilityWarning(message: string, element?: string): void {
    this.warn(`Accessibility: ${message}`, { 
      type: 'accessibility',
      element 
    });
  }

  performanceWarning(metric: string, value: number, threshold: number): void {
    this.warn(`Performance: ${metric} (${value}) exceeds threshold (${threshold})`, {
      type: 'performance',
      metric,
      value,
      threshold
    });
  }

  componentError(componentName: string, error: Error, errorInfo?: any): void {
    this.error(`Component Error in ${componentName}`, {
      type: 'component',
      component: componentName,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      errorInfo
    });
  }

  animationError(animationName: string, error: Error): void {
    this.warn(`Animation failed: ${animationName}`, {
      type: 'animation',
      animation: animationName,
      error: {
        message: error.message,
        name: error.name
      }
    });
  }
}

// Singleton instance
export const logger = new Logger();

// Type guard for error objects
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

// Helper for React Error Boundaries
export const logReactError = (error: Error, errorInfo: any, componentName?: string) => {
  logger.componentError(componentName || 'Unknown', error, errorInfo);
};