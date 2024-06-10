"use client";

import styled from "styled-components";
import { Button, Card, List, Skeleton, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UndoOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import ProductService from "@/services/product.service";

type Props = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  setIsAddProductModalOpen: (isOpen: boolean) => void;
  isLoading: boolean;
};

export default function ProductList({
  products,
  setProducts,
  setIsAddProductModalOpen,
  isLoading,
}: Props) {
  const [messageApi, contextToaster] = message.useMessage();

  const updateProductStatus = async (productId: string, purchased: boolean) => {
    const response = await ProductService.updateProductStatus(
      productId,
      !purchased
    );
    const updatedProduct: Product = await response.json();
    const updatedProducts = products.map((product: Product) =>
      product._id.toString() === updatedProduct._id.toString()
        ? updatedProduct
        : product
    );

    setProducts(updatedProducts);
  };

  const deleteProduct = async (productId: string) => {
    const response = await ProductService.deleteProduct(productId);
    const deletedProductId = await response.text();
    const filteredProducts = products.filter((p) => p._id !== deletedProductId);

    messageApi.success("Produto excluído");
    setProducts(filteredProducts);
  };

  const listItemActions = (product: Product) => [
    <Button
      danger
      key="delete"
      type="dashed"
      onClick={() => deleteProduct(product._id)}
    >
      <DeleteOutlined />
    </Button>,
    <Button
      key="done"
      type={product.purchased ? "dashed" : "dashed"}
      onClick={() => updateProductStatus(product._id, product.purchased)}
    >
      {product.purchased ? <UndoOutlined /> : <CheckOutlined />}
    </Button>,
  ];

  return (
    <>
      {contextToaster}
      <Card
        title="Lista de compras"
        extra={
          <Button
            size="small"
            type="primary"
            onClick={() => setIsAddProductModalOpen(true)}
          >
            <PlusOutlined />
          </Button>
        }
      >
        <ListWrapper>
          <List
            loadMore={null}
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={products.toReversed()}
            locale={{
              emptyText:
                "Toque no ícone + para adicionar produtos à sua lista 📝",
            }}
            renderItem={(product: Product) => (
              <List.Item actions={listItemActions(product)}>
                <Skeleton title={false} loading={isLoading} active>
                  <List.Item.Meta
                    description={
                      <span
                        style={{
                          opacity: product.purchased ? 0.75 : 1,
                          textDecoration: product.purchased
                            ? "line-through"
                            : "none",
                        }}
                      >
                        <small>{product.quantity}x</small> R${product.price}
                        <b> - {product.name}</b>
                      </span>
                    }
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </ListWrapper>
      </Card>
    </>
  );
}

const ListWrapper = styled.div`
  height: 40vh;
  overflow-y: auto;
`;
