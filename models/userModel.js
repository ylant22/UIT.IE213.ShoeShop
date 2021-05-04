const mongoose = require("mongoose");
const validator = require('validator');
const schema = mongoose.Schema;

const userSchema = schema({
  image: { type: Array, default: [] },
  fullName: { type: String, required: [true, 'Please provide your name!'],},
  userName: {
    type: String,
    required: [true, 'Please provide your username!'],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please a provide a valid email'],
  },
  address: { type: String, required: [true, "Please provide a password"] },
  phone: { type: String, maxlength: 10 },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // this only works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  role: { type: Number, default: 0 }, // 0: client, 1: admin
  createdDate: { type: Date, default: Date.now() },
  avatarImage: {
    type: Object,
    default: {
      data: { type: Buffer },
      type: { type: String },
    },
  },
});

userSchema.virtual("avatarImagePath").get(function () {
  if (this.avatarImage.data != null && this.avatarImage.type != null)
    return `data:${this.avatarImage.type};charset:utf-8;base64,${this.avatarImage.data.toString(
      "base64"
    )}`;
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
