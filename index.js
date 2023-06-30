//Creo el Require EXPRESS
const express = require('express')
const ProductManager = require('./ProductManager')

const manager = new ProductManager()

const app = express()

//Disponibilizo los recursos
app.get('/products', async (req, res) => {
    try {
      const limit = req.query.limit || null;
      const products = await productManager.getProducts(limit);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });
  
  
  app.get('/products/:pid', async (req, res) => {
    try {
      const productId = req.params.pid;
      const product = await productManager.getProductById(productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  });
  
  

app.listen(8080, () => {
    console.log('Servidor Express escuchado: Puerto 8080')
})



