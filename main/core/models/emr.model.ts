import { CommonUtil } from '../../frame/utils/common.util';
import { DbClient } from '../../frame/modules/dbClient.module';
import { EmrDto } from '../dto/emr.dto';

export class EmrModel {
  private dbClient: DbClient;
  private commonUtil: CommonUtil;
  constructor() {
    this.dbClient = new DbClient('emr');
    this.commonUtil = new CommonUtil();
  }

  async createBlankEmr(request: {type: string, patientId: string, documentDate?: string}) {
    const emrId = this.commonUtil.getuuidv4();
    await this.dbClient.db.insertOne({
      emrId,
      symptoms: [],
      provisionalDiagnosis: [],
      medication: [],
      investigation: [],
      advice: [],
      status: 'new',
      patientId: request.patientId,
      type: request.type,
      documentDate: request.documentDate ? this.commonUtil.getDateObject(request.documentDate) : null,
      createdAt: this.commonUtil.getCurrentDate(),
      updatedAt: this.commonUtil.getCurrentDate(),
    })
    return emrId;
  }
  async getEmr(emrId: string) {
    return this.dbClient.db.findOne({
      emrId,
    }, {projection: { _id: 0 }});
  }
  async getDocument(patientId: string) {
    return this.dbClient.db.find({
      patientId,
      type: 'document'
    }, {projection: { _id: 0 }}).toArray();
  }
  async addEmrPatient(emrId: string, symptoms: string[]) {
    return this.dbClient.db.updateOne({
      emrId,
      symptoms: [],
    }, {$set: { symptoms }});
  }
  async updateEmrReceptionist(emrId: string, provisionalDiagnosis: string[]) {
    return this.dbClient.db.updateOne({
      emrId,
    }, {$set: {
      provisionalDiagnosis, 
      status: 'act',
    }});
  }
  async updateEmrDoctor(emrId: string, request: EmrDto) {
    return this.dbClient.db.updateOne({
      emrId,
    }, {
      $set: {
        symptoms: request.symptoms,
        symptomsDetails: request.symptomsDetails,
        provisionalDiagnosis: request.provisionalDiagnosis,
        medication: request.medication,
        investigation: request.investigation,
        advice: request.advice,
        status: 'com',
      }
    });
  }
  async findOne(emrId: string) {
    return await this.dbClient.db.findOne({
      emrId: emrId
    });
  }
}
