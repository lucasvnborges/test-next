import styled from "styled-components";
import Image from "next/image";
import { Avatar } from "antd";

type Props = {
  size?: "large" | "small" | "default" | number;
  image: string;
  mainText?: string;
  subText?: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const LabelMainText = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
  font-weight: 500;
`;

const LabelSubText = styled.label`
  font-size: 13px;
`;

function CustomAvatar({ size = "large", image, mainText, subText }: Props) {
  const renderLabels = () => {
    if (!mainText && !subText) return;

    return (
      <LabelContainer>
        <LabelMainText>{mainText}</LabelMainText>
        <LabelSubText>{subText}</LabelSubText>
      </LabelContainer>
    );
  };

  return (
    <Container>
      <Avatar
        size={size}
        src={<Image src={image} height={300} width={300} alt="Avatar" />}
      />
      {renderLabels()}
    </Container>
  );
}

export default CustomAvatar;
