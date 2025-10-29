import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../utils/app.error";
import cloudinary from "../config/cloudinary.config";

export default async function fileUploaderMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.file) {
    throw new BadRequestError("Product image is not found.");
  }

  const fileName = req.body.name + new Date();
  const uploadResult = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "Nexora",
          public_id: fileName,
          resource_type: "image",
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as { secure_url: string });
        }
      );
      if (req.file) {
        stream.end(req?.file.buffer);
      }
    }
  );

  req.body.image = uploadResult.secure_url;
  next();
}
