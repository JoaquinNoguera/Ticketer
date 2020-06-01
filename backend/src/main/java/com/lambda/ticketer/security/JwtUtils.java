package com.lambda.ticketer.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.util.Date;

@Service
public class JwtUtils {
    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    public JwtUtils(Environment env) throws Exception {
        String SECRET_KEY = env.getProperty("AUTHORIZATION_SECRET");
        if (SECRET_KEY == null)
            throw new Exception("AUTHORIZATION_SECRET es nulo");

        this.algorithm  = Algorithm.HMAC256(SECRET_KEY);
        this.verifier  = JWT.require(algorithm).build();
    }

    public String extractUsername(String token){
        DecodedJWT decodedJWT = verifier.verify(token);

        return decodedJWT.getClaim("name").asString();
    }


    public String generateToken(String username){

        Date expiresAt = new Date();
        expiresAt.setTime(expiresAt.getTime() + 900000);

        return JWT.create()
                .withExpiresAt(expiresAt)
                .withClaim("name", username)
                .sign(algorithm);
    }

}
