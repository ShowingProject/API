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
});
