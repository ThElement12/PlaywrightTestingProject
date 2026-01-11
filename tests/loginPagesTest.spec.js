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
})




