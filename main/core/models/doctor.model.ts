import { CommonUtil } from '../../frame/utils/common.util';
import { DbClient } from '../../frame/modules/dbClient.module';

export class DoctorModel {
  private dbClient: DbClient;
  private commonUtil: CommonUtil;
  constructor() {
    this.dbClient = new DbClient('doctor');
    this.commonUtil = new CommonUtil();
    this.createDemoDoctor();
  }

  private async createDemoDoctor() {
  let doctor = await this.dbClient.db.findOne({"doctorId" : "b84a4ded-d7db-4329-b58f-febe1248ca69"});
    if(!doctor){
      doctor = { doctorId: 'b84a4ded-d7db-4329-b58f-febe1248ca69' };
      await this.dbClient.db.insertOne({
        doctorId: doctor.doctorId,
        fistName : 'Manik',
        lastName : 'Rastogi',
        phoneNumber : '8909509598',
        speciality : 'general-physician',
        createdAt: this.commonUtil.getCurrentDate(),
        updatedAt: this.commonUtil.getCurrentDate(),
      })
    }
    return doctor.doctorId;
  }
}
