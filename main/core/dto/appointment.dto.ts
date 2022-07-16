import { PatientDto } from "./patient.dto";

export type AppointmentDto = {
  doctorId: string,
  patientId: string,
  patient: PatientDto,
  appointmentSource: string,
  isFollowUp: string,
  followUpAppointmentId: string,
  emrId: string,
}