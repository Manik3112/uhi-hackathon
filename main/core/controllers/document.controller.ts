import { DocumentService } from "../services/document.service";
import { ExpressRequest, ExpressResponse, ExpressRouter } from "./../../frame/modules/express.module";

export class DocumentController {
  constructor(private members: {documentService: DocumentService}) {}

  routes(): ExpressRouter {
    const router = ExpressRouter();

    router.post('/add', this.addDocument);

    return router;
  }

  addDocument = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    try{
      const response = await this.members.documentService.addDocument(req.body);
      return res.status(response.status).json(response.data);
    }
    catch(e: any) {
      return res.status(500).json({error: e.message});
    }
  };
}
