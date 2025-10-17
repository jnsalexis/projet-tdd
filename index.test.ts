import { describe, test, expect } from "@jest/globals"

describe('Product', () => {
  test('Doit créer un produit avec un nom et un prix', () => {
    const product = new Product("Pomme", 2.50);
    expect(product.name).toBe("Pomme");
    expect(product.price).toBe(2.50);
  });
});

describe('Cart', () => {
  test('Doit retourner 0 pour un panier vide', () => {
    const cart = new Cart([], 0);
    expect(cart.total).toBe(0);
  });
});

class Product {
  constructor(public name: string, public price: number) {}
}

class Cart {
  constructor(public products: Product[], public total: number) {}
}