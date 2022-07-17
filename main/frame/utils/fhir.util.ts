var Fhir = require('fhir').Fhir;

export class FhirUtil {
  private fhir: any;
  constructor() {
    this.fhir = new Fhir();
  }
  convertToJson(fhir: any){
    try{
      return this.fhir.xmlToJson(fhir);
    }
    catch(e) {
      return fhir;
    }
  }
}