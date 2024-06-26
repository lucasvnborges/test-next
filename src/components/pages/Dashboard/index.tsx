"use client";

import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { FloatButton as AntdFloatButton, Col, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomAvatar from "@components/atoms/CustomAvatar";
import CreateProductModal from "@/components/molecules/CreateProductModal";
import ProductService from "@/services/product.service";
import ProductList from "@/components/molecules/ProductList";
import PurchasedProgress from "@/components/molecules/PurchasedProgress";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const handleGetAllProducts = async () => {
    setIsLoading(true);

    try {
      const response = await ProductService.getAllProducts();
      const products: Product = await response.json();
      setProducts(Array.isArray(products) ? products : []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const profile_image = useMemo(
    () => (session && session.user && session.user.image) || "default",
    [session]
  );

  const user_name = useMemo(
    () => (session && session.user && session.user.name) || "default",
    [session]
  );

  function handleGoBack() {
    router.replace("/");
  }

  return (
    <Row>
      <Col span={24} md={12} style={{ margin: "0 auto" }}>
        <CustomAvatar size={60} image={profile_image} />
        <Heading>Oi, {user_name.split(" ")[0]} 😊📝</Heading>
        <SubHeading>
          Planeje e acompanhe suas compras de forma simples
        </SubHeading>

        <PurchasedProgress products={products} />

        <ProductList
          products={products}
          isLoading={isLoading}
          setProducts={setProducts}
          setIsAddProductModalOpen={setIsAddProductModalOpen}
        />

        <CreateProductModal
          products={products}
          setProducts={setProducts}
          isOpen={isAddProductModalOpen}
          setIsOpen={setIsAddProductModalOpen}
        />

        <FloatButton onClick={handleGoBack} icon={<ArrowLeftOutlined />} />
      </Col>
    </Row>
  );
}

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 2px;
  text-align: center;
`;

const SubHeading = styled.h2`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 40px;
  text-align: center;
`;

const FloatButton = styled(AntdFloatButton)`
  top: 30px;
  left: 30px;
`;
