/**
 *
 * Define all global types in this file.
 *
 */

type User = {
  email: string;
  provider: string;
  username: string;
  image: string;
};

type Product = {
  _id: string;
  name: string;
  price: string;
  quantity: number;
  purchased: boolean;
  creator: User;
};
