// import Api from "./Api"
export default class UserInfo {
  constructor(profile) {
    this._userName = profile.name;
    this._userAbout = profile.about;
    this._avatar = profile.avatar;
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userName.textContent;
    this._userData.about = this._userAbout.textContent;
    return this._userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._avatar.style.backgroundImage = `url("${data.avatar}")`;
  }
}