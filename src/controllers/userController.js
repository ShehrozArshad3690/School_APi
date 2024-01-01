const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const SECRET_KEY = "AccessCode123";

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(404).json({ message: "Email already exists" });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // user create
    const createUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
    });
    // generate token
    const token = jwt.sign(
      { email: createUser.email, id: createUser.id },
      SECRET_KEY
    );
    return res.status(200).json({ user: createUser, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // check password
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(404).json({ message: "Password not matched" });
    }
    // generate token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      SECRET_KEY
    );
    return res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signUp, signIn };
