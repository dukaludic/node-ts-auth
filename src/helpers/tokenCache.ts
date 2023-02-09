import NodeCache from 'node-cache';

class TokenCache {
    private readonly nodeCache = new NodeCache();

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

export default new TokenCache();
