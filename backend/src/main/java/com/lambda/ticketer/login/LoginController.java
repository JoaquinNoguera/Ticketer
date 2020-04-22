package com.lambda.ticketer.login;

import com.lambda.ticketer.security.JwtUtils;
import com.lambda.ticketer.users.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/api/login")
    public AuthenticationResponse authenticationUser(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws Exception{

        authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getName(), authenticationRequest.getPassword())
        );


        final UserDetails userDetails = userDetailsService.
                loadUserByUsername(authenticationRequest.getName());

        final String jwt = jwtUtils.generateToken(userDetails);
        Cookie cookie = new Cookie("token",jwt);
        cookie.setMaxAge(60 * 15);
        response.addCookie(cookie);
        return new AuthenticationResponse(jwt);
    }
}