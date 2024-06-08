"use client";

import { useState } from "react";
import { Form, Input, Modal } from "antd";
import ProductService from "@services/product.service";

type Props = {
  isOpen: boolean;
  products: Product[];
  setIsOpen: (isOpen: boolean) => void;
  setProducts: (products: Product[]) => void;
};

export default function CreateProductModal({
  isOpen,
  products,
  setIsOpen,
  setProducts,
}: Props) {
  const [form] = Form.useForm();
  const [isBusy, setIsBusy] = useState(false);

  async function handleCreateProduct() {
    setIsBusy(true);

    try {
      const values = await form.validateFields();
      const { name, price, quantity } = values;

      const response = await ProductService.createProduct(
        name,
        price,
        quantity
      );
      const newProduct = await response.json();
      const updatedProducts: Product[] = [...(products ?? []), newProduct];

      setProducts(updatedProducts);
      form.resetFields();
      setIsOpen(false);
    } catch (error) {
      // console.log(error);
    } finally {
      setIsBusy(false);
    }
  }

  function handleCancel() {
    form.resetFields();
    setIsOpen(false);
  }

  return (
    <Modal
      open={isOpen}
      cancelText="Cancelar"
      okText="Criar produto"
      title="Adicionar novo produto"
      onCancel={handleCancel}
      onOk={handleCreateProduct}
      okButtonProps={{ loading: isBusy }}
    >
      <p>O que você gostaria de adicionar à sua lista de compras?</p>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Informe o nome do item" }]}
        >
          <Input placeholder="Nome do item" type="" />
        </Form.Item>
        <Form.Item name="price">
          <Input placeholder="Preço" type="number" prefix="R$" />
        </Form.Item>
        <Form.Item name="quantity">
          <Input placeholder="Quantidade" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
