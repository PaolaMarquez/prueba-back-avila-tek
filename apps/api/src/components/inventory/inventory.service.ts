import { FastifyReply } from "fastify";
import { Product } from '@/components/inventory/inventory.model';
import { productInput, productSchema } from "@avila-tek/models";


async function createProduct(data: productInput, res: FastifyReply){
    try {
      let product = await Product.findOne({name: data.name})
      if (product){
        return res.status(400).send({error: "Product already exists"});
      }
  
      product = new Product(
        {
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      )
    const newProduct = await product.save();
  
      return {
          product,
        };
    } catch (error) {
      console.log(error)
      res.status(500).send({error: "Server error"});
    }
}

async function deleteProduct(id: string, res: FastifyReply){
  try {
    const product = await Product.findByIdAndDelete(id)
    if (!product){
      return res.status(400).send({error: "Product doesn't exists"});
    }
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }
}

async function updateProduct(id: string, data: any, res: FastifyReply){
  try {
    const product = await Product.findByIdAndUpdate(id, data)
    if (!product){
      return res.status(400).send({error: "Product doesn't exists"});
    }
    res.status(200).send("Product updated successfully");
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }

}

async function findProduct(id: string, res: FastifyReply){
  try {
    const product = await Product.findById(id)
    if (!product){
      return res.status(400).send({error: "Product doesn't exists"});
    }
    return {
      product
    }
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }
}

async function findAllProducts(res: FastifyReply){
  try {
    const products = await Product.find()
    if (products.length === 0){
      res.status(400).send("There are no products registered")
    }
    return products
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }
}

async function findAvailableProducts(res: FastifyReply){
  try {
    const products = await Product.find({ stock: { $gt: 0 } })
    if (products.length === 0){
      res.status(400).send("There are no products available")
    }
    return products
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }
}

export const inventoryService = Object.freeze({
    createProduct,
    deleteProduct,
    updateProduct,
    findProduct,
    findAllProducts,
    findAvailableProducts
  });