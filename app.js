//Creo el Require EXPRESS
const express = require('express')
const ProductManager = require('./ProductManager')

const productManager = new ProductManager('./products.json')


const app = express()
//Disponibilizo los recursos
app.get('/products', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit)

      const products = await productManager.getProduct(limit);
      const mejorVista = JSON.stringify(products, null, 2);
      res.type('json').send(mejorVista);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });
  
  
  app.get('/products/:pid', async (req, res) => {
    try {
      const pid = parseInt(req.params.pid)
      
      const product = await productManager.getProductById(pid);
      if (product) {
        const mejorVista = JSON.stringify(product, null, 2);
        res.type('json').send(mejorVista);
        } else if (!product) {
         return res.json( `Error al obtener el producto` );
        }
    } catch (e) {
      res.json(e);
    }
  });
  
  

app.listen(8080, () => {
    console.log('Servidor Express escuchado: Puerto 8080')
})



