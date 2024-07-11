export interface MongoDbOptions {
    /**
     * The MongoDB connection string.
     */
    connectionString: string;
    /**
     * The name of the database to use.
     * @default "unstorage"
     */
    databaseName?: string;
    /**
     * The name of the collection to use.
     * @default "unstorage"
     */
    collectionName?: string;
}
declare const _default: (opts: MongoDbOptions) => import("../types").Driver;
export default _default;
