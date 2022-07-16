import { DbClient } from './../../frame/modules/dbClient.utils';

export class UhiModel {
  private dbClient: DbClient;
  constructor() {
    this.dbClient = new DbClient('uhi');
  }

  async findOneData() {
    const data = await this.dbClient.db.findOne({ title: 'Back to the Future' })
    // this.dbClient.db.insert({});
    // this.dbClient.db.aggregate([{}]);
    return data;
  }
}
