process.env.NODE_ENV = process.env.NODE_ENV || 'local';

import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { SymptomsService } from './core/services/symptoms.service';
import { SymptomsController } from './core/controllers/symptoms.controller';
import { AppointmentService } from './core/services/appointment.service';
import { AppointmentController } from './core/controllers/appointment.controller';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

(async function startServer() {
  const port = process.env.PORT;
  const app = express();

  // Initializing Utils

  // Initializing Services
  const symptomsService = new SymptomsService();
  const appointmentService = new AppointmentService();

  // Initializing Controllers
  const symptomsController = new SymptomsController({symptomsService});
  const appointmentController = new AppointmentController({appointmentService});

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cors());
  
  // Routes Controller Here
  app.use('/symptoms', symptomsController.routes());
  app.use('/appointment', appointmentController.routes());
  
  app.use((req, res) => {
    res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
  });

  app.listen(port, () => {
    console.log(`Server ${process.env.NODE_ENV} started on port ${port}`);
  });
})()