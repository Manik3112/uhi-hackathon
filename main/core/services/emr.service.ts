import { ResponseBuilder } from './../../frame/modules/axios.module';
import { RestResponseType } from './../../frame/modules/express.module';
import { EmrModel } from '../models/emr.model';
import { EmrDto } from '../dto/emr.dto';

export class EmrService {
  private model: EmrModel;

  constructor() {
    this.model = new EmrModel();
  }

  async addEmrPatient(request: EmrDto): Promise<RestResponseType> {
    const response = await this.model.addEmrPatient(request.emrId, request.symptoms);
    return ResponseBuilder(200, response);
  }
  async updateEmrReceptionist(request: EmrDto): Promise<RestResponseType> {
    const response = await this.model.updateEmrReceptionist(request.emrId, request.provisionalDiagnosis);
    return ResponseBuilder(200, response);
  }
  async updateEmrDoctor(request: EmrDto): Promise<RestResponseType> {
    const response = await this.model.updateEmrDoctor(request.emrId, request);
    return ResponseBuilder(200, response);
  }
}
