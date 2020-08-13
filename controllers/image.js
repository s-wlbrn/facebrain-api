const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.API_KEY
 });

const handleApiCall = (req, res) => {
  app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to contact API.'))

}

const updateEntries = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Error updating entries.'));
}

module.exports = {
  updateEntries,
  handleApiCall
}