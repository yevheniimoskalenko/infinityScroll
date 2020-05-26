const tickets = require('../model/ticket.model')
module.exports = async (req, res) => {
  const { id } = req.params
  try {
    const ticket = await tickets
      .find({ id_catalog: id }, { date: 0, __v: 0 })
      .sort({ number_tikets: 1 })
    return res.json(ticket)
  } catch (e) {
    return res.json(e)
  }
}
