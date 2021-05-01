import { Router } from "express";
import * as ordersControllers from "../controllers/orders.controllers";

const router = Router();

router.post("/", ordersControllers.createOrders);

router.get("/", ordersControllers.getOrders);

router.get("/done", ordersControllers.findAllDoneOrders);

router.get("/:id", ordersControllers.findOneOrders);

router.delete("/:id", ordersControllers.deleteOrders);

router.put("/:id", ordersControllers.updateOrders);

export default router;
