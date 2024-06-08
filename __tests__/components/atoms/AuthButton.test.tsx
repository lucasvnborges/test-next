import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthButton from '@components/atoms/AuthButton';

describe('AuthButton', () => {
  const mockOnClick = jest.fn();
  const props = {
    text: 'Login with Provider',
    providername: 'ProviderName',
    onClick: mockOnClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with provided text and image', () => {
    render(<AuthButton {...props} />);
    
    // Verifica se o texto é renderizado
    expect(screen.getByText('Login with Provider')).toBeInTheDocument();

    // Verifica se a imagem é renderizada com o src correto
    const img = screen.getByRole('img', { name: /icon/i });
    expect(img).toHaveAttribute('src', '/authProviders/providername.svg');
  });

  test('calls onClick when clicked', () => {
    render(<AuthButton {...props} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('changes opacity on hover', () => {
    render(<AuthButton {...props} />);
    
    const button = screen.getByRole('button');
    fireEvent.mouseOver(button);

    // Checa se o estilo de opacidade muda para 0.5
    expect(button).toHaveStyle('opacity: 0.5');
  });
});
