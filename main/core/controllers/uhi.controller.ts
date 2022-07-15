import { ExpressRequest, ExpressResponse, ExpressRouter } from "./../../frame/modules/express.module";
import { UhiService } from "../services/uhi.service";

export class UhiController {
  constructor(private members: {uhiService: UhiService}) {}

  routes(): ExpressRouter {
    const router = ExpressRouter();

    router.post('/init', this.init);

    return router;
  }

  init = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = this.members.uhiService.init();
    return res.json(response);
  };
}
