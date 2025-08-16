import { Router } from "express";
import { createCase, getCases, getCaseById, updateCase, deleteCase } from "../controllers/caseController";

const router = Router();

router.post("/create", createCase);
router.get("/", getCases);
router.get("/:id", getCaseById);
router.put("/:id", updateCase);
router.delete("/:id", deleteCase);

export default router;
