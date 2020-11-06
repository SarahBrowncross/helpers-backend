exports.send404Error = (req, res, next) => {
	res.status(404).send({ msg: 'This page does not exist' });
  };