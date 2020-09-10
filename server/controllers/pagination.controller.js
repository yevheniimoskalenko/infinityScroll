const axios = require('axios')
module.exports = async (req, res) => {
  const { page, q, lang } = req.params
  const data = await axios({
    method: 'get',
    url: `https://pixabay.com/api/?key=2034646-6e3ff18cd219c0cfa3fb70eef&q=${q}&image_type=photo&per_page=5&page=${page}&lang=${lang}`
  }).then((response) => response.data)
  console.log(req.params)
  return await res.json(data)
}
