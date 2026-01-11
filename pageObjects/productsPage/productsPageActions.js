import ProductsPageObjects from "./productsPageObjects";
import { expect } from "@playwright/test";

const objects = new ProductsPageObjects();

export default class ProductsPageActions {
  async verifyProductsPageTitle(page){
    await expect(page.locator(objects.productPageTitle())).toBeVisible();
  }
}