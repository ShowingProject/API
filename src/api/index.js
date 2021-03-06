import { Router } from 'express';

import { version } from '../../package.json';
import Concert from './Concert'
import ConcertHall from './ConcertHall'

export default ({ config }) => {
  const api = Router();

  // mount the facets resource
  // api.use('/facets', facets({ config, db }));

  api.use('/concert', Concert({ config }));
  api.use('/concertHall', ConcertHall({ config }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
}
