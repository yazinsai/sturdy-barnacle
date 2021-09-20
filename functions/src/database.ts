import { MongoClient, Db, CollectionOptions } from 'mongodb'

class Database {
  #client: MongoClient;
  db: Db;

  async connect() {
    if(process.env.DATABASE_URL == null || 
      process.env.DATABASE_URL.length == 0) {
        throw Error('Environment variable "DATABASE_URL" is undefined')
    }

    this.#client = new MongoClient(process.env.DATABASE_URL);
    await this.#client.connect()
    this.db = this.#client.db()
    console.log('Connected to Database')
  }

  collection<T>(name: string, options?: CollectionOptions) {
    return this.db.collection<T>(name, options)
  }

  async disconnect() {
    this.#client.close()
  }
}

export default new Database()