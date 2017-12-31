import ical from 'ical';
import moment from 'moment';
import CrawlingService from '../CrawlingService';
import { Concert } from '../../../../models';

class JaebiDabang extends CrawlingService {
  static ConcertHallId = 2;
  static ICS_URL = 'https://www.google.com/calendar/ical/ctrplus.com_g8n71k9ibdldnfaeqlks3gop3k%40group.calendar.google.com/public/basic.ics';

  static run() {
    ical.fromURL(JaebiDabang.ICS_URL, {}, (err, data) => {
      const concertData = Object.values(data);

      concertData.forEach((data) => {
        Concert.findOne({
          where: {
            concert_hall_id: JaebiDabang.ConcertHallId,
            concert_date: moment(data.start).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
          }
        })
        .then(result => {
          if(result) {
            return null;
          }

          this.save({
            concertHallId: JaebiDabang.ConcertHallId,
            concert_date: data.start,
            picture_url: null,
            artist: data.summary,
            name: data.summary,
            content: data.summary,
          })
        })
      })
    })
  }
}

export default JaebiDabang
