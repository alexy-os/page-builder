import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Performance monitoring utilities
export const performance = {
  // Measure function execution time
  measure: <T extends (...args: any[]) => any>(fn: T, name?: string): T => {
    return ((...args: any[]) => {
      const start = Date.now();
      const result = fn(...args);
      const duration = Date.now() - start;
      
      if (duration > 100) { // Only log if > 100ms
        console.warn(`⚠️ Performance: ${name || fn.name} took ${duration}ms`);
      }
      
      return result;
    }) as T;
  },

  // Debounce function to prevent excessive calls
  debounce: <T extends (...args: any[]) => any>(fn: T, delay: number): T => {
    let timeoutId: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    }) as T;
  },

  // Throttle function to limit call frequency
  throttle: <T extends (...args: any[]) => any>(fn: T, limit: number): T => {
    let inThrottle: boolean;
    return ((...args: any[]) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  },

  // Enhanced long task monitoring with stack trace
  observeLongTasks: () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks > 50ms
            console.group(`⚠️ Long Task: ${entry.name} took ${entry.duration.toFixed(1)}ms`);
            console.log('📊 Task Details:', {
              name: entry.name,
              duration: `${entry.duration.toFixed(1)}ms`,
              startTime: entry.startTime,
              entryType: entry.entryType
            });
            
            // Try to get stack trace for context
            const stack = new Error().stack;
            if (stack) {
              const relevantStack = stack.split('\n')
                .slice(1, 6) // Skip first line and take next 5
                .filter(line => !line.includes('PerformanceObserver'))
                .join('\n');
              console.log('📍 Stack Context:', relevantStack);
            }
            
            console.groupEnd();
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['longtask'] });
        console.log('🔍 Long Task Observer initialized');
      } catch (e) {
        console.warn('⚠️ Long Task API not supported');
      }
    }
  },

  // Monitor specific React operations
  observeReactPerformance: () => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 16) { // > 16ms affects 60fps
            console.warn(`⚠️ React: ${entry.name} took ${entry.duration.toFixed(1)}ms`, {
              type: entry.entryType,
              startTime: entry.startTime,
              duration: entry.duration
            });
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['measure'] });
        console.log('🔍 React Performance Observer initialized');
      } catch (e) {
        console.warn('⚠️ Performance Measure API not supported');
      }
    }
  },

  // Monitor DOM operations
  observeDOMOperations: () => {
    // Wrap common DOM methods to track heavy operations
    const originalQuerySelector = document.querySelector;
    const originalQuerySelectorAll = document.querySelectorAll;
    const originalGetElementById = document.getElementById;
    
    document.querySelector = function(selector: string) {
      const start = window.performance.now();
      const result = originalQuerySelector.call(this, selector);
      const duration = window.performance.now() - start;
      
      if (duration > 5) {
        console.warn(`⚠️ DOM Query: querySelector("${selector}") took ${duration.toFixed(1)}ms`);
      }
      
      return result;
    };
    
    document.querySelectorAll = function(selector: string) {
      const start = window.performance.now();
      const result = originalQuerySelectorAll.call(this, selector);
      const duration = window.performance.now() - start;
      
      if (duration > 5) {
        console.warn(`⚠️ DOM Query: querySelectorAll("${selector}") took ${duration.toFixed(1)}ms, found ${result.length} elements`);
      }
      
      return result;
    };
    
    document.getElementById = function(id: string) {
      const start = window.performance.now();
      const result = originalGetElementById.call(this, id);
      const duration = window.performance.now() - start;
      
      if (duration > 5) {
        console.warn(`⚠️ DOM Query: getElementById("${id}") took ${duration.toFixed(1)}ms`);
      }
      
      return result;
    };
    
    console.log('🔍 DOM Operations Monitor initialized');
  },

  // Create performance marks for custom tracking
  mark: (name: string) => {
    if ('performance' in window && 'mark' in window.performance) {
      window.performance.mark(name);
    }
  },

  // Measure time between marks
  measureBetween: (name: string, startMark: string, endMark: string) => {
    if ('performance' in window && 'measure' in window.performance) {
      try {
        window.performance.measure(name, startMark, endMark);
        const measure = window.performance.getEntriesByName(name, 'measure')[0];
        if (measure && measure.duration > 16) {
          console.warn(`⚠️ Custom Measure: ${name} took ${measure.duration.toFixed(1)}ms`);
        }
      } catch (e) {
        console.warn(`⚠️ Could not measure between ${startMark} and ${endMark}`);
      }
    }
  },

  // Get current performance stats
  getStats: (): any => {
    if (!('performance' in window)) return null;
    
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = window.performance.getEntriesByType('paint');
    
    return {
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
      loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      memoryUsage: (window.performance as any).memory ? {
        used: Math.round((window.performance as any).memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round((window.performance as any).memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round((window.performance as any).memory.jsHeapSizeLimit / 1024 / 1024)
      } : null
    };
  },

  // Performance dashboard for debugging
  dashboard: () => {
    if (!('performance' in window)) {
      console.log('❌ Performance API not supported');
      return;
    }

    console.group('📊 Performance Dashboard');
    
    // Basic stats
    const stats = performance.getStats();
    console.log('📈 Basic Stats:', stats);
    
    // Long tasks
    const longTasks = window.performance.getEntriesByType('longtask');
    if (longTasks.length > 0) {
      console.group(`⚠️ Long Tasks (${longTasks.length})`);
      longTasks.forEach((task, index) => {
        console.log(`Task ${index + 1}:`, {
          name: task.name,
          duration: `${task.duration.toFixed(1)}ms`,
          startTime: task.startTime
        });
      });
      console.groupEnd();
    }
    
    // Custom measures
    const measures = window.performance.getEntriesByType('measure');
    if (measures.length > 0) {
      console.group(`📏 Custom Measures (${measures.length})`);
      measures.forEach((measure) => {
        console.log(`${measure.name}:`, {
          duration: `${measure.duration.toFixed(1)}ms`,
          startTime: measure.startTime
        });
      });
      console.groupEnd();
    }
    
    // Resource timings
    const resources = window.performance.getEntriesByType('resource')
      .filter((r: any) => r.duration > 100) // Only slow resources
      .sort((a: any, b: any) => b.duration - a.duration);
    
    if (resources.length > 0) {
      console.group(`🐌 Slow Resources (${resources.length})`);
      resources.slice(0, 10).forEach((resource: any, index) => {
        console.log(`${index + 1}. ${resource.name.split('/').pop()}:`, {
          duration: `${resource.duration.toFixed(1)}ms`,
          transferSize: resource.transferSize ? `${(resource.transferSize / 1024).toFixed(1)}KB` : 'N/A'
        });
      });
      console.groupEnd();
    }
    
    // Performance tips
    console.group('💡 Performance Tips');
    if (stats?.memoryUsage) {
      const memoryUsage = stats.memoryUsage.used / stats.memoryUsage.total;
      if (memoryUsage > 0.8) {
        console.warn('🚨 High memory usage detected');
      }
    }
    
    if (longTasks.length > 5) {
      console.warn('🚨 Many long tasks detected - consider code splitting');
    }
    
    const slowMeasures = measures.filter((m: any) => m.duration > 50);
    if (slowMeasures.length > 0) {
      console.warn('🚨 Slow operations detected:', slowMeasures.map((m: any) => m.name));
    }
    
    console.groupEnd();
    console.groupEnd();
  }
};
