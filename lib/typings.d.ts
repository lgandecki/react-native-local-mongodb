declare module 'react-native-local-mongodb' {
  export interface Options {
    filename?: string;
    inMemoryOnly?: boolean;
    timestampData?: boolean;
    autoload?: boolean;
    onload?: Function;
    afterSerialization?: Function;
    beforeDeserialization?: Function;
    corruptAlertThreshold?: number;
    compareStrings?: Function;
  }

  export interface IndexOptions {
    fieldName: string;
    unique?: boolean;
    sparse?: boolean;
    expireAfterSeconds?: number;
  }

  export interface UpdateOptions {
    multi?: boolean;
    upsert?: boolean;
    returnUpdatedDocs?: boolean;
  }

  export interface RemoveOptions {
    multi?: boolean;
  }

  export interface MongoDocument {
    [key: string]: any;
  }

  export interface Cursor<T> {
    exec(): Promise<T>;
    exec(cb: Callback<T>): void;
    skip(value: number): Cursor<T>;
    limit(value: number): Cursor<T>;
    sort(doc: MongoDocument): Cursor<T>;
  }

  export type Query = object;
  export type Projection = any;
  export type Callback<T = void> = (err: Error | null, value: T) => void;
  export type InsertCallback = (err: Error | null, doc: MongoDocument) => void;
  export type CountCallback = (err: Error | null, count: number) => void;
  export type FindCallback = (err: Error | null, docs: MongoDocument[]) => void;
  export type FindOneCallback = (err: Error | null, doc: MongoDocument) => void;
  export type UpdateCallback = (
    err: Error | null,
    numAffected: number,
    affectedDocuments: MongoDocument | MongoDocument[] | null,
    upsert: boolean,
  ) => void;
  export type RemoveCallback = (err: Error | null, numAffected: number) => void;

  type UpdateQuery<T> = {
    $inc?: { [P in keyof T]?: number } | { [key: string]: number };
    $min?: { [P in keyof T]?: number } | { [key: string]: number };
    $max?: { [P in keyof T]?: number } | { [key: string]: number };
    $mul?: { [P in keyof T]?: number } | { [key: string]: number };
    $set?: Partial<T> | { [key: string]: any };
    $setOnInsert?: Partial<T> | { [key: string]: any };
    $unset?: { [P in keyof T]?: '' } | { [key: string]: '' };
    $rename?: { [key: string]: keyof T } | { [key: string]: string };
    $currentDate?: { [P in keyof T]?: (true | { $type: 'date' | 'timestamp' }) } | { [key: string]: (true | { $type: 'date' | 'timestamp' }) };
    $addToSet?: Partial<T> | { [key: string]: any };
    $pop?: { [P in keyof T]?: -1 | 1 } | { [key: string]: -1 | 1 };
    $pull?: Partial<T> | { [key: string]: Condition<T, keyof T> };
    $push?: Partial<T> | { [key: string]: any };
    $pushAll?: Partial<T> | { [key: string]: Array<any> };
    $each?: Partial<T> | { [key: string]: Array<any> };
    $bit?: { [P in keyof T]?: any } | { [key: string]: any };
  };

  export default class Datastore<T> {
    constructor(options?: Options);
    public loadDatabase(): void;
    public getAllData(): any[];
    public resetIndexes(newData: any): void;
    public ensureIndex(options: IndexOptions, callback?: Callback): void;
    public removeIndex(fieldName: string, callback?: Callback): void;
    public addToIndexes(doc: MongoDocument): void;
    public removeFromIndexes(doc: MongoDocument): void;
    public updateIndexes(oldDoc: MongoDocument, newDoc: MongoDocument): void;
    public getCandidates(query: Query, dontExpireStaleDocs: boolean, callback?: Callback): void;
    public insert(newDoc: MongoDocument, cb: InsertCallback): void;
    public createNewId(): number;
    public count(query: Query): Cursor<number>;
    public count(query: Query, callback: Callback<number>): void;
    public find(query: Query): Cursor<MongoDocument[]>;
    public find(query: Query, projection: Projection): Cursor<MongoDocument[]>;
    public find(query: Query, projection: Projection, callback: Callback<MongoDocument[]>): void;
    public findOne(query: Query): Cursor<MongoDocument>;
    public findOne(query: Query, projection: Projection): Cursor<MongoDocument>;
    public findOne(query: Query, projection: Projection, callback: Callback<MongoDocument>): void;
    public update(query: Query, doc: MongoDocument, options?: UpdateOptions, callback?: UpdateCallback): void;
    public remove(query: Query, options?: RemoveOptions, callback?: RemoveCallback): void;
    public loadDatabaseAsync(): Promise<void>;
    public findAsync(query: Query): Promise<T[]>;
    public findOneAsync(query: Query): Promise<T>;
    public insertAsync(newDoc: T): Promise<T>;
    public updateAsync(query: Query, doc: T | UpdateQuery<T>, options?: UpdateOptions): Promise<T>;
    public removeAsync(query: Query, options?: RemoveOptions): Promise<number>;
  }
}
