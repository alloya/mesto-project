import {api} from "../index";

export default class UserInfo {
  constructor(profile) {
    this._userName = profile.name;
    this._userAbout = profile.about;
    this._avatar = profile.avatar;
    this.name = '';
    this.about = '';
    this.id = '';
  }

  getUserInfo() {
    return {
      name: this.name,
      about: this.about
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    return api.updateCurrentUser(data.name, data.about)
  }
}
