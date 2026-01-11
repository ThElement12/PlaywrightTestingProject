import { test } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
import ProductsPage from '../pageObjects/ProductsPage';
import CartPage from '../pageObjects/CartPage';

const baseURL = 'https://www.saucedemo.com/';
const userName = 'standard_user';
const password = 'secret_sauce';

let loginPage, productPage, cartPage;

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await page.goto(baseURL);
    await loginPage.fillLoginForm(userName, password);

  });
  test('Test user can add products to cart', async ({ page }) => {
    await productPage.addProductToCartByName('Sauce Labs Backpack');
    await productPage.navigateToCart();
    await cartPage.verifyItemInCartByName('Sauce Labs Backpack');
  });
})
