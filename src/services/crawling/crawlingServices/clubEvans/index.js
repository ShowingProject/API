import rp from 'request-promise'
import cheerio from 'cheerio'
import moment from 'moment'
import stringReplace from 'replace-string'

import { Concert } from '../../../../models'
import CrawlingService from '../CrawlingService'
import { lastIndex } from './db.json'

class ClubEvans extends CrawlingService {
  static CrawlingCount = 7
  static ConcertHallId = 1
  static webURL = 'http://www.clubevans.com'
  static baseURL = `${ClubEvans.webURL}/bbs/board.php?bo_table=TODAYS_LIVE&wr_id=`

  static run() {
    for (let i = 0; i < this.CrawlingCount; i++) {
      const crawlingURL = `${this.baseURL}${lastIndex + i}`

      rp(crawlingURL)
        .then(htmlString => cheerio.load(htmlString))
        .then($ => {
          const bannerImage = $('img[width=639]');
          const contentArea = bannerImage.parent()

          let concertDate = cheerio.load(contentArea.find("td")[0]).text().slice(0, 10)
          concertDate = stringReplace(concertDate, '.', '')

          let artist = []

          contentArea.find("td > div")
            .each((index, el) => {
              artist.push(cheerio.load(el).text().trim())
            })

          artist = artist.join(",")
          const name = cheerio.load(contentArea.find("td")[0]).text()
          const content = cheerio.load(contentArea.find("td")[3]).text()

          this.save({
            concert_date: moment(concertDate).format('YYYY-MM-DD HH:mm:ss'),
            picture_url: this.parseBannerImgURL(bannerImage.attr('src')),
            artist,
            name,
            content,
          })
        })
    }
  }

  static save({ concert_date, picture_url, artist, name, content }) {
    Concert.create({
      concert_hall_id: this.ConcertHallId,
      concert_date,
      picture_url,
      artist,
      name,
      content,
    })
      .then(_ => {

      })
      .catch(err => {
        console.log(err)
      })
  }

  static parseBannerImgURL(imageURL) {
    const sliceImageURL = imageURL.slice(3, imageURL.length)

    return `${this.webURL}/${sliceImageURL}`
  }
}

export default ClubEvans