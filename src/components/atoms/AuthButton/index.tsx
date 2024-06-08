import styled from "styled-components";
import Image from "next/image";

type Props = {
  text: string;
  providername: string;
  onClick: () => void;
};

function AuthButton(props: Props) {
  const { text, providername } = props;

  return (
    <Container {...props}>
      <Icon
        alt="Icon"
        width={22}
        height={22}
        src={`/authProviders/${providername?.toLowerCase()}.svg`}
      />
      {text}
    </Container>
  );
}

const Container = styled.button`
  background: $secondary-surface-color;
  border: none;
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $border-color;
  cursor: pointer;
  border-radius: $border-radius;
  margin: 10px 0px;
  transition: opacity 0.5s;

  &:hover {
    opacity: 0.5;
  }
`;

const Icon = styled(Image)`
  margin-right: 8px;
  margin-bottom: 2px;
`;

export default AuthButton;
