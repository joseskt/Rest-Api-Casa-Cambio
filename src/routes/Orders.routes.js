import { Router } from "express";
import * as ordersControllers from "../controllers/orders.controllers";
import { authJwt } from "../middlewares";

const router = Router();

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  ordersControllers.createOrders
);

router.get("/", ordersControllers.getOrders);

router.get("/done", ordersControllers.findAllDoneOrders);

router.get("/:id", ordersControllers.findOneOrders);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  ordersControllers.deleteOrders
);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  ordersControllers.updateOrders
);

export default router;