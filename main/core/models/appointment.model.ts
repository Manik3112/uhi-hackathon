import { AppointmentDto } from '../dto/appointment.dto';
import { DbClient } from '../../frame/modules/dbClient.module';
import { CommonUtil } from '../../frame/utils/common.util';

export class AppointmentModel {
  private dbClient: DbClient;
  private commonUtil: CommonUtil;
  constructor() {
    this.dbClient = new DbClient('appointment');
    this.commonUtil = new CommonUtil();
  }

  async insertAppointment(request: AppointmentDto) {
    const appointmentId = this.commonUtil.getuuidv4();
    return {
      appointmentId,
      resp: await this.dbClient.db.insertOne({
        appointmentId,
        doctorId: request.doctorId,
        patientId: request.patientId,
        appointmentSource: request.appointmentSource,
        isFollowUp: request.isFollowUp,
        slotTimeInMinutes: request.slotTimeInMinutes,
        followUpAppointmentId: request.followUpAppointmentId,
        emrId: request.emrId,
        scheduleDatetime: this.commonUtil.getDateObject(request.scheduleDatetime),
        createdAt: this.commonUtil.getCurrentDate(),
        updatedAt: this.commonUtil.getCurrentDate(),
      })
    }
  }
  async getAppointment(appointmentId: string): Promise<AppointmentDto> {
    return this.dbClient.db.findOne({
      appointmentId,
    }, {projection: { _id: 0 }});
  }
}
