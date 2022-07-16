import { RestClient } from './../../frame/modules/axios.module';
import { Configuration } from '../utils/configuration.utils';
import { Logger } from '../utils/logger.utils';
import { ExpressRequest, RestResponseType } from './../../frame/modules/express.module';
import PatientData from '../utils/patientUtils/PatientsData';

export class SymptomsService {
  private snomedRestClient: RestClient;
  private configuration: Configuration;
  private logger: Logger;

  constructor() {
    this.configuration = new Configuration();
    this.snomedRestClient = new RestClient(this.configuration.snomed);
    this.logger = new Logger({priority: 'high'});
  }

  async getSuggestions(req: ExpressRequest | any): Promise<RestResponseType> {
   
    const response = await this.snomedRestClient.execute({
      endpoint: `?url=http%3A%2F%2Fsnomed.info%2Fsct%3Ffhir_vs%3Decl%2F%3C%20404684003&count=5&includeDesignations=true&filter=${req.Symptom}`,
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
   
    const data = response.data['expansion']['contains'];
    const mapData = data.map((a: { designation: any; }) => a.designation);
    const getMappedData = [].concat.apply([], mapData) as any;
    const fetchSuggestions = getMappedData.map((a: { value: any; }) => a.value);

    return {
      status: 200,
      data: fetchSuggestions
    };
    
  }

  async getPatientSuggestions(req: ExpressRequest | any): Promise<RestResponseType> {
    const staticPatientSuggestions = PatientData;
    
    let arr = new Array;
   
    staticPatientSuggestions.forEach((patientRecord) => {
      if(req.Specialization === patientRecord.Specialization) {
      arr.push(patientRecord);
    }
    })
    
    const updatedPatientsRecord = arr.reduce((obj, item) => ({
      ...obj,
      [item.Specialization]: item
    }), {});

    return this.returnWithSuccessStatusAndRecord(updatedPatientsRecord); 

  }

  private returnWithSuccessStatusAndRecord(record : any): RestResponseType | PromiseLike<RestResponseType> {
    return {
      status: 200,
      data: record
    };
  }
}
