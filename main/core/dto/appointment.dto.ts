import { PatientDto } from "./patient.dto";

export type AppointmentDto = {
  appointmentId?: string,
  doctorId: string,
  patientId: string,
  patient: PatientDto,
  appointmentSource: string,
  isFollowUp: string,
  followUpAppointmentId: string,
  emrId: string,
  createdAt?: Date,
  updatedAt?: Date,

}