import Product from "@models/product.model";
import { connectToDB } from "@utils/database";
import { getToken } from "next-auth/jwt";

export const GET = async (request: any) => {
  try {
    const token = await getToken({ req: request });
    const userId = token?.userId;

    await connectToDB();
    const products = await Product.find({ creator: userId }).populate("creator");

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch products", { status: 500 });
  }
};
