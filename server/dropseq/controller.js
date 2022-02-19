export class Controller {
  constructor({ service }) {
    this.service = service;
  }

  list = async (req, res, next) => {
    try {
      const {
        body: { limit = 15, page = 1, keyword = '' },
      } = req;
      const resp = await this.service.list({ limit, page, keyword });
      return res.send(resp);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

export default Controller;
