import Keycloak from 'keycloak-js';

const DEBUG = 0;

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
export const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'realm2',
  clientId: 'test_client'
});

export const eventLogger = (event, error) => {
  if (DEBUG === 1) {
    console.log('onKeycloakEvent', event, error);
  }
};

export const tokenLogger = (tokens) => {
  if (DEBUG === 1) {
    console.log('onKeycloakTokens', tokens);
  }
};
