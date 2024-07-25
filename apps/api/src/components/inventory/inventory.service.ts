import { FastifyReply } from "fastify";
import { Product } from '@/components/inventory/inventory.model';
import { productInput } from "@avila-tek/models";


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
    console.log("PRODUCTO: ", product)
    console.log("ID: ", id)
    if (!product){
      return res.status(400).send({error: "Product doesn't exists"});
    }
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(500).send({error: "Server error"});
  }
}

export const inventoryService = Object.freeze({
    createProduct,
    deleteProduct,
  });