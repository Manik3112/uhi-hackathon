import { AxiosRestClient, AxiosRestClientType } from './../../frame/modules/axios.module';
import { Configuration } from '../utils/configuration.utils';
import { Logger } from '../utils/logger.utils';

export class UhiService {
  private restClient: AxiosRestClientType;
  private configuration: Configuration;
  private logger: Logger;

  constructor() {
    this.configuration = new Configuration();
    this.restClient = AxiosRestClient(this.configuration.webhookUrl);
    this.logger = new Logger({priority: 'high'});
  }

  async init(): Promise<unknown> {
    const response = await this.restClient({
      url: '',
      data: {request: true},
      params: {params: 'yes'},
      method: 'post',
    });
    this.logger.log(true, response.data, 'init()');
    return response.data;
  }
}
