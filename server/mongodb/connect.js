const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config();
const dbUrl = "mongodb+srv://smannarino137:Spiderman123@cluster0.sgon1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"// use this with .env file process.env.MONGODB_URI;


let instance;

class DB {
  constructor(){
    //instance is the singleton, defined in outer scope
    if (!instance){
      instance = this;
      this.client = new MongoClient(dbUrl, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
});
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  async createIndex(collectionName, fields, options = {}) {
    try {
      if (!this.db) {
        await this.connect();
      }
      const collection = this.db.collection(collectionName);
      await collection.createIndex(fields, options);
    } catch (error) {
      console.error(`Failed to create index on ${collectionName}: ${error}`);
      throw error;
    }
  }

  async connect(dbname, collName) {
    if (instance.db){
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbname);
    // Send a ping to confirm a successful connection
    await instance.client.db(dbname).command({ ping: 1 });
    // eslint-disable-next-line no-console
    console.log('Successfully connected to MongoDB database' + dbname);
    instance.collection = await instance.db.collection(collName);
  }

  async close() {
    await instance.client.close();
    instance = null;
  }

  async open(dbname, collName) {
    try {
      await instance.connect(dbname, collName);
    } finally {
      await instance.close();
    }
  }

  async readAll() {
    return await instance.collection.find({}).toArray();
  }

  async create(show) {
    return await instance.collection.insertOne(show);
  } 

  async createMany(array) {
    const result = await instance.collection.insertMany(array);
  }

  async deleteMany(filter) {
    const result = await instance.collection.deleteMany(filter);
  }

  async findShowById(id) {
    return await instance.collection.findOne({ id: id });
  }

  async findRandomFourShows() {
    const result = await instance.collection.aggregate([{ $sample: { size: 4 } }]).toArray();
    return result;
  }
}

module.exports = DB;
