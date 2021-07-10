const formidable = require('formidable');
const Product = require('../../db/index').product;
const db = require('../../db/index');
const {
  notFound,
  badRequest,
  serverError,
  okMessage,
} = require('../../utils/messages');
const fs = require('fs');
var path = require('path');

const fileUpload = (file) => {
  try {
    const rootPath = path.dirname(require.main.filename);
    let filename = file.img.name.split('.');
    const fileExtension = filename.pop();
    filename = filename.join('').trim();
    const oldPath = file.img.path;
    const filePath = `${filename}-${Date.now()}.${fileExtension}`;
    const newPath = path.join(`${rootPath}/public/images/${filePath}`);
    const rawData = fs.readFileSync(oldPath);
    fs.writeFileSync(newPath, rawData);
    const photo = {
      name: filename,
      path: `${process.env.BACKEND}images/${filePath}`,
    };
    return [photo, null];
  } catch (error) {
    return [null, 'File upload failed'];
  }
};

exports.getProductById = async (req, res, next, id) => {
  const product = await Product.findByPk(parseInt(id), {
    include: [{ model: db.category }],
  });
  if (product) {
    req.product = product;
    return next();
  }
  return notFound(res, 'Requested product not found');
};

exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (error, fields, file) => {
    if (error) return serverError(res);
    try {
      if (!file.img || !fields)
        return badRequest(res, 'Please include product image');

      const { title, description, amount, category: categoryId } = fields;

      //checking required files
      if (!title) return badRequest(res, 'Please Enter product title');
      if (!description)
        return badRequest(res, 'Please Enter product description');
      if (!amount) return badRequest(res, 'Please Enter product amount');
      if (!categoryId) return badRequest(res, 'Please Enter product category');

      // file upload process
      const [photo, error] = fileUpload(file);

      if (error) return serverError(res, 'File upload failed');
      const product = {
        title,
        description,
        amount,
        categoryId,
        photo,
      };

      const data = await Product.create(product);
      return res.status(200).json(data);
    } catch (error) {
      console.log('ERROR IS', error);
      return serverError(res);
    }
  });
};

exports.getAllProducts = async (req, res) => {
  const data = await Product.findAll({
    include: [{ model: db.category }],
  });
  return res.status(200).json(data);
};

exports.getOneProduct = (req, res) => {
  const product = req.product;
  return product
    ? okMessage(res, 'product', product)
    : notFound(res, 'Requested Product not found');
};

exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.product;
    await Product.destroy({ where: { id } });
    return okMessage(res, 'Product deleted successfullt');
  } catch (error) {
    return serverError(res);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.product;
    await Product.update(req.body, { where: { id } });
    return okMessage(res, 'Product Updated successfully');
  } catch (error) {
    return serverError(res);
  }
};

exports.updateProductImage = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (error, _fields, file) => {
    if (error) return serverError(res);
    if (!file.img) return badRequest(res, 'Please include image');
    try {
      const { id } = req.product;
      const [photo, error] = fileUpload(file);
      if (error) return serverError(res, 'Unable to upload image');
      await Product.update({ photo }, { where: { id } });
      return okMessage(res, 'Product image updated successfully', photo);
    } catch (error) {}
  });
};
