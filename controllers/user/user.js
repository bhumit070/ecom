const User = require('../../db/index').user;
const { badRequest } = require('../../utils/messages');
exports.getUserById = async (req, res, next, id) => {
  const user = await User.findByPk(id);
  if (!user) return badRequest(res, 'No user found');
  req.user = user;
  next();
};
