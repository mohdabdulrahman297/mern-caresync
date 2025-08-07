import jwt from "jsonwebtoken";

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login again.",
      });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    // Attach doctor ID to request for further use
    req.docId = decoded.id;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authDoctor;
