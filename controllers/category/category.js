const Category = require('../../db/index').category;
const { notFound, serverError, okMessage } = require('../../utils/messages');
exports.getCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findByPk(parseInt(id));
    if (category) {
      req.category = category;
      return next();
    } else {
      return notFound(res, 'Requested category not found');
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const data = await Category.findAll();
    if (data) return okMessage(res, 'categories', data);
    else return okMessage(res, 'categories', []);
  } catch (error) {
    return serverError(res);
  }
};

exports.getOneCategory = (req, res) => {
  const category = req.category;
  if (!category) return notFound(res, 'Requested category not found');
  else return okMessage(res, 'category', category);
};

exports.createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const data = await Category.create({ name: category });
    return okMessage(res, 'Category created successfully', data);
  } catch (error) {
    return serverError(res);
  }
};

exports.editCategory = async (req, res) => {
  try {
    const categoryId = req.category.id;
    const { category } = req.body;
    await Category.update({ name: category }, { where: { id: categoryId } });
    req.category.name = category;
    return okMessage(res, 'Category Updated Successfully', req.category);
  } catch (error) {
    return serverError(res);
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const categoryId = req.category.id;
    await Category.destroy({ where: { id: categoryId } });
    return okMessage(res, 'Category Deleted Successfully');
  } catch (error) {
    return serverError(res);
  }
};
