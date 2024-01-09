const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const SECRET_KEY = "AccessCode123";
const _ = require("lodash");

async function getUserFromDatabase(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching User in the database" });
  }
}

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (_.isEmpty(token)) {
      return res.status(404).json({
        message: "Token not provided",
      });
    }

    const verify = jwt.verify(token, SECRET_KEY);

    if (verify) {
      // Fetch user information from the database using the data in the token
      const user = await getUserFromDatabase(verify.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found in the database",
        });
      }

      // Attach user information to the request object
      req.user = user;

      return next();
    }
  } catch (error) {
    return res.status(500).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authenticate;
