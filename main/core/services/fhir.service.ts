import { FhirUtil } from "./../../frame/utils/fhir.util";

export class FhirService {
  private fhirUtil: FhirUtil;

  constructor() {
    this.fhirUtil = new FhirUtil();
  }
  parseFhirDocument(fhir: any) {
    fhir = this.fhirUtil.convertToJson(fhir);
    const observation = {}, medication = {};
    for(const entry of fhir.entry) {
      if(entry?.resource?.resourceType == 'Medication') {
        this.fetchFromCode(medication, entry?.resource);
      }
      if(entry?.resource?.resourceType == 'Observation') {
        this.fetchFromCode(observation, entry?.resource);
      }
    }
    return {
      observation, medication
    }
  }
  private fetchFromCode(object: any, resource: any) {
    object[resource?.code?.text] = resource.valueString;
  }
}
