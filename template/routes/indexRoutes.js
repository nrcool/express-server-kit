import {Router} from "express"
import { index } from "../controllers/indexControllers.js"

const router = Router()

// index route 
// get request on "/" 
router.get("/", index)



export default router