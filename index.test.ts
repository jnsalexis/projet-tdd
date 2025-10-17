import { describe, test, expect } from "@jest/globals"

describe('Product', () => {
  test('Doit créer un produit avec un nom et un prix', () => {
    const product = new Product("Pomme", 2.50);
    expect(product.name).toBe("Pomme");
    expect(product.price).toBe(2.50);
  });
});

class Product {
  constructor(public name: string, public price: number) {}
}