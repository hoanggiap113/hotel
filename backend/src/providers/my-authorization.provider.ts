import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
  Authorizer,
} from '@loopback/authorization';
import {Provider} from '@loopback/core';
import {UserProfile, securityId} from '@loopback/security';
import _ from 'lodash';

interface MyAuthorizationMetadata extends AuthorizationMetadata {
  roles?: string[]; 
}

export class MyAuthorizationProvider implements Provider<Authorizer>{
    constructor(){}

    value(): Authorizer {
        return this.authorize.bind(this);
    }
    async authorize(
    authorizationCtx: AuthorizationContext,
    metadata: MyAuthorizationMetadata,
  ): Promise<AuthorizationDecision> {
    const userProfile: UserProfile = authorizationCtx.principals[0];

    const requiredRoles = metadata.roles;
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return AuthorizationDecision.ALLOW;
    }
    const userRoles = userProfile.roles || [];
    const isAllowed = _.intersection(requiredRoles, userRoles).length > 0;
    if (isAllowed) {
      return AuthorizationDecision.ALLOW;
    }

    return AuthorizationDecision.DENY;
  }
}