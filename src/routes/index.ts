// import app from "app";

import { Application, Request, Response } from 'express';
import { ProductRoutes } from '../modules/product/productRoute';
import { OrderRoutes } from '../modules/order/orderRoute';
import { AuthRoutes } from '../modules/auth/authRoute';

export class Routes {
  public productRoutes : ProductRoutes = new ProductRoutes();
  public orderRoutes : OrderRoutes = new OrderRoutes();
  public authRoutes : AuthRoutes = new AuthRoutes();
  // * Home route
  public routes(app: any): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'Welcome to the API',
      });
    });

    this.productRoutes.productRoutes(app);
    this.orderRoutes.orderRoutes(app);
    this.authRoutes.authRoutes(app);
  }
}
