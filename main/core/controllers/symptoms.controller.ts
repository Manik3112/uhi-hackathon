import { SymptomsService } from "../services/symptoms.service";
import { ExpressRequest, ExpressResponse, ExpressRouter } from "./../../frame/modules/express.module";

export class SymptomsController {
  constructor(private members: {symptomsService: SymptomsService}) {}

  routes(): ExpressRouter {
    const router = ExpressRouter();

    router.post('/suggestions', this.getSuggestions);

    return router;
  }

  getSuggestions = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = await this.members.symptomsService.getSuggestions();
    return res.status(response.status).json(response.data);
  };
}
