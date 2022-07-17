import { ResponseBuilder } from './../../frame/modules/axios.module';
import { RestResponseType } from './../../frame/modules/express.module';
import { AppointmentModel } from '../models/appointment.model';
import { AppointmentDto } from '../dto/appointment.dto';
import { DoctorDto } from '../dto/doctor.dto';
import { PatientModel } from '../models/patient.model';
import { EmrModel } from '../models/emr.model';
import { DoctorModel } from '../models/doctor.model';

export class AppointmentService {
  private model: AppointmentModel;
  private patientModel: PatientModel;
  private emrModel: EmrModel;
  private doctorModel: DoctorModel;

  constructor() {
    this.model = new AppointmentModel();
    this.patientModel = new PatientModel();
    this.emrModel = new EmrModel();
    this.doctorModel = new DoctorModel();
  }

  async addAppointment(request: AppointmentDto): Promise<RestResponseType> {
    const validFields: {doctor: DoctorDto; patientId: string} = {doctor: {} as DoctorDto, patientId: ''};
    if(request.isFollowUp && (!request.followUpAppointmentId || !request.patientId)){
      return ResponseBuilder(400, {error: `Details not Found`, patientId: request.patientId ?? '', followUpAppointmentId: request.followUpAppointmentId ?? ''})
    }
    if(!request.patientId) request.patientId = validFields.patientId = await this.patientModel.insertPatient(request.patient);
    else validFields.patientId = await this.patientModel.fetchPatient(request.patientId);
    validFields.doctor = await this.doctorModel.fetchDoctor(request.doctorId);
    if(!validFields.doctor || !validFields.patientId){
      return ResponseBuilder(400, {error: `Details not valid`, doctorId: request.doctorId, patient: request.patientId})
    }
    request.emrId = await this.emrModel.createBlankEmr({
      patientId: request.patientId,
      type: 'appointment'
    });
    request.slotTimeInMinutes = validFields.doctor.slotTimeInMinutes;
    const response = await this.model.insertAppointment(request);
    return ResponseBuilder(200, response);
  }
  async getAppointment(request: {appointmentId: string}): Promise<RestResponseType> {
    const appointment = await this.model.getAppointment(request.appointmentId);
    const emr = await this.emrModel.getEmr(appointment.emrId);
    return ResponseBuilder(200, {...appointment, emr});
  }
  async listAppointment(request: {date: string}): Promise<RestResponseType> {
    const appointment = await this.model.listAppointment(request.date);
    for(let i=0; i < appointment.length; i++ ) {
      appointment[i].patient = await this.patientModel.fetchPatient(appointment[i].patientId)
    }
    return ResponseBuilder(200, appointment);
  }
}
