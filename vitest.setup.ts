// This setup file initializes localStorage for happy-dom environment
// Happy-dom doesn't provide localStorage by default in Node environments

if (typeof global.localStorage === 'undefined') {
  // Create a simple localStorage implementation if not available
  const store: Record<string, string> = {};

  global.localStorage = {
    getItem(key: string) {
      return store[key] ?? null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      Object.keys(store).forEach(key => delete store[key]);
    },
    key(index: number) {
      const keys = Object.keys(store);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(store).length;
    }
  } as Storage;
}
