import { model, Schema } from "mongoose";
import { hash, compare } from "bcrypt";

const salt = parseInt(process.env.SALT || 10);

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  profilePic: {
    type: String,
    default: "",
  },
}, { timestamps: true });

userSchema.statics.register = async function (data) {
  try {
    const { fullName, username, password, confirmPassword, gender } = data;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      throw new Error("All fields are required");
    }

    if (password !== confirmPassword) {
      throw new Error("The passwords must match");
    }

    const exist = await this.findOne({ username });
    if (exist) {
      throw new Error("The user already exists");
    } else {
      const hashed = await hash(password, salt);
      const user = await this.create({
        fullName,
        username,
        password: hashed,
        gender,
      });
      return user;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.statics.login = async function (data) {
  try {
    const { username, password } = data;
    if (!username || !password) {
      throw new Error("All fields are required");
    }
    const user = await this.findOne({ username });
    if (!user) {
      throw new Error("Invalid credentials");
    } else {
      const valid = await compare(password, user.password);
      if (valid) {
        return user;
      } else {
        throw new Error("Invalid credentials");
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = model("User", userSchema);

export default User;
