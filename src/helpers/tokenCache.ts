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
        return this.nodeCache.get(id);
    }

    set(id: number, refreshToken: string): void {
        this.nodeCache.set(id, refreshToken);
    }

    clear(id: number) {
        this.nodeCache.del(id);
    }
}

export default new Cache();
