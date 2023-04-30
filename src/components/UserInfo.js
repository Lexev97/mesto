class Userinfo {
  constructor({ userNameSelector, descriptionSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      description: this._description.textContent,
      avatarLink: this._avatar.style.backgroundImage.slice(5, -2),
    };
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._description.textContent = userInfo.about;
  }

  setUserAvatar(userInfo) {
    this._avatar.style.backgroundImage = `url(${userInfo.avatar})`;
  }

}

export default Userinfo;
