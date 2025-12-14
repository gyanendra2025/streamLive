import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error(
    "STREAM_API_KEY and STREAM_API_SECRET must be set in environment"
  );
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const updateStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error;
  }
};


export const generateStreamToken = (userId) => {
  try {
    const userIdStr=userId.toString();
    return streamClient.createToken(userIdStr);
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};
