import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decoded;

    if (token && isCustomAuth) {
      decoded = jwt.verify(token, "test");

      req.userId = decoded?.id;
    } else {
      decoded = jwt.decode(token);

      req.userId = decoded?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
