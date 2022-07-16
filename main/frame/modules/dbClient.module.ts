import { Configuration } from "../../core/utils/configuration.utils";
import { Logger } from "../../core/utils/logger.utils";

import { MongoClient } from "mongodb";

export class DbClient {
  private logger: Logger;
  private configuration: Configuration;
  private client: any;
  private database: any;
  db: any;

  constructor(collectionName: string) {
    this.configuration = new Configuration();
    this.client = new MongoClient(this.configuration.mongoDB);
    this.logger = new Logger({priority: 'high'});
    this.database = this.client.db(this.configuration.dbName);
    this.initializeDatabase(collectionName)
  }
  initializeDatabase(collectionName: string) {
    this.logger.log(true, collectionName, 'Databse Connection')
    this.db = this.database.collection(collectionName);
  }
}