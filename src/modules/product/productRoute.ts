import { ProductController } from "./productController";

const productController: ProductController = new ProductController()

export class ProductRoutes {
    public productRoutes(app:any) :void {
        // * Product Save
        app.route('/api/product')
            .post(productController.addProduct)
            
        app.route('/api/product/table')
            .get(productController.getProductTable)

        app.route('/api/product/:productId')
            .get(productController.getProductById)
            .put(productController.updateProduct)
            .delete(productController.deleteProduct)
        
    }
}