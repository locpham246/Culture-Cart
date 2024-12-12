import express from "express";
import { getProduct1, getProduct1ById } from "../controller/products1.controller.js";

const router = express.Router();

router.get("/", getProduct1);

router.get("/:id", getProduct1ById);

export default router;
