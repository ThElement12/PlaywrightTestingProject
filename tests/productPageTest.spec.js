import { test } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
import ProductsPage from '../pageObjects/ProductsPage';
import CartPage from '../pageObjects/CartPage';
import CheckoutPage from '../pageObjects/CheckoutPage';

const baseURL = process.env.BASE_URL;
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;

let loginPage, productPage, cartPage, checkoutPage;

test.describe('Product Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto(baseURL);
    await loginPage.fillLoginForm(userName, password);

  });
  test('Test user can add products to cart', async ({ page }) => {
    await productPage.addProductToCartByName('Sauce Labs Backpack');
    await productPage.navigateToCart();
    await cartPage.verifyItemInCartByName('Sauce Labs Backpack');
  });
  test('Test user can add products to cart and complete the checkout process', async ({ page }) => {
    const items = ['Sauce Labs Backpack',  'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket'];
    const name = 'John';
    const lastName = 'Doe';
    const postalCode = '12345';

    for (const item of items) {
      await productPage.addProductToCartByName(item);
    }
    await productPage.navigateToCart();
    await cartPage.clickCheckoutBtn();
    await checkoutPage.fillCheckoutInformation(name, lastName, postalCode);
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderCompletion();
  })
  test('Verify "Your Information" fields are mandatory', async ({ page }) => {
    const name = 'John';
    const lastName = 'Doe';
    const postalCode = '12345';
    await productPage.addProductToCartByName('Sauce Labs Backpack');
    await productPage.navigateToCart();
    await cartPage.clickCheckoutBtn();

    await checkoutPage.fillCheckoutInformation('', lastName, postalCode);
    await checkoutPage.verifyErrorMessage('Error: First Name is required');

    await checkoutPage.fillCheckoutInformation(name, '', postalCode);
    await checkoutPage.verifyErrorMessage('Error: Last Name is required');

    await checkoutPage.fillCheckoutInformation(name, lastName, '');
    await checkoutPage.verifyErrorMessage('Error: Postal Code is required');
  });
})
