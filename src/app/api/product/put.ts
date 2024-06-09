import Product from "@models/product.model";
import { connectToDB } from "@utils/database";

export const PUT = async (request: any) => {
  try {
    await connectToDB();
    const productId = request.nextUrl.searchParams.get("productId");
    const purchased = request.nextUrl.searchParams.get("purchased");
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { purchased } },
      { new: true }
    );

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response("Failed to update product", { status: 500 });
  }
};
