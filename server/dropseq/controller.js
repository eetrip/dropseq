export class Controller {
  constructor({ service }) {
    this.service = service;
  }

  list = async (req, res, next) => {
    try {
      console.log('calling', req.originalUrl);
      const {
        body: { limit, page, keyword = '' },
      } = req;
      const resp = await this.service.list({ limit, page, keyword });
      return res.send(resp);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  dropDown = async (req, res, next) => {
    try {
      console.log('calling', req.originalUrl);
      const {
        body: { keyword = '', limit, page },
      } = req;
      const resp = await this.service.dropDown({ keyword, limit, page });
      return res.send(resp);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  checkBox = async (req, res, next) => {
    try {
      console.log('calling', req.originalUrl);
      const resp = await this.service.checkBox();
      return res.send(resp);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  listSequence = async (req, res, next) => {
    try {
      console.log('calling', req.originalUrl);
      const { body: { gene = [], cell = [] } = {} } = req || {};
      const resp = await this.service.listSequence({ gene, cell });
      return res.send(resp);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

export default Controller;
