import { CommonUtil } from '../../frame/utils/common.util';
import { DbClient } from '../../frame/modules/dbClient.module';
import { PatientDto } from '../dto/patient.dto';

export class PatientModel {
  private dbClient: DbClient;
  private commonUtil: CommonUtil;
  constructor() {
    this.dbClient = new DbClient('patient');
    this.commonUtil = new CommonUtil();
  }

  async insertPatient(request: PatientDto) {
    const patientId = this.commonUtil.getuuidv4();
    await this.dbClient.db.updateOne({
      phoneNumber: request.phoneNumber,
      firstName: request.firstName,
      lastName: request.lastName,
    },{
      $setOnInsert : {
        patientId,
        gender: request.gender,
        age: request.age,
        documents: [],
        medicalHistory: [],
        createdAt: this.commonUtil.getCurrentDate(),
        updatedAt: this.commonUtil.getCurrentDate(),
      }
    },
    { upsert: true },
    )
    return patientId;
  }
  async fetchPatient(patientId: string) {
    return await this.dbClient.db.findOne({
      patientId,
    }, {projection: { _id: 0 }});
  }
}
