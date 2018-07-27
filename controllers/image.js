const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd02aaebf06e44a2797c1a03bbe281b6a'
  });

const handleApiCall = () => (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(response => {
            res.json(response);
        })
        .catch(err => res.status(400).json('Error during face recognition'));
}

const putImage = (knex) => (req, res) => {
    const { id } = req.body;
    knex('users')
    .where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('Unable to get entry count'));
};

module.exports = {
    putImage: putImage,
    handleApiCall: handleApiCall
};