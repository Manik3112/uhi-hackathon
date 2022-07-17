import { CommonUtil } from '../../frame/utils/common.util';
import { DbClient } from '../../frame/modules/dbClient.module';
import { PatientDto } from '../dto/patient.dto';

export class DocumentModel {
  private dbClient: DbClient;
  private commonUtil: CommonUtil;
  constructor() {
    this.dbClient = new DbClient('document');
    this.commonUtil = new CommonUtil();
  }

  async insertDocument(request: any) {
    const documentId = this.commonUtil.getuuidv4();
    await this.dbClient.db.insertOne({
      documentId,
      patientId: request.patientId,
      base64: request.base64,
      emrId: request.emrId,
      reportId: request.reportId,
      type: request.type,
      createdAt: this.commonUtil.getCurrentDate(),
      updatedAt: this.commonUtil.getCurrentDate(),
    });
    return documentId;
  }
  async getDocument(patientId: string) {
    return this.dbClient.db.find({
      patientId,
    }).toArray();
  }
  async blobUrlsEmr(patientId: string) {
    return this.dbClient.db.find({
      patientId,
      emrId: { $exists: 1 }
    }, { projection: { _id: 0, base64: 1 }}).toArray();
  }
  async blobUrlsRecords(patientId: string) {
    return this.dbClient.db.find({
      patientId,
      reportId: { $exists: 1 }
    }, { projection: { _id: 0, base64: 1 }}).toArray();
  }
}
