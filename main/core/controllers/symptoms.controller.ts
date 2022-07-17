import { SymptomsService } from "../services/symptoms.service";
import { ExpressRequest, ExpressResponse, ExpressRouter } from "./../../frame/modules/express.module";

export class SymptomsController {
  constructor(private members: {symptomsService: SymptomsService}) {}

  routes(): ExpressRouter {
    const router = ExpressRouter();

    // --- Patient Usecase ---
    router.post('/suggestions', this.getSuggestions);
    router.post('/patient/suggestions', this.getPatientSuggestions);

    // --- Doctor Usecase ---
    router.post('/doctor/checkup', this.getDoctorCheckupDetails);
    router.post('/doctor/suggestions', this.getDoctorSuggestions);

    return router;
  }

  getSuggestions = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = await this.members.symptomsService.getSuggestions(req.body);
    return res.status(response.status).json(response.data);
  };

  getPatientSuggestions = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = await this.members.symptomsService.getPatientSuggestions(req.body);
    return res.status(response.status).json(response.data);
  };

  getDoctorCheckupDetails = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = await this.members.symptomsService.getDoctorCheckupDetails(req.body);
    return res.status(response.status).json(response.data);
  };

  getDoctorSuggestions = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = await this.members.symptomsService.getDoctorSuggestions(req.body);
    return res.status(response.status).json(response.data);
  };

}
