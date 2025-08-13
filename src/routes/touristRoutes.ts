import express from "express"
import { registerTourist, getTourist } from "../controllers/touristController";
import { Router } from "express";

const router = express.Router();

router.post("/register-tourist", registerTourist);
router.get("/gettourist", getTourist);


export default router;