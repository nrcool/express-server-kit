import UserCollection from "../models/userSchema.js";
import httpErrors from "http-errors";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserCollection.find();
    res.json({ success: true, data: users });
  } catch (err) {
    next(
      new httpErrors.InternalServerError("Please try again in few minutes !")
    );
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await UserCollection.findByID(id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(new httpErrors.NotFound("No record found !"));
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = new UserCollection(req.body);
    await user.save();
    res.json({ success: true, data: user });
  } catch (err) {
    next(new httpErrors.InternalServerError(err.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    next(new httpErrors.NotFound("No record found !"));
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserCollection.findByIdAndRemove(id);
    res.json({ success: true, data: deletedUser });
  } catch (err) {
    next(new httpErrors.NotFound("No record found !"));
  }
};
