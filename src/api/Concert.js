import resource from 'resource-router-middleware';
import { Concert } from '../models';

const limit = 50;

export default ({ config }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'concert',

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load(req, id, callback) {
      Concert.findById(id)
        .then(concert => {
          const err = concert ? null : {};

          callback(err, concert);
        })
    },

    /** GET / - List all entities */
    index({ params }, res) {
      Concert.findAll({limit: params.limit || limit})
        .then(concerts => {
          res.json(concerts);
        })
    },

    /** GET /:id - Return a given entity */
    read({ concert }, res) {
      res.json(concert);
    },
  })
  .get('/byHall/:hallId', (req, res) => {
    Concert.findAll({
      where: {
        concert_hall_id: req.params.hallId,
      },
      limit: req.params.limit || limit,
    })
    .then(concerts => {
      res.json(concerts);
    });
  })
