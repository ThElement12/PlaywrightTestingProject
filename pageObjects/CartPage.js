import { expect } from '@playwright/test';

export default class CartPage {
  constructor(page){
    this.page = page;
    this.cartTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }
  async verifyItemInCartByName(productName){
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
  }
  async clickCheckoutBtn(){
    await this.checkoutBtn.click();
  }
}