/**
 * @param {number} capacity
 */
const LRUCache = function (capacity: number) {
    this.cache = new Map<any, any>()
    this.capacity = capacity
};

/** 
 * @param {any} key
 * @return {any}
 */
LRUCache.prototype.get = function (key: string) {
    const { cache } = this
    if (!cache.has(key)) {
        return -1
    }
    const val = cache.get(key)
    cache.delete(key)
    cache.set(key, val)
    return val
};

/** 
 * @param {any} key 
 * @param {any} value
 * @return {void}
 */
LRUCache.prototype.put = function (key: any, value: any) {
    const { cache, capacity } = this
    if (cache.has(key)) {
        cache.delete(key)
    }
    if (cache.size === capacity) {
        const it = cache.keys()
        cache.delete(it.next().value)
    }
    cache.set(key, value)
};


export default LRUCache
