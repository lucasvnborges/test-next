import { Card, Progress } from "antd";

type Props = {
  products: Product[];
};

export default function PurchasedProgress({ products }: Props) {
  const completedPercentage = () => {
    if (!products?.length) return 0;

    const totalCount = products.length || 0;
    const completedCount =
      products.filter((product: Product) => product.purchased).length || 0;

    return Math.floor((completedCount / totalCount) * 100);
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Progress percent={completedPercentage()} />
    </Card>
  );
}
