import { AppointmentService } from "../services/appointment.service";
import { ExpressRequest, ExpressResponse, ExpressRouter } from "./../../frame/modules/express.module";

export class AppointmentController {
  constructor(private members: {appointmentService: AppointmentService}) {}

  routes(): ExpressRouter {
    const router = ExpressRouter();

    router.post('/add', this.addAppointment);

    return router;
  }

  addAppointment = async (req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> => {
    const response = await this.members.appointmentService.addAppointment(req.body);
    return res.status(response.status).json(response.data);
  };
}
