import { expect } from "@playwright/test";

export default class ProductsPage {
  constructor(page){
    this.page = page;
    this.productsTitle = page.locator('.app_logo');
  }
  async verifyProductsPageTitle(){
    await this.productsTitle.waitFor();
    await expect(this.productsTitle).toBeVisible();
  }
}