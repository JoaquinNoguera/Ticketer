package com.lambda.ticketer.login;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
public class AuthenticationRequest {
    @Getter @Setter private String name;

    @Getter @Setter private String password;

}
