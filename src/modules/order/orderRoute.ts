import { OrderController } from "./orderController";

const orderController: OrderController = new OrderController()

export class OrderRoutes {
    public orderRoutes(app:any) :void {
        // * Order Save
        app.route('/api/order')
            .post(orderController.addOrder)
            
        app.route('/api/order/table')
            .get(orderController.getOrderTable)

        app.route('api/order/:orderId')
            .get(orderController.getOrderById)
        
    }
}