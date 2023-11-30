import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
export const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'realm2',
  clientId: 'test_client'
});

export const eventLogger = (event, error) => {
  console.log('onKeycloakEvent', event, error);
};

export const tokenLogger = (tokens) => {
  console.log('onKeycloakTokens', tokens);
};
