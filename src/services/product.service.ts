const createProduct = async (name: string, price: string, quantity: number) => {
  return await fetch("/api/product", {
    method: "POST",
    body: JSON.stringify({ name, price, quantity }),
  });
};

const ProductService = {
  createProduct,
};

export default ProductService;
