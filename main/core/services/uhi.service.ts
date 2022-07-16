import { RestClient } from './../../frame/modules/axios.module';
import { Configuration } from '../utils/configuration.utils';
import { Logger } from '../utils/logger.utils';
import { RestResponseType } from './../../frame/modules/express.module';
import { UhiModel } from '../models/uhi.model';

export class UhiService {
  private restClient: RestClient;
  private configuration: Configuration;
  private logger: Logger;
  model: UhiModel;

  constructor() {
    this.configuration = new Configuration();
    this.restClient = new RestClient(this.configuration.webhookUrl);
    this.logger = new Logger({priority: 'high'});
    this.model = new UhiModel();
  }

  async init(): Promise<RestResponseType> {
    const response = await this.restClient.execute({
      endpoint: '',
      data: {request: true},
      params: {params: 'yes'},
      method: 'post',
    });
    this.model.findOneData();
    return this.restClient.ResponseBuilder(response.status, response.data);
  }
}
