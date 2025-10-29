import { handleMongoError } from "./mongo.error";

export default async function catchErrorHelper(canError: any) {
  try {
    const data = await canError();
    return data;
  } catch (error: unknown) {
    throw handleMongoError(error);
  }
}
