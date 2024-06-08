"use client";

import styled from "styled-components";
import { useMemo } from "react";
import { FloatButton as AntdFloatButton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomAvatar from "@components/atoms/CustomAvatar";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

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
    <Container>
      <CustomAvatar size={60} image={profile_image} />
      <Heading>Oi, {user_name.split(" ")[0]} 😊📝</Heading>
      <SubHeading>Planeje e acompanhe suas compras de forma simples</SubHeading>

      <FloatButton onClick={handleGoBack} icon={<ArrowLeftOutlined />} />
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 25px);
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 2px;
`;

const SubHeading = styled.h2`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 40px;
`;

const FloatButton = styled(AntdFloatButton)`
  top: 30px;
  left: 30px;
`;
