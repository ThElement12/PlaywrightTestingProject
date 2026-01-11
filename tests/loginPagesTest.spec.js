import { test } from '@playwright/test';
import LoginPageActions from '../pageObjects/loginPage/loginPageActions';
import ProductsPageActions from '../pageObjects/productsPage/productsPageActions';

const baseURL = 'https://www.saucedemo.com/';
const userName = 'standard_user';
const password = 'secret_sauce';

const loginPage = new LoginPageActions();
const productPage = new ProductsPageActions();

test.describe('Login Page Tests', () => {
test('Test user can log in successfully', async ({ page }) => {
  await page.goto(baseURL);
  await loginPage.fillLoginForm(page, userName, password);
  await productPage.verifyProductsPageTitle(page);
  });
})




