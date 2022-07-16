export type EmrDto = {
  emrId?: string,
  symptoms: string[],
  premetiveDiagnosis: string[],
  medication: string[],
  investigation: string[],
  advice: string[],
  patientId: string,
  type: 'appointment' | 'document',
  createdAt?: Date,
  updatedAt?: Date,
}