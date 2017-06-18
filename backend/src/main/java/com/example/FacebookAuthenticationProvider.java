package com.example;

import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

/**
 * Created by iulia on 14/06/2017.
 */
public class FacebookAuthenticationProvider implements AuthenticationProvider {

    UserInfoTokenServices userInfoTokenService;

    public FacebookAuthenticationProvider(UserInfoTokenServices userInfoTokenService) {
        this.userInfoTokenService = userInfoTokenService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        FacebookAuthenticationToken fbAuthenticationToken = (FacebookAuthenticationToken) authentication;
        return userInfoTokenService.loadAuthentication(fbAuthenticationToken.getToken());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (FacebookAuthenticationToken.class.isAssignableFrom(authentication));
    }


}