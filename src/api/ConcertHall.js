import resource from 'resource-router-middleware';
import { ConcertHall } from '../models';

export default ({ config }) => resource({
  /** Property name to store preloaded entity on `request`. */
  id: 'concertHall',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    ConcertHall.findById(id)
      .then(concert => {
        const err = concert ? null : 'Not found';

        callback(err, concert);
      })
  },

  /** GET / - List all entities */
  index({ params }, res) {
    ConcertHall.findAll()
      .then(concertHalls => {
        res.json(concertHalls);
      })
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    ConcertHall.create({ ...body })
      .then(concertHall => {
        res.json(concertHall)
      })
  },

  /** GET /:id - Return a given entity */
  read({ concertHall }, res) {
    res.json(concertHall);
  },

  /** PUT /:id - Update a given entity */
  update({ concertHall, body }, res) {
    concertHall.update({ ...body })
      .then(concertHall => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.sendStatus(500)
      })
  },

  /** DELETE /:id - Delete a given entity */
  delete({ concertHall }, res) {
    concertHall.destroy()

    res.sendStatus(200);
  }
});