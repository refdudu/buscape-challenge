export interface ProductI {
  id: number;
  name: string;
  images: string[];
  price: {
    value: number;
    installments: number;
    installmentValue: number;
  };
}
