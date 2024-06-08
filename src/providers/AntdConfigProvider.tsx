import { ConfigProvider } from "antd";

const AntdConfigProvider = ({ children }: Props) => {
  const THEME = {
    token: {
      colorPrimary: "#292929",
    },
  };

  return <ConfigProvider theme={THEME}>{children}</ConfigProvider>;
};

type Props = {
  children: React.ReactNode;
};

export default AntdConfigProvider;
