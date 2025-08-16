import express from "express";
import {
  registerTourist,
  getTourist,
  getSingleTourist,
  updateTourist,
  deleteTourist,
  loginTourist,
  forgetPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/touristController";

const router = express.Router();

router.post("/register-tourist", registerTourist);
router.post("/login", loginTourist);
router.post("/forget-password", forgetPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.get("/gettourist", getTourist);
router.get("/gitsingletourist/:id", getSingleTourist);
router.put("/update-tourist/:id", updateTourist);
router.delete("/delete-tourist/:id", deleteTourist);


export default router;
