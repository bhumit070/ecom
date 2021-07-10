exports.unProcessableEntity = (res, msg) => {
  return res.status(422).json({
    isError: true,
    msg,
  });
};

exports.okMessage = (res, msg, data = null) => {
  return res.status(200).json({
    isError: false,
    msg,
    data,
  });
};

exports.badRequest = (res, msg) => {
  return res.status(400).json({
    isError: true,
    msg,
  });
};

exports.serverError = (res, msg = 'Server error.') => {
  return res.status(500).json({
    isError: true,
    msg,
  });
};

exports.unAuthenticated = (res, msg) => {
  return res.status(401).json({
    isError: true,
    msg,
  });
};

exports.accessDenied = (res, msg) => {
  return res.status(403).json({
    isError: true,
    msg,
  });
};

exports.notFound = (res, msg = 'Requested resource not found') => {
  return res.status(404).json({
    isError: true,
    msg,
  });
};
