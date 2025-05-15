export class KeycloakToken {
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

  constructor(data: Partial<KeycloakToken>) {
    if (!data.sub) throw new Error("Missing 'sub'");
    if (!data.preferred_username) throw new Error("Missing 'preferred_username'");
    if (!data.name) throw new Error("Missing 'name'");

    this.sub = data.sub;
    this.preferred_username = data.preferred_username;
    this.name = data.name;
    this.email = data.email;
    this.realm_access = data.realm_access;
    this.resource_access = data.resource_access;
    this.exp = data.exp;
    this.iat = data.iat;
  }

  hasRole(role: string, clientId?: string): boolean {
    if (clientId) {
      return this.resource_access?.[clientId]?.roles.includes(role) ?? false;
    }
    return this.realm_access?.roles.includes(role) ?? false;
  }

  getRole(){
    if(this.hasRole("COORD")){
      return "COORD"
    }else if(this.hasRole("RECEPCAO")){
      return "RECEPCAO"
    }
    return "";
  }
}