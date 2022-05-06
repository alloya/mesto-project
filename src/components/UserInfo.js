export default class UserInfo {
  constructor(profile) {
    this._userName = profile.name;
    this._userAbout = profile.about;
    this.avatar = profile.avatar;
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
    this.name = data.name;
    this.about = data.about;
    this.id = data._id;
    this.avatar.style.backgroundImage = `url("${data.avatar}")`;
  }
}
