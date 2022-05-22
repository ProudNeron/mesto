export default class UserInfo {
  constructor({userNameSelector, userAboutSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    return {userName: this._userNameElement.textContent, userAbout: this._userAboutElement.textContent};
  }

  setUserInfo({userName, userAbout}) {
    this._userNameElement.textContent = userName;
    this._userAboutElement.textContent = userAbout;
  }
}
