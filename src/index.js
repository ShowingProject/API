import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config';
import CrawlingServiceRunner from './services/crawling/CrawlingServiceRunner'
import 'moment-timezone';

const app = express();
app.server = http.createServer(app);

// run Crawler
// CrawlingServiceRunner.run()

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

// internal middleware
app.use(middleware({ config }));

// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port);

console.log(`Started on port ${config.port}`);

export default app;
