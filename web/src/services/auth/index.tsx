class Auth {
  authenticated: boolean

  constructor() {
    this.authenticated = false;
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
