import Product from "@models/product.model";
import { connectToDB } from "@utils/database";
import { getToken } from "next-auth/jwt";

export const POST = async (request: any) => {
  const token = await getToken({ req: request });
  const userId = token?.userId;

  const { name, price, quantity } = await request.json();

  try {
    await connectToDB();
    const newProduct = new Product({
      name,
      price,
      quantity,
      creator: userId,
    });
    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new product", { status: 500 });
  }
};
