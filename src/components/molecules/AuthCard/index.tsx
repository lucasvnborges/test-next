"use client";

import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { signIn, getProviders, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button as AntdButton, Card } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import AuthButton from "@components/atoms/AuthButton";

function AuthCard() {
  const router = useRouter();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    initProviders();
  }, []);

  async function initProviders() {
    try {
      setIsLoading(true);
      const res: any = await getProviders();
      setProviders(res);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsLoading(false), 250);
    }
  }

  // O uso da memoização abaixo refere-se à ação de logout e login de um novo cliente,
  // onde ocorre a alteração na dependência 'session'.
  const user_name = useMemo(
    () => (session && session.user && session.user.name) || "default",
    [session]
  );

  if (session) {
    return (
      <Card>
        <Container>
          <Label>
            Você está conectado como <b>{user_name}</b>.
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
              Ir para dashboard
            </Button>
          </ButtonGroup>
        </Container>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <Container>
          <SkeletonButton active={true} block={true} style={{ height: 42 }} />
        </Container>
      </Card>
    );
  }

  return (
    <Card>
      <Container>
        {providers &&
          Object.values(providers).map((provider: any) => (
            <AuthButton
              key={provider.name}
              providername={provider.name}
              text={`Fazer login com ${provider.name}`}
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
  margin: 0 auto;
  max-width: 300px;
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
