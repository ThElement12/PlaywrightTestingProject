import { expect } from "@playwright/test";

export default class ProductsPage {
  constructor(page){
    this.page = page;
    this.productsTitle = page.locator('.app_logo');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBtn = page.locator('[data-test="shopping-cart-link"]');
  }
  async verifyProductsPageTitle(){
    await this.productsTitle.waitFor();
    await expect(this.productsTitle).toBeVisible();
  }
  async addProductToCartByName(productName){
    const product = this.inventoryItems.filter({ hasText: productName });
    const addToCartBtn = product.locator('button').first();
    await addToCartBtn.click();
  }
  async navigateToCart(){
    await this.cartBtn.click();
  }
}