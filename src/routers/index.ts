import { Router } from "express"
import photoRouter from "./photo.router.js"

const router = Router()

router.use("/", photoRouter)

export default router
