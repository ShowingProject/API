import CrawlingServices from './crawlingServices'

class CrawlingServiceRunner {
  static run() {
    Object.values(CrawlingServices)
      .forEach(CrawlingService => {
        CrawlingService.run();
      });
  }
}

export default CrawlingServiceRunner;