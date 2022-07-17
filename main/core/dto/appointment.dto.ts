import { PatientDto } from "./patient.dto";

export type AppointmentDto = {
  status: any;
  appointmentId?: string,
  doctorId: string,
  patientId: string,
  patient: PatientDto,
  appointmentSource: string,
  slotTimeInMinutes?: string,
  isFollowUp: string,
  followUpAppointmentId: string,
  emrId: string,
  scheduleDatetime: string | Date,
  queueToken: number,
  createdAt?: Date,
  updatedAt?: Date,
}