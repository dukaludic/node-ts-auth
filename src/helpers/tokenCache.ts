import NodeCache from 'node-cache';

export interface TokenCache {
    readonly nodeCache: NodeCache;
    tryGet(id: number): string | undefined;
    set(id: number, refreshToken: string): void;
    clear(id: number): void;
}

class Cache implements Cache {
    readonly nodeCache = new NodeCache();

    tryGet(id: number): string | undefined {
        logCache(this.nodeCache);
        return this.nodeCache.get(id);
    }

    set(id: number, refreshToken: string): void {
        console.log('SET CACHE PARAMS ', id, refreshToken);
        logCache(this.nodeCache);
        this.nodeCache.set(id, refreshToken);
        logCache(this.nodeCache);
    }

    clear(id: number): void {
        logCache(this.nodeCache);
        this.nodeCache.del(id);
        logCache(this.nodeCache);
    }
}

const logCache = (cache: NodeCache) => {
    console.log('logCache')
    console.log(cache.keys())
}

export default new Cache();
