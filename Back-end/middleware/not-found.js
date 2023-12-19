const notFound = (req, res) => res.status(404).send('route not exists....');

module.exports = notFound;