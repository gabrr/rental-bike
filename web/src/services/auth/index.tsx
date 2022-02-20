class Auth {
  authenticated: boolean

  constructor() {
    this.authenticated = true;
  }

  signin(cb: any) {
    this.authenticated = true;
    cb();
  }

  signout(cb: any) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
