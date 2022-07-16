import { CommonUtil } from '../../frame/utils/common.util';
import { DbClient } from '../../frame/modules/dbClient.module';

export class EmrModel {
  private dbClient: DbClient;
  private commonUtil: CommonUtil;
  constructor() {
    this.dbClient = new DbClient('emr');
    this.commonUtil = new CommonUtil();
  }

  async createBlankEmr(request: {type: string, patientId: string}) {
    const emrId = this.commonUtil.getuuidv4();
    await this.dbClient.db.insertOne({
      emrId,
      symptoms: [],
      premetiveDiagnosis: [],
      medication: [],
      investigation: [],
      advice: [],
      patientId: request.patientId,
      type: request.type,
      createdAt: this.commonUtil.getCurrentDate(),
      updatedAt: this.commonUtil.getCurrentDate(),
    })
    return emrId;
  }
}
