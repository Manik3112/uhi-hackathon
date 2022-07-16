import { ResponseBuilder, RestClient } from './../../frame/modules/axios.module';
import { RestResponseType } from './../../frame/modules/express.module';
import { AppointmentModel } from '../models/appointment.model';
import { AppointmentDto } from '../dto/appointment.dto';
import { PatientModel } from '../models/patient.model';
import { EmrModel } from '../models/emr.model';
import { DoctorModel } from '../models/doctor.model';

export class AppointmentService {
  private model: AppointmentModel;
  private patientModel: PatientModel;
  private emrModel: EmrModel;
  private _doctorModel: DoctorModel;

  constructor() {
    this.model = new AppointmentModel();
    this.patientModel = new PatientModel();
    this.emrModel = new EmrModel();
    this._doctorModel = new DoctorModel();
  }

  async addAppointment(request: AppointmentDto): Promise<RestResponseType> {
    if(!request.patientId) request.patientId = await this.patientModel.insertPatient(request.patient);
    request.emrId = await this.emrModel.createBlankEmr({
      patientId: request.patientId,
      type: 'appointment'
    });
    const response = await this.model.insertAppointment(request);
    return ResponseBuilder(200, response);
  }
}
