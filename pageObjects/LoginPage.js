export default class LoginPage{
  constructor(page){
    this.page = page;
    this.userNameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
  }
  
  async fillLoginForm(userName, password){
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}