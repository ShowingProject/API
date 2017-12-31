import { Concert } from '../../../models';

class CrawlingService {
  static run() {

  }

  static save({ concertHallId, concert_date, end_date, picture_url, artist, name, content }) {
    Concert.create({
      concert_hall_id: concertHallId,
      concert_date,
      end_date,
      picture_url,
      artist,
      name,
      content,
    }).catch(err => {
      console.log(err)
    })
  }
}

export default CrawlingService
