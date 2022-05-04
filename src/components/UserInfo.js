export default class UserInfo {
  constructor(profile) {
    this._userName = profile.name;
    this._userAbout = profile.about;
    this._avatar = profile.avatar;
    this._id = profile.id;
    this.name = '';
    this.about = '';
    this.avatar = profile.avatar;
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
    this._avatar = data.avatar;
    this.name = data.name;
    this.about = data.about;
    this.avatar = data.avatar;
  }
}
