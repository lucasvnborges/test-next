import React from "react";
import { render, screen } from "@testing-library/react";
import CustomAvatar from "@components/atoms/CustomAvatar";

describe("CustomAvatar", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  const defaultProps = {
    size: 60,
    image: "/path/to/image.jpg",
    mainText: "Main Text",
    subText: "Sub Text",
  };

  test('renders with provided properties', () => {
    render(<CustomAvatar {...defaultProps} />);

    // Verifica se o avatar é renderizado com a imagem correta usando regex
    const avatarImg = screen.getByRole('img', { name: /avatar/i });
    expect(avatarImg).toHaveAttribute('src', expect.stringContaining('%2Fpath%2Fto%2Fimage.jpg'));

    // Verifica se os textos principais e secundários são renderizados
    expect(screen.getByText('Main Text')).toBeInTheDocument();
    expect(screen.getByText('Sub Text')).toBeInTheDocument();
  });

  test('renders without mainText and subText', () => {
    render(<CustomAvatar size="small" image={defaultProps.image} />);

    // Verifica se o avatar é renderizado com a imagem correta usando regex
    const avatarImg = screen.getByRole('img', { name: /avatar/i });
    expect(avatarImg).toHaveAttribute('src', expect.stringContaining('%2Fpath%2Fto%2Fimage.jpg'));

    // Verifica se os textos principais e secundários não são renderizados
    expect(screen.queryByText('Main Text')).not.toBeInTheDocument();
    expect(screen.queryByText('Sub Text')).not.toBeInTheDocument();
  });

  test('renders only mainText', () => {
    render(<CustomAvatar size={60} image={defaultProps.image} mainText="Main Text" />);

    // Verifica se o avatar é renderizado com a imagem correta usando regex
    const avatarImg = screen.getByRole('img', { name: /avatar/i });
    expect(avatarImg).toHaveAttribute('src', expect.stringContaining('%2Fpath%2Fto%2Fimage.jpg'));

    // Verifica se o texto principal é renderizado
    expect(screen.getByText('Main Text')).toBeInTheDocument();

    // Verifica se o texto secundário não é renderizado
    expect(screen.queryByText('Sub Text')).not.toBeInTheDocument();
  });

  test('renders only subText', () => {
    render(<CustomAvatar size="small" image={defaultProps.image} subText="Sub Text" />);

    // Verifica se o avatar é renderizado com a imagem correta usando regex
    const avatarImg = screen.getByRole('img', { name: /avatar/i });
    expect(avatarImg).toHaveAttribute('src', expect.stringContaining('%2Fpath%2Fto%2Fimage.jpg'));

    // Verifica se o texto secundário é renderizado
    expect(screen.getByText('Sub Text')).toBeInTheDocument();

    // Verifica se o texto principal não é renderizado
    expect(screen.queryByText('Main Text')).not.toBeInTheDocument();
  });
});
