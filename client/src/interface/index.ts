export enum Protocol {
  OIDC = "oidc",
  OAUTH = "oauth",
  SAML = "saml",
  LDAP = "ldap",
  AD = "ad",
  CAS = "cas",
  AZURE_AD = "azure-ad",
  ASA = "asa",
}
export interface ApplicationPasswordTabConfig {
  enabledLoginMethods?: string[];
  validLoginMethods?: string[];
  validRegisterMethods?: string[];
}

export interface ApplicationVerifyCodeTabConfig {
  enabledLoginMethods?: string[];
  validLoginMethods?: string[];
  validRegisterMethods?: string[];
}
export interface IAsaConfig {
  // 如何计算账号唯一标识
  accountIdentifierFn: string;
  startPage: string;
  asaAutoSteps: any[];
  createAccountSteps: any[];
}
export interface ApplicationConfig {
  id: string;
  guardVersion: string;
  createdAt: string;
  updatedAt: string;
  userPoolId: string;
  isOfficial: boolean;
  name: string;
  secret: string;
  logo: string;
  redirectUris: string[];
  logoutRedirectUris: string[];
  enabled: boolean;
  registerDisabled: boolean;
  samlProviderEnabled: boolean;
  oauthProviderEnabled: boolean;
  casProviderEnabled: boolean;
  oidcProviderEnabled: boolean;
  loginTabs: string[];
  defaultLoginTab: string;
  registerTabs: string[];
  defaultRegisterTab: string;
  socialConnections: string[];
  isDemo?: boolean;
  udf: string[];
  protocol: Protocol;
  passwordTabConfig?: ApplicationPasswordTabConfig;
  verifyCodeTabConfig: ApplicationVerifyCodeTabConfig;
  identityProviderId: string;
  identifier: string;
  oidcConfig: any;
  asaConfig: IAsaConfig;
  oidcJWEConfig: any;
  samlConfig: any;
  samlResponseSigningCert: string;
  enableSubAccount: boolean;
  customBrandingEnabled: boolean;
  ssoDomain?: string;
  disabledSocialConnections?: string[];
  disabledOidcConnections?: string[];
  disabledSamlConnections?: string[];
  disabledCasConnections?: string[];
  disabledOauth2Connections?: string[];
  disabledAzureAdConnections?: string[];
  ldapConnections?: string[];
  adConnections?: string[];
  extendsFields?: any[];
  css?: string;
  permissionStrategy: {
    allowPolicyId: string;
    defaultStrategy: "ALLOW_ALL" | "DENY_ALL";
    denyPolicyId: string;
    enabled: boolean;
  };
  agreementEnabled: boolean;
  isIntegrate: boolean;
  isDefault: boolean;
  isAsa: boolean;
  ext?: Record<string, any>;
  template?: string;
  enableDeviceMutualExclusion: boolean;
  ssoEnabled: boolean;
  casExpireBaseBrowser?: boolean;
  initLoginUrl?: string;
  complateFiledsPlace?: string[]; // 注册补全的时机，可能是 ["register", "login"]
  loadingBackground?: string;
  customLoading?: string;
  customSecurityEnabled?: boolean; // 是否开启本应用自定义安全规则
  uploadedApn: boolean; // 是否上架apn
  ssoPageCustomizationSettings?: {
    hideIdp?: boolean;
    hideSocialLogin?: boolean;
    autoRegisterThenLogin?: boolean;
    hideForgetPassword?: boolean;
  };
  cssEnabled?: boolean;
  enableGuardVersionSwitch?: boolean;
}
export interface GuardPageConfig {
  global: {
    languageFollowsBrowser: boolean; //是否跟随浏览器语言
    defaultLanguage: string; //默认语言
    optionalLanguage: string[]; //可选语言
  };
}
