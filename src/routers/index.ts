import { Router } from "express"
import photoRouter from "./photo.router.ts"

const router = Router()

router.use("/", photoRouter)

export default router
