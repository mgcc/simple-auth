export default class Auth {

  static saveUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
  }

  static deleteUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getUsername() {
    return localStorage.getItem('username');
  }

  static logIn(username, password, callback) {
    fetch(
      'http://localhost:3001/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.success) {
          this.saveUser(result.token, result.userData)
        }
        callback(result);
      });
  }

  static logout(callback) {
    this.deleteUser();
    callback();
  }
}