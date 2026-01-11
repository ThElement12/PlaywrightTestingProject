import { expect } from '@playwright/test';

export default class CheckoutPage {
  constructor(page){
    this.page = page;
    this.checkoutTitle = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
    this.confirmationText = page.locator('[data-test="complete-text"]');
  }
  async fillCheckoutInformation(firstName, lastName, postalCode){
    await expect(this.checkoutTitle).toHaveText('Checkout: Your Information');
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click();
  }
  async finishCheckout(){
    await expect(this.checkoutTitle).toHaveText('Checkout: Overview');
    await this.finishBtn.click();
  }
  async verifyOrderCompletion(){
    await expect(this.checkoutTitle).toHaveText('Checkout: Complete!');
    await expect(this.confirmationHeader).toHaveText('Thank you for your order!');
    await expect(this.confirmationText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  }
}