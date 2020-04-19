import { MongoClient, Db } from 'mongodb';
import logger from './logger';
import CommonObject from './interface/CommonObject';
import { CONFIG } from './constants';
const { DB_URL, DB_NAME } = CONFIG;
const singletonEnforcer = Symbol();
const instance = Symbol();

class Database {
    private connection;
    private db:Db;

    constructor(enforcer) {
        if(enforcer !== singletonEnforcer){
            logger.error('Cannot instantiate new instance');
        }
    }

    static getDBInstance(){
        if(!this[instance]){
            this[instance] = new Database(singletonEnforcer);
        }
        return this[instance];
    }

    async connectToDatabase() {
        try {
            this.connection = await MongoClient.connect(DB_URL, { useUnifiedTopology: true });
            this.db = this.connection.db(DB_NAME);
            logger.info(`Connected successfully to ${DB_NAME} database`);
        } catch(err) {
            logger.error(`connection error ${err.message}`)
        };
    }

    async insertData(collection_name: string, data: CommonObject, query: CommonObject) {
        try{
            return this.db
                .collection(collection_name)
                .updateOne(query, data, { upsert: true});
        }catch(err) {
            logger.error(`Query error ${err.message}`)
        };
    }

    async selectData(collection_name: string, query: CommonObject) {
        try{
            return this.db.collection(collection_name)
                .find(query)
                .toArray();
        } catch(err) {
            logger.error(`Query error ${err.message}`)
        }
    }
}

export default Database;