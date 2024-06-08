import React from "react";
import { render, screen } from "@testing-library/react";
import IconCard from "@components/atoms/IconCard";

describe("IconCard", () => {
  const defaultProps = {
    text: "Sample Text",
    iconPath: "/path/to/icon.svg",
    iconSize: 50,
    url: "https://example.com",
  };

  test("renders with provided properties", () => {
    render(<IconCard {...defaultProps} />);

    // Verifica se o link é renderizado com o href correto
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", defaultProps.url);
    expect(linkElement).toHaveAttribute("target", "_blank");

    // Verifica se a imagem é renderizada com o src e alt corretos e com as dimensões corretas
    const imageElement = screen.getByRole("img", {
      name: defaultProps.iconPath,
    });
    expect(imageElement).toHaveAttribute("src", defaultProps.iconPath);
    expect(imageElement).toHaveAttribute("alt", defaultProps.iconPath);
    expect(imageElement).toHaveAttribute(
      "width",
      defaultProps.iconSize.toString()
    );
    expect(imageElement).toHaveAttribute(
      "height",
      defaultProps.iconSize.toString()
    );

    // Verifica se o texto é renderizado corretamente
    expect(screen.getByText("Sample Text")).toBeInTheDocument();
  });

  test("renders without url", () => {
    const propsWithoutUrl = { ...defaultProps, url: '' };
    render(<IconCard {...propsWithoutUrl} />);

    // Verifica se a imagem é renderizada com o src e alt corretos e com as dimensões corretas
    const imageElement = screen.getByRole("img", {
      name: defaultProps.iconPath,
    });
    expect(imageElement).toHaveAttribute("src", defaultProps.iconPath);
    expect(imageElement).toHaveAttribute("alt", defaultProps.iconPath);
    expect(imageElement).toHaveAttribute(
      "width",
      defaultProps.iconSize.toString()
    );
    expect(imageElement).toHaveAttribute(
      "height",
      defaultProps.iconSize.toString()
    );

    // Verifica se o texto é renderizado corretamente
    expect(screen.getByText("Sample Text")).toBeInTheDocument();
  });
});
