import express from "express";
import {
  registerTourist,
  getTourist,
  getSingleTourist,
  updateTourist,
  deleteTourist,
  loginTourist,
} from "../controllers/touristController";

const router = express.Router(); 

router.post("/register-tourist", registerTourist);
router.post("/login", loginTourist);
router.get("/gettourist", getTourist);
router.get("/gitsingletourist/:id", getSingleTourist);
router.put("/update-tourist/:id", updateTourist);
router.delete("/delete-tourist/:id", deleteTourist);

export default router;
