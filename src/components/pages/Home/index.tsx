"use client";

import styled from "styled-components";
import Image from "next/image";
import { Col, Row } from "antd";
import AuthCard from "@components/molecules/AuthCard";
import IconCard from "@components/atoms/IconCard";
import CustomAvatar from "@components/atoms/CustomAvatar";
import TECH_STACK_INFO from "@constants/TechStackInfo";

export default function Home() {
  const renderHeader = () => (
    <>
      <AppLogo
        width={100}
        height={50}
        alt="Next logo"
        src="/logos/next-icon.svg"
      />
      <Heading>Lista de compras - Desafio Next.js</Heading>
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

  const renderAuthCard = () => <AuthCard />;

  const renderFooter = () => (
    <div>
      <FooterText>
        Aplicação criada como resolução do desafio para a empresa Vylex.
      </FooterText>
      <CustomAvatar
        mainText="Lucas Borges"
        subText="lucasvnborges"
        image="/images/author.png"
      />
    </div>
  );

  return (
    <Row>
      <Col style={{ margin: "0 auto" }}>
        {renderHeader()}
        {renderTechStack()}
        {renderAuthCard()}
        {renderFooter()}
      </Col>
    </Row>
  );
}

const AppLogo = styled(Image)`
  width: 100%;
  margin: 0 auto;
  margin-top: 32px;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-top: 32px;
  margin-bottom: 5px;
  text-align: center;
`;

const SubHeading = styled.h2`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 40px;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 100px;
  text-align: center;
`;
