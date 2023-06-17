import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userID: {
    type: Schema.Types.UUID,
    require: true,
  },
  userImg: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  userTasks: {
    type: Array,
  },
});

export const User = model("User", UserSchema);
