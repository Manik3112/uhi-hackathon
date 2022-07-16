import { EmrService } from "../services/emr.service";
import { ExpressRequest, ExpressResponse, ExpressRouter } from "./../../frame/modules/express.module";

export class EmrController {
  constructor(private members: {emrService: EmrService}) {}

  routes(): ExpressRouter {
    const router = ExpressRouter();

    router.post('/addEmrPatient', this.addEmrPatient);
    router.post('/updateEmrReceptionist', this.updateEmrReceptionist);
    router.post('/updateEmrDoctor', this.updateEmrDoctor);

    return router;
  }

  addEmrPatient = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = await this.members.emrService.addEmrPatient(req.body);
    return res.status(response.status).json(response.data);
  };
  updateEmrReceptionist = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = await this.members.emrService.updateEmrReceptionist(req.body);
    return res.status(response.status).json(response.data);
  };
  updateEmrDoctor = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = await this.members.emrService.updateEmrDoctor(req.body);
    return res.status(response.status).json(response.data);
  };
}
