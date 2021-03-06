import { CommonUtil } from '../../frame/utils/common.util';
import { DbClient } from '../../frame/modules/dbClient.module';

export class ReportModel {
  private dbClient: DbClient;
  private commonUtil: CommonUtil;
  constructor() {
    this.dbClient = new DbClient('report');
    this.commonUtil = new CommonUtil();
  }

  async insertReport(request: any) {
    const reportId = this.commonUtil.getuuidv4();
    await this.dbClient.db.insertOne({
      reportId,
      patientId: request.patientId,
      report: request.report,
      documentDate: this.commonUtil.getDateObject(request.documentDate),
      createdAt: this.commonUtil.getCurrentDate(),
      updatedAt: this.commonUtil.getCurrentDate(),
    });
    return reportId;
  }
  async getReport(reportId: string) {
    return this.dbClient.db.findOne({
      reportId,
    });
  }
}
