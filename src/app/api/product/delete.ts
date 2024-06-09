import Product from "@models/product.model";
import { connectToDB } from "@utils/database";

export const DELETE = async (request: any) => {
  try {
    await connectToDB();
    const productId = request.nextUrl.searchParams.get("productId");
    await Product.deleteOne({ _id: productId });

    return new Response(productId, { status: 200 });
  } catch (error) {
    return new Response("Failed to delete product", { status: 500 });
  }
};
