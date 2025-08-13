import express from "express";
import { createAdmin, updateAdmin, getAllAdmins} from "../controllers/adminController";
const router = express.Router();

router.post("/create-admin", createAdmin);
router.get("/getall", getAllAdmins)
router.put("/update/:id", updateAdmin);



export default router