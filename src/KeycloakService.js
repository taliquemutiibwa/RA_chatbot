// src/KeycloakService.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'ura-realm',
  clientId: 'chatbot-client'
});

const initKeycloak = (onReady) => {
  keycloak.init({
    onLoad: 'check-sso',
    checkLoginIframe: false,
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  }).then(() => {
    onReady();
  });
};

const KeycloakService = {
  initKeycloak,
  login: (options = {}) => keycloak.login({
    redirectUri: window.location.origin + '/',
    ...options
  }),
  logout: () => keycloak.logout({
    redirectUri: window.location.origin + '/'
  }),
  isLoggedIn: () => !!keycloak.token,
  getUsername: () => keycloak.tokenParsed?.preferred_username,
  getToken: () => keycloak.token
};

export default KeycloakService;
