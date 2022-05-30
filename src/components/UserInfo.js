export default class UserInfo {
  constructor({userNameSelector, userAboutSelector, userAvatarSelector}, userId) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this.userId;
  }

  getUserInfo() {
    return {userName: this._userNameElement.textContent,
      userAbout: this._userAboutElement.textContent,
      userAvatarUrl: this._userAvatarElement.src};
  }

  setUserInfo({userName, userAbout, userAvatar}) {
    this._userNameElement.textContent = userName;
    this._userAboutElement.textContent = userAbout;
    this._userAvatarElement.src = userAvatar;
  }
}
