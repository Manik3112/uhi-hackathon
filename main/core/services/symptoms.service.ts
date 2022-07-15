import { RestClient } from './../../frame/modules/axios.module';
import { Configuration } from '../utils/configuration.utils';
import { Logger } from '../utils/logger.utils';
import { RestResponseType } from './../../frame/modules/express.module';

export class SymptomsService {
  private snomedRestClient: RestClient;
  private configuration: Configuration;
  private logger: Logger;

  constructor() {
    this.configuration = new Configuration();
    this.snomedRestClient = new RestClient(this.configuration.snomed);
    this.logger = new Logger({priority: 'high'});
  }

  async getSuggestions(): Promise<RestResponseType> {
    const response = await this.snomedRestClient.execute({
      endpoint: '',
      data: {},
      method: 'get',
      headers: {

        'Accept': 'application/json, text/plain, */*',
        
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
        
        'Connection': 'keep-alive',
        
        'Origin': 'http://localhost:4200',
        
        'Referer': 'http://localhost:4200/',
        
        'Sec-Fetch-Dest': 'empty',
        
        'Sec-Fetch-Mode': 'cors',
        
        'Sec-Fetch-Site': 'cross-site',
        
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        
        'sec-ch-ua-mobile': '?0',
        
        'sec-ch-ua-platform': '"macOS"'
        
        }
    });
    return response;
  }
}
