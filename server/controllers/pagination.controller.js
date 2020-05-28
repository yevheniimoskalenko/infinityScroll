const tickets = require('../model/ticket.model')
module.exports.pagination = async (req, res) => {
  const { id } = req.params
  const perPage = 50
  try {
    const ticket = await tickets
      .find({ id_catalog: id }, { date: 0, __v: 0 })
      .limit(perPage)
      .sort({ number_tikets: 1 })
    return res.json(ticket)
  } catch (e) {
    return res.json(e)
  }
}
module.exports.load = async (req, res) => {
  const { id } = req.params

  try {
    let page = 2
    const perPage = 50
    /* eslint-disable no-console */
    console.log(page)

    const ticket = await tickets
      .find({ id_catalog: id }, { date: 0, __v: 0 })
      .limit(perPage)
      .skip(perPage * page - perPage)
      .sort({ number_tikets: 1 })
    ++page
    return res.json(ticket)
  } catch (e) {
    return res.json(e)
  }
}
