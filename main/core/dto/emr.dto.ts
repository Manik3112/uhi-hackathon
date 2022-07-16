export type EmrDto = {
  emrId: string,
  symptoms: string[],
  symptomsDetails: Record<string, Record<string, any>[]>,
  provisionalDiagnosis: string[],
  medication: string[],
  investigation: string[],
  advice: string[],
  patientId: string,
  type: 'appointment' | 'document',
  createdAt?: Date,
  updatedAt?: Date,
}