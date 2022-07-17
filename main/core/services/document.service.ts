import { ResponseBuilder } from './../../frame/modules/axios.module';
import { RestResponseType } from './../../frame/modules/express.module';
import { EmrModel } from '../models/emr.model';
import { EmrDto } from '../dto/emr.dto';
import { DocumentModel } from '../models/document.model';
import { ReportModel } from '../models/report.model';
import { FhirService } from './fhir.service';
import { PatientModel } from '../models/patient.model';

export class DocumentService {
  private model: DocumentModel;
  private emrModel: EmrModel;
  private reportModel: ReportModel;
  private fhirService: FhirService;
  private patientModel: PatientModel;

  constructor() {
    this.model = new DocumentModel();
    this.emrModel = new EmrModel();
    this.reportModel = new ReportModel();
    this.patientModel = new PatientModel();
    this.fhirService = new FhirService();
  }

  async addDocument(request: any): Promise<RestResponseType> {
    // Parse Document to Structured Format
    const parsedDocument = this.parseDocument(request.base64);
    request.type = parsedDocument.type;
    request.documentDate = parsedDocument.documentDate;
    if(request.type == 'document') {
      request.emrId = await this.emrModel.createBlankEmr({type: request.type, patientId: request.patientId, documentDate: request.documentDate});
      this.emrModel.updateEmrDoctor(request.emrId, {
        symptoms: parsedDocument.symptoms,
        symptomsDetails: parsedDocument.symptomsDetails,
        provisionalDiagnosis: parsedDocument.provisionalDiagnosis,
        medication: parsedDocument.medication,
        investigation: parsedDocument.investigation,
        advice: parsedDocument.advice,
        patientId: request.patientId,
        documentDate: request.documentDate,
      } as unknown as EmrDto & {reportData: any})
    }
    else if(request.type == 'record') {
      request.reportId = await this.reportModel.insertReport({
        patientId: request.patientId,
        documentDate: request.documentDate,
        report: parsedDocument.report,
        base64: parsedDocument.base64,
      });
    }
    const response = await this.model.insertDocument(request);
    return ResponseBuilder(200, {response});
  }
  // Mocking THIS API
  private parseDocument(base64: string): any {
    // This Function Will take base64 and convert it into prescription or record on the basis of type matching the closest words.
    const type = 'document';
    let prescription, record;
    if(type == 'document') {
      prescription = {
        type:'document',
        documentDate: '2022-03-01 12:00:00',
        symptoms: ['fever'],
        symptomsDetails: {},
        provisionalDiagnosis: ['Fever'],
        medication: ['Dolo 1-0-1'],
        investigation: [],
        advice: [],
        reportData: {},
      };
      return prescription;
    }
    else if(type == 'record') {
      record = {
        type: 'record',
        documentDate: '2022-03-01 12:00:00',
        report: {
          bp: '123',
          b12: '100',
        },
        base64: base64
      }
      return record;
    }
    return null;
  }
  async dataPush(request: {abhaAddress: string, fhir: Record<string, any>}) {
    const patient = await this.patientModel.fetchPatientFromAbha(request.abhaAddress);
    const convertedData = this.fhirService.parseFhirDocument(request.fhir);
    if(this.isPrescription(convertedData)){
      const emrId = await this.emrModel.createBlankEmr({type: 'document', patientId: patient.patientId });
      this.emrModel.updateEmrDoctor(emrId, {
        symptoms: [],
        symptomsDetails: [],
        provisionalDiagnosis: [],
        medication: convertedData.medication,
        investigation: [],
        advice: [],
        patientId: patient.patientId,
      } as unknown as EmrDto & {reportData: any});
      this.model.insertDocument({
        patientId: patient.patientId,
        emrId,
        type: 'document'
      });
    } else if(this.isReport(convertedData)) {
      const reportId = await this.reportModel.insertReport({
        patientId: patient.patientId,
        report: convertedData.observation,
      });
      this.model.insertDocument({
        patientId: patient.patientId,
        reportId,
        type: 'record'
      });
    }
    return ResponseBuilder(200, {message: 'Data will be Uploaded'});
  }
  private isPrescription(convertedData: { observation: any; medication: any; }) {
    return convertedData.medication ? true : false;
  }
  private isReport(convertedData: { observation: any; medication: any; }) {
    return convertedData.observation ? true : false;
  }
  async getReport(request: {patientId: string}) {
    const response = await this.model.getDocument(request.patientId)
    const report = [];
    for(let i = 0; i < response.length; i++){
      const x = await this.reportModel.getReport(response[i].reportId);
      if(x) report.push(x);
    }
    return ResponseBuilder(200, report);
  }
  async getDocument(request: {patientId: string}) {
    const response = await this.emrModel.getDocument(request.patientId)
    return ResponseBuilder(200, response);
  }
}
