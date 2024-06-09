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

const updateProductStatus = async (productId: string, isComplete: boolean) => {
  return await fetch(
    `/api/product?productId=${productId}&isComplete=${isComplete}`,
    {
      method: "PUT",
    }
  );
};

const deleteProduct = async (productId: string) => {
  return await fetch(`/api/product?productId=${productId}`, {
    method: "DELETE",
  });
};

const ProductService = {
  createProduct,
  getAllProducts,
  updateProductStatus,
  deleteProduct,
};

export default ProductService;
