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
    expect(cart.getTotal()).toBe(0);
  });

  test('Doit ajouter un produit au panier et obtenir le total', () => {
    const cart = new Cart([], 0);
    cart.addProduct(new Product("Pomme", 2.50));
    expect(cart.getTotal()).toBe(2.50);
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
  
  test('Doit gérer correctement les calculs avec décimales', () => {
    const cart = new Cart([], 0);
    cart.addProduct(new Product("Produit1", 33.33));
    cart.addProduct(new Product("Produit2", 33.33));
    cart.addProduct(new Product("Produit3", 33.34));
    expect(cart.getTotal()).toBe(100.00);
  });
  
  test('Doit appliquer la réduction avec des décimales correctement', () => {
    const cart = new Cart([], 0);
    cart.addProduct(new Product("Produit", 111.11));
    expect(cart.getTotal()).toBe(99.999);
  });
  
});

class Product {
  constructor(public name: string, public price: number) {}
}

class Cart {
  constructor(public products: Product[], public total: number) {}
  
  addProduct(product: Product) {
    this.products.push(product);
  }
  getTotal() {
    this.total = this.products.reduce((acc, product) => acc + product.price, 0);
    if (this.total > 100) {
      this.total -= this.total * 0.1;
    }
    return this.total;
  }
}