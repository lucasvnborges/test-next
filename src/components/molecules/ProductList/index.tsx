"use client";

import { Button, Card, List, Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
  return (
    <section>
      <Card
        title="Lista de compras"
        extra={
          <Button
            size="small"
            type="primary"
            shape="circle"
            onClick={() => setIsAddProductModalOpen(true)}
          >
            <PlusOutlined />
          </Button>
        }
        style={{ width: CARD_WIDTH }}
      >
        <List
          loadMore={null}
          loading={isLoading}
          dataSource={products}
          itemLayout="horizontal"
          renderItem={(product: Product) => (
            <List.Item>
              <Skeleton title={false} loading={isLoading} active>
                <List.Item.Meta description={<span>{product.name}</span>} />
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    </section>
  );
}
