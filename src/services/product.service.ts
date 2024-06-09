const createProduct = async (name: string, price: number, quantity: number) => {
  return await fetch("/api/product", {
    method: "POST",
    body: JSON.stringify({ name, price, quantity }),
  });
};

const getAllProducts = async () => {
  return await fetch("/api/product", {
    method: "GET",
  });
};

const ProductService = {
  createProduct,
  getAllProducts,
};

export default ProductService;
