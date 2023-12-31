import Keycloak from 'keycloak-js';

const KEYCLOAK_LOGS = 0;

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
export const keycloak = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID
});

export const eventLogger = (event, error) => {
  if (KEYCLOAK_LOGS === 1) {
    console.log('onKeycloakEvent', event, error);
  }
};

export const tokenLogger = (tokens) => {
  if (KEYCLOAK_LOGS === 1) {
    console.log('onKeycloakTokens', tokens);
  }
};
