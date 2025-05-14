export interface KeycloakToken {
    sub: string;
    preferred_username: string;
    name: string;
    email?: string;
    realm_access?: {
      roles: string[];
    };
    resource_access?: {
      [clientId: string]: {
        roles: string[];
      };
    };
    exp?: number;
    iat?: number;
  }