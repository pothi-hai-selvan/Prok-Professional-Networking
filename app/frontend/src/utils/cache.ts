interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items in cache
}

class APICache {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes
  private maxSize = 100;

  constructor(options: CacheOptions = {}) {
    this.defaultTTL = options.ttl || this.defaultTTL;
    this.maxSize = options.maxSize || this.maxSize;
    
    // Clean up expired items every minute
    setInterval(() => this.cleanup(), 60 * 1000);
  }

  set<T>(key: string, data: T, ttl?: number): void {
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats() {
    const now = Date.now();
    let expiredCount = 0;
    let validCount = 0;

    for (const item of this.cache.values()) {
      if (now - item.timestamp > item.ttl) {
        expiredCount++;
      } else {
        validCount++;
      }
    }

    return {
      total: this.cache.size,
      valid: validCount,
      expired: expiredCount,
      maxSize: this.maxSize,
    };
  }
}

// Create a singleton instance
export const apiCache = new APICache();

// Cache keys for different data types
export const CACHE_KEYS = {
  POSTS: (page: number, filters: any) => `posts:${page}:${JSON.stringify(filters)}`,
  POST: (id: number) => `post:${id}`,
  CATEGORIES: 'categories',
  POPULAR_TAGS: 'popular-tags',
  USER_PROFILE: (id: number) => `user:${id}`,
} as const;

// Cache utilities for specific data types
export const cacheUtils = {
  // Posts cache
  setPosts: (page: number, filters: any, data: any) => {
    const key = CACHE_KEYS.POSTS(page, filters);
    apiCache.set(key, data, 2 * 60 * 1000); // 2 minutes TTL for posts
  },

  getPosts: (page: number, filters: any) => {
    const key = CACHE_KEYS.POSTS(page, filters);
    return apiCache.get(key);
  },

  // Individual post cache
  setPost: (id: number, data: any) => {
    const key = CACHE_KEYS.POST(id);
    apiCache.set(key, data, 5 * 60 * 1000); // 5 minutes TTL for individual posts
  },

  getPost: (id: number) => {
    const key = CACHE_KEYS.POST(id);
    return apiCache.get(key);
  },

  // Categories cache
  setCategories: (data: any) => {
    apiCache.set(CACHE_KEYS.CATEGORIES, data, 30 * 60 * 1000); // 30 minutes TTL
  },

  getCategories: () => {
    return apiCache.get(CACHE_KEYS.CATEGORIES);
  },

  // Popular tags cache
  setPopularTags: (data: any) => {
    apiCache.set(CACHE_KEYS.POPULAR_TAGS, data, 30 * 60 * 1000); // 30 minutes TTL
  },

  getPopularTags: () => {
    return apiCache.get(CACHE_KEYS.POPULAR_TAGS);
  },

  // User profile cache
  setUserProfile: (id: number, data: any) => {
    const key = CACHE_KEYS.USER_PROFILE(id);
    apiCache.set(key, data, 10 * 60 * 1000); // 10 minutes TTL
  },

  getUserProfile: (id: number) => {
    const key = CACHE_KEYS.USER_PROFILE(id);
    return apiCache.get(key);
  },

  // Invalidate related cache entries
  invalidatePosts: () => {
    const keys = apiCache.keys();
    keys.forEach(key => {
      if (key.startsWith('posts:')) {
        apiCache.delete(key);
      }
    });
  },

  invalidatePost: (id: number) => {
    const key = CACHE_KEYS.POST(id);
    apiCache.delete(key);
    // Also invalidate posts lists since they might contain this post
    cacheUtils.invalidatePosts();
  },

  invalidateUserProfile: (id: number) => {
    const key = CACHE_KEYS.USER_PROFILE(id);
    apiCache.delete(key);
  },

  // Clear all cache
  clearAll: () => {
    apiCache.clear();
  },

  // Get cache statistics
  getStats: () => {
    return apiCache.getStats();
  },
};

// Hook for using cache in React components
export function useCache() {
  return {
    cache: apiCache,
    utils: cacheUtils,
    getStats: () => apiCache.getStats(),
  };
}

// Utility function to create cache keys with query parameters
export function createCacheKey(baseKey: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  return sortedParams ? `${baseKey}?${sortedParams}` : baseKey;
}

// Utility function to debounce cache operations
export function debounceCache<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default APICache; 