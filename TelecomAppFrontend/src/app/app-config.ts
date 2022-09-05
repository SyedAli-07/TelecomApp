import { MsalGuardConfiguration, MsalInterceptorConfiguration } from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";
import {Configuration} from "msal";

export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const b2cPolicies ={
    names: {
        signUpSignIn: 'B2C_1_mvptelecom-client'
    },
    authorities: {
        signInSignUp: {
                    authority: 'https://mvptelecom.b2clogin.com/mvptelecom.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_mvptelecom-client&client_id=76614ac9-0d7f-4fa2-beb7-2e5588b40a90&nonce=defaultNonce&redirect_uri=https%3A%2F%2Forange-mushroom-0fdc85810.1.azurestaticapps.net&scope=openid&response_type=id_token&prompt=login'
        }
    }
}

export const apiConfig: { b2cScopes: string[], apiEndpoint: string} ={
    // ************ Correct URLs here?? **************
    b2cScopes: ['https://telecomappapi.azurewebsites.net.read'],
    apiEndpoint: 'https://telecomappapi.azurewebsites.net'
}

export const msalConfig: Configuration = {
    auth: {
        clientId: '76614ac9-0d7f-4fa2-beb7-2e5588b40a90',
        authority: b2cPolicies.authorities.signInSignUp.authority,
        redirectUri: 'https://telecomappapi.azurewebsites.net',
        postLogoutRedirectUri: 'https://telecomappapi.azurewebsites.net',
        navigateToLoginRequestUrl: true,
        validateAuthority: true
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE
    }
}

export const loginRequest: { scopes: string[]} = {
    scopes: ['openId', 'profile']
}

export const tokenRequest: { scopes: string[]} = {
    scopes: apiConfig.b2cScopes
}

export const protectedResourceMap: [string, string[]][] = [
    [apiConfig.apiEndpoint, apiConfig.b2cScopes]
]

export const msalAngularConfig: {} = {
    popUp: !isIE,
    consentScopes: [
        ...loginRequest.scopes,
        ...tokenRequest.scopes
    ],
    unprotectedResources: [],
    protectedResourceMap,
    extraQueryParameters: {}
}

export const guardConfig: MsalGuardConfiguration = {
    interactionType: InteractionType.Redirect
}

export const interceptConfig: MsalInterceptorConfiguration = {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ])
}