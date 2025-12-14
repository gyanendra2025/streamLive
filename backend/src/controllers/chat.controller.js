import { generateStreamToken as generateStreamTokenUtil } from "../lib/stream.js";

export async function generateStreamToken(req, res) {
  try {
    const userId = req.user._id;

    const token = generateStreamTokenUtil(userId.toString());

    return res.status(200).json({ token });
  } catch (err) {
    console.log("error in get stream token", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
