import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiError";

const uploadCloudinary = async (file: string, folder: string) => {
  try {
    if (!file) {
      return new ApiError(400, "Image is Empty");
    }
    const response = await cloudinary.uploader.upload(file);

    if (!response) {
      return new ApiError(400, "Upload Image Error");
    }

    return response;
  } catch (error) {
    return new ApiError(402, error as string);
  }
};

export { uploadCloudinary };
