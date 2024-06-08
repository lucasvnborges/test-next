import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import CreateProductModal from "@components/molecules/CreateProductModal";

const mockSetIsOpen = jest.fn();
const mockSetProducts = jest.fn();

const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Product 1",
    price: 10,
    quantity: 5,
    purchased: false,
    creator: {
      email: "tester1@test.com",
      provider: "google",
      username: "tester1",
      image: "https://sample.com/img1.png",
    },
  },
  {
    _id: "2",
    name: "Product 2",
    price: 20,
    quantity: 10,
    purchased: false,
    creator: {
      email: "tester2@test.com",
      provider: "google",
      username: "tester2",
      image: "https://sample.com/img1.png",
    },
  },
];

const defaultProps = {
  isOpen: true,
  products: mockProducts,
  setIsOpen: mockSetIsOpen,
  setProducts: mockSetProducts,
};

describe("CreateProductModal", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("cancels product creation", async () => {
    render(<CreateProductModal {...defaultProps} />);

    fireEvent.click(screen.getByText("Cancelar"));

    await waitFor(() => {
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });
  });

  test("displays error message for required field", async () => {
    render(<CreateProductModal {...defaultProps} />);

    await act(async () => {
      fireEvent.click(screen.getByText("Criar produto"));
    });
  });

  test("displays loading state while creating product", async () => {
    const newName = "New Product";
    const newPrice = 15;
    const newQuantity = 7;

    render(<CreateProductModal {...defaultProps} />);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Nome do item"), {
        target: { value: newName },
      });
      fireEvent.change(screen.getByPlaceholderText("Preço"), {
        target: { value: newPrice },
      });
      fireEvent.change(screen.getByPlaceholderText("Quantidade"), {
        target: { value: newQuantity },
      });

      fireEvent.click(screen.getByText("Criar produto"));
    });
  });
});
