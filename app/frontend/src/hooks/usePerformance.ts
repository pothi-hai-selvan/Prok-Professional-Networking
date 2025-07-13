import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: number;
  timestamp: number;
}

interface UsePerformanceOptions {
  enabled?: boolean;
  logToConsole?: boolean;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

export function usePerformance(
  componentName: string,
  options: UsePerformanceOptions = {}
) {
  const { enabled = import.meta.env.DEV, logToConsole = false, onMetrics } = options;
  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);

  const measureRender = useCallback(() => {
    if (!enabled) return;

    const renderTime = performance.now() - renderStartTime.current;
    renderCount.current++;

    const metrics: PerformanceMetrics = {
      renderTime,
      timestamp: Date.now(),
    };

    // Get memory usage if available
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
    }

    if (logToConsole) {
      console.log(`[${componentName}] Render #${renderCount.current}:`, {
        renderTime: `${renderTime.toFixed(2)}ms`,
        memoryUsage: metrics.memoryUsage ? `${metrics.memoryUsage.toFixed(2)}MB` : 'N/A',
      });
    }

    if (onMetrics) {
      onMetrics(metrics);
    }
  }, [componentName, enabled, logToConsole, onMetrics]);

  useEffect(() => {
    if (enabled) {
      renderStartTime.current = performance.now();
      measureRender();
    }
  });

  return {
    measureRender,
    renderCount: renderCount.current,
  };
}

// Hook for measuring API call performance
export function useApiPerformance() {
  const apiCallTimes = useRef<Map<string, number[]>>(new Map());

  const startApiCall = useCallback((endpoint: string) => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!apiCallTimes.current.has(endpoint)) {
        apiCallTimes.current.set(endpoint, []);
      }
      
      const times = apiCallTimes.current.get(endpoint)!;
      times.push(duration);
      
      // Keep only last 10 measurements
      if (times.length > 10) {
        times.shift();
      }
    };
  }, []);

  const getApiStats = useCallback((endpoint: string) => {
    const times = apiCallTimes.current.get(endpoint) || [];
    if (times.length === 0) return null;

    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);

    return {
      count: times.length,
      average: avg,
      min,
      max,
      last: times[times.length - 1],
    };
  }, []);

  return {
    startApiCall,
    getApiStats,
  };
}

// Hook for measuring scroll performance
export function useScrollPerformance() {
  const scrollEvents = useRef<number[]>([]);
  const lastScrollTime = useRef<number>(0);

  const measureScroll = useCallback(() => {
    const now = performance.now();
    const timeSinceLastScroll = now - lastScrollTime.current;
    lastScrollTime.current = now;

    scrollEvents.current.push(timeSinceLastScroll);
    
    // Keep only last 50 measurements
    if (scrollEvents.current.length > 50) {
      scrollEvents.current.shift();
    }
  }, []);

  const getScrollStats = useCallback(() => {
    const events = scrollEvents.current;
    if (events.length === 0) return null;

    const avg = events.reduce((a, b) => a + b, 0) / events.length;
    const fps = 1000 / avg;

    return {
      averageInterval: avg,
      fps,
      eventCount: events.length,
    };
  }, []);

  return {
    measureScroll,
    getScrollStats,
  };
}

// Hook for measuring image loading performance
export function useImagePerformance() {
  const imageLoadTimes = useRef<Map<string, number>>(new Map());

  const measureImageLoad = useCallback((src: string, onLoad?: () => void) => {
    const startTime = performance.now();
    
    return () => {
      const loadTime = performance.now() - startTime;
      imageLoadTimes.current.set(src, loadTime);
      
      if (import.meta.env.DEV) {
        console.log(`[Image Performance] ${src}: ${loadTime.toFixed(2)}ms`);
      }
      
      if (onLoad) {
        onLoad();
      }
    };
  }, []);

  const getImageLoadTime = useCallback((src: string) => {
    return imageLoadTimes.current.get(src);
  }, []);

  return {
    measureImageLoad,
    getImageLoadTime,
  };
}

// Hook for measuring component mount/unmount performance
export function useLifecyclePerformance(componentName: string) {
  const mountTime = useRef<number>(0);
  const unmountTime = useRef<number>(0);

  useEffect(() => {
    mountTime.current = performance.now();
    
    if (import.meta.env.DEV) {
      console.log(`[${componentName}] Mounted`);
    }

    return () => {
      unmountTime.current = performance.now();
      const lifetime = unmountTime.current - mountTime.current;
      
      if (import.meta.env.DEV) {
        console.log(`[${componentName}] Unmounted after ${lifetime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);

  return {
    getLifetime: () => {
      if (unmountTime.current === 0) {
        return performance.now() - mountTime.current;
      }
      return unmountTime.current - mountTime.current;
    },
  };
} 