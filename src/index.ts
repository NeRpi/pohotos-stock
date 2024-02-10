import "dotenv/config"
import express, { Express } from "express"
import { createServer } from "http"
import cors from "cors"
import * as swaggerUi from "swagger-ui-express"
import swaggerJson from "./../swagger.json" assert { type: "json" }
import routers from "./routers/index.ts"

const PORT = process.env.PORT || 5000
const app: Express = express()
const httpServer = createServer(app)

app.use(cors())
app.use(express.json())

app.use("/api", routers)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))

httpServer.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
