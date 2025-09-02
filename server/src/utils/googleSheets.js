import { google } from "googleapis";
import fs from "fs";
import path from "path";

export const getSheetsClient = async () => {
  let auth;

  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    // ✅ Deployment mode (using .env)
    auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } else {
    // ✅ Local mode (using credentials.json)
    const keyFilePath = path.join(process.cwd(), "credentials.json");
    if (!fs.existsSync(keyFilePath)) {
      throw new Error("credentials.json not found. Please download it from Google Cloud.");
    }

    auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  return google.sheets({ version: "v4", auth });
};
