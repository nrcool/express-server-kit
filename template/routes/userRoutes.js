import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers.js/userControllers.js";

const router = Router();

// users routes
// get request on "/users" (GET ALL USERS)
router.get("/", getAllUsers);

// get request on "/users/:id" (GET SINGLE USER BY ID)
router.get("/:id", getSingleUser);
//post request on "/users" (CREATE NEW USER)
router.post("/", createUser);

//patch request on "/users/:id" (UPDATE USER BY ID)
router.patch("/:id", updateUser);

//delete request on "/users/:id" (DELETE USER BY ID)
router.delete("/:id", deleteUser);

export default router;
