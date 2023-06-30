//fileSystem
const fs = require('fs');
const { resolve } = require('path');

class ProductManager {
  constructor(path) {
    this.products = []
    this.path = path //la ruta a trabajar
  }

  //  AGREGO readFile al getproducts
  getProducts() {
   return fs.promises.readFile(this.path, 'utf-8')
    .then((productosArchivo) => {
      const productosObjeto = JSON.parse(productosArchivo) //esto me los convierte en objetos.
      return productosObjeto
      })
    .catch((e) => {
      console.log({ e })
      return e
     })
  }

  addProduct(data) {
      // CONDICIÓN DE TODOS LOS CAMPOS COMPLETOS
      return new Promise((resolve, reject) => {
        if (!data.title || !data.description || !data.price || !data.thumbnail || !data.code || !data.stock) {
            return reject('Error: Faltan completar campos')
      }
      const existProduct = this.products.findIndex((product) => product.code === data.code)
      if (existProduct !== -1) {
        console.log("El codigo de producto esta en uso") 
        return reject('Error: El codigo esta en uso.')
// CONDICION DE VER SI EL CODIGO NO ESTA EN USO.
    }

    const productosObjeto = {
        id: products.length + 1,
        title: data.title,
        description: data.description,
        price: data.price,
        thumbnail: data.thumbnail,
        code: data.code,
        stock: data.stock
    }

    this.products.push(productosObjeto)

    return this.getProducts()
    .then(products => {
       
        return fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
      })
      .catch((e) => {
          console.log('ERROR: El usuario no ha sido guardado')
          return e
      })
    }

  getProductById(id) {
      return this.getProducts()
      .then(products => {
          const existProduct = products.find((product) => product.id === id);
          if (!existProduct) {
            const error = 'Notfound'
            console.log("Producto no encontrado");
            return error
          }
          return existProduct
      })
  }

  //  agrego update y delete
updateProduct(id, newData) {
  return this.getProducts()
  .then(products => {
      const index = products.find((product) => product.id === id);
      if (index) {
        console.log("Producto no encontrado");
        return "Error: Producto no encontrado.";
      }
  
      products[index] = { ...products[index], ...newData };
  
      return fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
  })
}

deleteProduct(id) {
  return this.getProducts()
    .then(products => {
      const index = products.findIndex((product) => product.id === id)
      if (index === -1) {
        console.log("Error: Producto no encontrado.")
        return
      }

      const deletedProduct = products.splice(index, 1)[0]

      return fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
    })
}
}

//     PROBAMOS
const productManager = new ProductManager('./productos.json');

const producto1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
  };

  productManager.addProduct(producto1)

  console.log(producto1);
  */