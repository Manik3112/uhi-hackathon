import { AppointmentService } from "../services/appointment.service";
import { ExpressRequest, ExpressResponse, ExpressRouter } from "./../../frame/modules/express.module";

export class AppointmentController {
  constructor(private members: {appointmentService: AppointmentService}) {}

  routes(): ExpressRouter {
    const router = ExpressRouter();

    router.post('/add', this.addAppointment);
    router.get('/:appointmentId', this.getAppointment);

    return router;
  }

  addAppointment = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    try{
      const response = await this.members.appointmentService.addAppointment(req.body);
      return res.status(response.status).json(response.data);
    }
    catch(e: any) {
      return res.status(500).json({error: e.message});
    }
  };
  getAppointment = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    try{
      const response = await this.members.appointmentService.getAppointment(req.params as {appointmentId: string});
      return res.status(response.status).json(response.data);
    }
    catch(e: any) {
      return res.status(500).json({error: e.message});
    }
  };
}
