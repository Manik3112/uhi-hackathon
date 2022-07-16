export class Configuration {
  webhookUrl: string
  snomed: string
  mongoDB: string
  dbName: string

  constructor() {
    this.webhookUrl = process.env.WEBHOOK_URL!;
    this.snomed = process.env.SNOMED_URL!;
    this.mongoDB = process.env.MONGO_DB!;
    this.dbName = process.env.DB_NAME!;
  }
}
