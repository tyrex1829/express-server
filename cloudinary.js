import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import env from "dotenv";
env.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudianry = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      public_id: "test" + Math.random(),
    });
    console.log(`FIle is uploaded on cloudinary`, response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudianry };
