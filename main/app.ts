process.env.NODE_ENV = process.env.NODE_ENV || 'local';

import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { UhiService } from './core/services/uhi.service';
import { UhiController } from './core/controllers/uhi.controller';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

(async function startServer() {
  const port = process.env.PORT;
  const app = express();

  // Initializing Utils

  // Initializing Services
  const uhiService = new UhiService();

  // Initializing Controllers
  const uhiController = new UhiController({uhiService});

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cors());
  
  // Routes Controller Here
  app.use('/uhi', uhiController.routes());
  
  app.use((req, res) => {
    res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
  });

  app.listen(port, () => {
    console.log(`Server ${process.env.NODE_ENV} started on port ${port}`);
  });
})()