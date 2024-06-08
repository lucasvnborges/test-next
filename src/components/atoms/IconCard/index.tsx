import styled from "styled-components";
import Image from "next/image";
import { Card, Flex } from "antd";

type Props = {
  text: string;
  iconPath: string;
  iconSize: number;
  url: string;
};

const Label = styled.label`
  font-size: 13px;
  margin-top: 12px;
  font-weight: 500;
  cursor: pointer;
  color: #292929;
`;

function IconCard({ text, iconPath, iconSize, url }: Props) {
  return (
    <a href={url} target={"_blank"}>
      <Card style={{ width: 120, margin: 10 }}>
        <Flex vertical={true} align="center">
          <Image
            src={iconPath}
            alt={iconPath}
            width={iconSize}
            height={iconSize}
          />
          <Label>{text}</Label>
        </Flex>
      </Card>
    </a>
  );
}

export default IconCard;
