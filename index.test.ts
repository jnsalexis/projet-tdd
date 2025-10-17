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

test('Doit ajouter un produit au panier et obtenir le total', () => {
  const cart = new Cart([], 0);
  cart.addProduct(new Product("Pomme", 2.50));
  expect(cart.total).toBe(2.50);
})

test('Doit calculer le total de plusieurs produits', () => {
  const cart = new Cart([], 0);
  cart.addProduct(new Product("Pomme", 2.50));
  cart.addProduct(new Product("Banane", 2.50));
  expect(cart.getTotal()).toBe(5.00);
});

test('Doit appliquer une réduction pour > 100€', () => {
  const cart = new Cart([], 0);
  cart.addProduct(new Product("Pomme de luxe", 120.00));
  expect(cart.getTotal()).toBe(108.00);
})
  
test('Cas limite de 100€, pas de réduction', () => {
  const cart = new Cart([], 0);
  cart.addProduct(new Product("Pomme de luxe", 100.00));
  expect(cart.getTotal()).toBe(100.00);
})

class Product {
  constructor(public name: string, public price: number) {}
}

class Cart {
  constructor(public products: Product[], public total: number) {}
  addProduct(product: Product) {
    this.products.push(product);
    this.total += product.price;
  }
  getTotal() {
    if (this.total > 100) {
      this.total -= this.total * 0.1;
    }
    return this.total;
  }
}