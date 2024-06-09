"use client";

import styled from "styled-components";
import { Button, Card, List, Skeleton } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UndoOutlined,
  CheckOutlined,
} from "@ant-design/icons";

type Props = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  setIsAddProductModalOpen: (isOpen: boolean) => void;
  isLoading: boolean;
};

const CARD_WIDTH = 670;

export default function ProductList({
  products,
  setProducts,
  setIsAddProductModalOpen,
  isLoading,
}: Props) {
  const listItemActions = (product: Product) => [
    <Button danger key="delete" type="dashed" onClick={() => console.log}>
      <DeleteOutlined />
    </Button>,
    <Button
      key="done"
      type={product.purchased ? "dashed" : "dashed"}
      onClick={() => console.log}
    >
      {product.purchased ? <UndoOutlined /> : <CheckOutlined />}
    </Button>,
  ];

  return (
    <section>
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
        style={{ width: CARD_WIDTH }}
      >
        <ListWrapper>
          <List
            loadMore={null}
            loading={isLoading}
            dataSource={products}
            itemLayout="horizontal"
            renderItem={(product: Product) => (
              <List.Item actions={listItemActions(product)}>
                <Skeleton title={false} loading={isLoading} active>
                  <List.Item.Meta
                    description={
                      <span>
                        {product.quantity}x {product.name}
                      </span>
                    }
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </ListWrapper>
      </Card>
    </section>
  );
}

const ListWrapper = styled.div`
  height: 40vh;
  overflow-y: auto;
`;
