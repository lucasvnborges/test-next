"use client";

import styled from "styled-components";
import Image from "next/image";
import { Row } from "antd";
import AuthCard from "@components/molecules/AuthCard";
import IconCard from "@components/atoms/IconCard";
import CustomAvatar from "@components/atoms/CustomAvatar";
import TECH_STACK_INFO from "@constants/TechStackInfo";

export default function Home() {
  const renderHeader = () => (
    <>
      <Image src="/logos/next-icon.svg" alt="Next logo" width={100} height={50} />
      <Heading>Grocery List - Teste Next.js</Heading>
      <SubHeading>
        Web app para cadastro de produtos em uma lista de compras
      </SubHeading>
    </>
  );

  const renderTechStack = () => (
    <Row gutter={16}>
      {TECH_STACK_INFO?.map((t) => (
        <IconCard
          key={t.name}
          text={t.name}
          url={t.url}
          iconSize={35}
          iconPath={t.iconPath}
        />
      ))}
    </Row>
  );

  const renderAuthCard = () => <AuthCard />

  const renderFooter = () => (
    <div>
      <FooterText>
        Aplicação criada em 7 de Junho de 2024 como teste para a empresa Vylex.
      </FooterText>
      <CustomAvatar
        mainText="Lucas Borges"
        subText="lucasvnborges"
        image="/images/author.png"
      />
    </div>
  );

  return (
    <Container>
      {renderHeader()}
      {renderTechStack()}
      {renderAuthCard()}
      {renderFooter()}
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 25px);
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-top: 60px;
  margin-bottom: 5px;
`;

const SubHeading = styled.h2`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 40px;
`;

const FooterText = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 100px;
`;
