import { test } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
import ProductsPage from '../pageObjects/ProductsPage';

const baseURL = 'https://www.saucedemo.com/';
const userName = 'standard_user';
const password = 'secret_sauce';

let loginPage, productPage;

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductsPage(page);
    await page.goto(baseURL);
  });
  test('Test user can log in successfully', async ({ page }) => {
    await loginPage.fillLoginForm(userName, password);
    await productPage.verifyProductsPageTitle();
  });
  [{ username: userName, password: '', expectedError: 'Epic sadface: Password is required' },
  { username: '', password: password, expectedError: 'Epic sadface: Username is required' },
  { username: '', password: '', expectedError: 'Epic sadface: Username is required' },
  { username: 'wrong_user', password: password, expectedError: 'Epic sadface: Username and password do not match any user in this service' },
  { username: userName, password: 'wrong_password', expectedError: 'Epic sadface: Username and password do not match any user in this service' }].forEach(({ username, password, expectedError }) => {
    test(`Test login with invalid credentials: username='${username}', password='${password}'`, async ({ page }) => {
      await loginPage.fillLoginForm(username, password);
      await loginPage.verifyErrorMessage(expectedError);
    });
  });
})
