import { Router } from "express";
const router = Router();
import * as authCtrl from "../controllers/auth.controllers";
import { verifySignup } from "../middlewares";

router.post(
  "/signup",
  [verifySignup.checkDuplicateUser, verifySignup.checkRolesExisted],
  authCtrl.signUp
);

router.post("/signin", authCtrl.signin);

export default router;