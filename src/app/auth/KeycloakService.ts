
// // src/app/auth/KeycloakService.ts
// import Keycloak from 'keycloak-js';

// export class KeycloakService {
//   private keycloak: Keycloak;

//   constructor() {
//     this.keycloak = new Keycloak({
//      // url: 'https://back.local.juno.com.br:9555',
//      url: 'https://keycloak.local.juno.com.br:9555',
//       realm: 'sistema_realm',
//       clientId: 'sistema1-client',
//       // client secret não é usado no front-end
//     });
//   }

//   async init(): Promise<boolean> {
//     try {
//       const authenticated = await this.keycloak.init({
//         onLoad: 'login-required',
//         checkLoginIframe: false, // desativa o iframe de verificação de sessão
//         pkceMethod: 'S256',      // adiciona PKCE como medida de segurança moderna
//         enableLogging: true,     // útil durante desenvolvimento
//       });

//       if (authenticated) {
//         localStorage.setItem('token', this.keycloak.token!);
//         return true;
//       }

//       return false;
//     } catch (error) {
//       console.error('Erro ao inicializar o Keycloak', error);
//       return false;
//     }
//   }

//   getToken(): string | null {
//     return this.keycloak.token ?? null;
//   }
// }


// // src/app/services/keycloak.service.ts
// import Keycloak from 'keycloak-js';

// export class KeycloakService {
//   keycloak: Keycloak;

//   constructor() {
//     this.keycloak = new Keycloak({
//       url: 'https://back.local.juno.com.br:8443', // dominio do back + porta do tomcat
//       realm: 'sistema_realm',
//       clientId: 'sistema1-client',
//       //caso precise a key do client nmKmNPfT54r03wH6UrrWeVkf5OJ5Trw1
//     });
//   }

//   async init(): Promise<boolean> {
//     try {
//       const authenticated = await this.keycloak.init({
//         onLoad: 'login-required',
//       });

//       if (authenticated) {
//         localStorage.setItem('token', this.keycloak.token!);
//         return true;
//       }

//       return false;
//     } catch (error) {
//       console.error('Erro ao inicializar o Keycloak', error);
//       return false;
//     }
//   }

// //   getToken(): string | null {
// //     return this.keycloak.token;
// //   }

// getToken(): string | null {
//   return this.keycloak.token ?? null;
// }

// }
