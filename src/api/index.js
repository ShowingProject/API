import { Router } from 'express';

import { version } from '../../package.json';
import Concert from './Concert'
import ConcertHall from './ConcertHall'

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  // api.use('/facets', facets({ config, db }));

  api.use('/concert', Concert({ config, db }));
  api.use('/concertHall', ConcertHall({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
}
