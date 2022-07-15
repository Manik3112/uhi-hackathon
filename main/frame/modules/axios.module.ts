import axios, { AxiosInstance } from 'axios';
import { Logger } from './../../core/utils/logger.utils';
import { RestResponseType } from './express.module';

export type AxiosRestClientType = AxiosInstance;

function AxiosRestClient(baseUrl: string): AxiosRestClientType {
  return axios.create({
    baseURL: baseUrl,
  });
}

export class RestClient {
  private restClient: AxiosRestClientType;
  private logger: Logger;

  constructor(baseUrl: string) {
    this.restClient = AxiosRestClient(baseUrl);
    this.logger = new Logger({priority: 'high'});
  }
  async execute(request: any): Promise<RestResponseType> {
    return new Promise((resolve, reject) => {
      this.restClient({
        url: request.endpoint,
        data: request.data,
        params: request.params,
        method: request.post,
        headers: request.headers,
      })
      .then(response => {
        this.logger.log(true, response.data, 'init()');
        resolve(this.ResponseBuilder(response.status, response.data));
      })
      .catch(error => {
        this.logger.error(error, request.url);
         resolve(this.ResponseBuilder(400, {error : error.message || 'Something Went Wrong.', code: error.code}));
      });
    })
  }
  ResponseBuilder(status: number, data: Record<string, any>) {
    return {
      status: status,
      data: data,
    }
  }
}