import { Router } from "express"
import multer from "multer"
import photoController from "../controllers/photo.controller.js"

const router = Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get("/", photoController.get)
router.get("/:id", photoController.getById)
router.post("/", upload.single("photo"), photoController.create)
router.put("/:id", upload.single("photo"), photoController.update)
router.delete("/:id", photoController.deleteById)

export default router
