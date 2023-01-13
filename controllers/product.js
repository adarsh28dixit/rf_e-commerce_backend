const Product = require("../models/product");

const getProducts = async (req, res) => {
  await Product.findAll()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      console.error("Failed to retrieve data : ", error);
    });
};

const createProducts = async (req, res) => {
  const { name, description, reviews, price, type, color, image } = req.body;

  await Product.create({
    name: name,
    description: description,
    reviews: reviews,
    price: price,
    type: type,
    color: color,
    image: image,
  })
    .then(() => res.status(201).json({ message: "Record added successfully!" }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

const getProductById = async (req, res) => {
  const prodId = req.params.id;
  Product.findOne({
    where: {
      id: prodId,
    },
  }).then((product) => {
    if (product) {
      return res.status(401).send(product);
    } else {
      return res.status(401).json({ message: "Product not found" });
    }
  });
};

/* get product based on filters*/
const getProductsByType = async (req, res) => {
  await Product.findAll({
    where: {
      type: req.params.type,
    },
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};


const getProductsByColors = async (req, res) => {
  await Product.findAll({
    where: {
      color: req.params.color,
    },
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.json({ error: err });
    });
};
module.exports = { getProducts, createProducts, getProductById, getProductsByType, getProductsByColors };
