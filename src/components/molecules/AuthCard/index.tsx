"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { signIn, getProviders, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button as AntdButton, Card } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import AuthButton from "@components/atoms/AuthButton";

function AuthCard() {
  const CARD_WIDTH = 678;

  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    initProviders();
  }, []);

  const initProviders = async () => {
    setIsLoading(true);
    const res: any = await getProviders();

    setProviders(res);
    setTimeout(() => setIsLoading(false), 1000);
  };

  if (session) {
    return (
      <Card style={{ width: CARD_WIDTH }}>
        <Container>
          <Label>
            You are signed in as <b>{session?.user?.name}</b>.
          </Label>

          <ButtonGroup>
            <Button
              block
              danger
              type="dashed"
              onClick={() => signOut()}
              style={{ marginRight: 12 }}
            >
              Log out
            </Button>
            <Button
              block
              type="primary"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </ButtonGroup>
        </Container>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card style={{ width: CARD_WIDTH }}>
        <Container>
          <SkeletonButton active={true} block={true} style={{ height: 42 }} />
        </Container>
      </Card>
    );
  }

  return (
    <Card style={{ width: CARD_WIDTH }}>
      <Container>
        {providers &&
          Object.values(providers).map((provider: any) => (
            <AuthButton
              key={provider?.name}
              providername={provider?.name}
              text={`Continue with ${provider.name}`}
              onClick={() => {
                signIn(provider.id, { callbackUrl: "/dashboard" });
              }}
            />
          ))}
      </Container>
    </Card>
  );
}

const Container = styled.div`
  padding: 0 120px;
`;

const Button = styled(AntdButton)`
  margin-bottom: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  font-size: 14px;
  text-align: center;
  margin-bottom: 12px;
`;

export default AuthCard;
