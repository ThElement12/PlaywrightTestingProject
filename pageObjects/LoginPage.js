import { expect } from '@playwright/test';

export default class LoginPage{
  constructor(page){
    this.page = page;
    this.userNameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
    this.errorMsg = page.locator('[data-test="error"]');
  }
  
  async fillLoginForm(userName, password){
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
  async verifyErrorMessage(userName, password){
    await this.fillLoginForm(userName, password);
    await expect(this.errorMsg).toBeVisible();
    await expect(this.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');  
  }
}