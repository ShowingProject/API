import resource from 'resource-router-middleware';
import { Concert } from '../models';

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
          const err = concert ? null : 'Not found';

          callback(err, concert);
        })
    },

    /** GET / - List all entities */
    index({ params }, res) {
      Concert.findAll()
        .then(concerts => {
          res.json(concerts);
        })
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      Concert.create({ ...body })
        .then(concert => {
          res.json(concert)
        })
    },

    /** GET /:id - Return a given entity */
    read({ concert }, res) {
      res.json(concert);
    },

    /** PUT /:id - Update a given entity */
    update({ concert, body }, res) {
      concert.update({ ...body })
        .then(concert => {
          res.sendStatus(200);
        })
        .catch(err => {
          res.sendStatus(500)
        })
    },

    /** DELETE /:id - Delete a given entity */
    delete({ concert }, res) {
      concert.destroy()

      res.sendStatus(200);
    }
  });