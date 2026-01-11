import LoginPageObjects from './loginPageObjects.js';

const objects = new LoginPageObjects();

export default class LoginPageActions {
  async fillLoginForm(page, userName, password){
    await page.locator(objects.userNameInput()).fill(userName)
    await page.locator(objects.passwordInput()).fill(password)
    await page.locator(objects.loginBtn()).click();
  }
}