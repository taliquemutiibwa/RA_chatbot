import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'chatbot_realm',
  clientId: 'chatbot_client',
});

const initKeycloak = () => {
  return keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  });
};

const login = () => keycloak.login();
const logout = () => keycloak.logout();
const getUserName = () => keycloak.tokenParsed?.preferred_username;

export { initKeycloak, login, logout, getUserName };
