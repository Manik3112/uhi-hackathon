import { ResponseBuilder } from './../../frame/modules/axios.module';
import { RestResponseType } from './../../frame/modules/express.module';
import { EmrModel } from '../models/emr.model';
import { EmrDto } from '../dto/emr.dto';
import { DocumentModel } from '../models/document.model';
import { ReportModel } from '../models/report.model';

export class DocumentService {
  private model: DocumentModel;
  private emrModel: EmrModel;
  private reportModel: ReportModel;

  constructor() {
    this.model = new DocumentModel();
    this.emrModel = new EmrModel();
    this.reportModel = new ReportModel();
  }

  async addDocument(request: any): Promise<RestResponseType> {
    // Parse Document to Structured Format
    const parsedDocument = this.parseDocument(request.base64);
    request.type = parsedDocument.type;
    request.documentDate = parsedDocument.documentDate;
    if(request.type == 'document') {
      request.emrId = await this.emrModel.createBlankEmr({type: request.type, patientId: request.patientId});
      this.emrModel.updateEmrDoctor(request.emrId, {
        symptoms: parsedDocument.symptoms,
        symptomsDetails: parsedDocument.symptomsDetails,
        provisionalDiagnosis: parsedDocument.provisionalDiagnosis,
        medication: parsedDocument.medication,
        investigation: parsedDocument.investigation,
        advice: parsedDocument.advice,
        patientId: request.patientId,
      } as unknown as EmrDto & {reportData: any})
    }
    else if(request.type == 'report') {
      request.reportId = await this.reportModel.insertReport({
        patientId: request.patientId,
        report: parsedDocument.reportData,
      });
    }
    const response = await this.model.insertDocument(request);
    return ResponseBuilder(200, {response});
  }
  private parseDocument(base64: string) {
    return {
      type: 'record',
      documentDate: '2022-03-01 12:00:00',
      symptoms: ['fever'],
      symptomsDetails: {},
      provisionalDiagnosis: ['Fever'],
      medication: ['Dolo 1-0-1'],
      investigation: [],
      advice: [],
      reportData: {},
    };
  }
}
