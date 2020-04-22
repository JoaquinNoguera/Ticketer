package com.lambda.ticketer.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.util.Date;

@Service
public class JwtUtils {

    private String SECRET_KEY = "secret";
    private Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
    private JWTVerifier verifier = JWT.require(algorithm).build();

    public String extractUsername(String token){
        DecodedJWT decodedJWT = verifier.verify(token);
        String str = decodedJWT.getClaim("name").asString();
        return str;
    }


    public String generateToken(String username){

        Date expiresAt = new Date();
        expiresAt.setTime(expiresAt.getTime() + 900000);
        String token = JWT.create()
                .withExpiresAt(expiresAt)
                .withClaim("name", username)
                .sign(algorithm);

        return token;

    }

}
