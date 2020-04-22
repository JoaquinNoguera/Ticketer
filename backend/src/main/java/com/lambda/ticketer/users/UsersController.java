package com.lambda.ticketer.users;

import com.lambda.ticketer.login.AuthenticationResponse;
import com.lambda.ticketer.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
public class UsersController {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    JwtUtils jwt;

    @PostMapping("/api/users")
    public AuthenticationResponse createUser(@Valid @RequestBody User user, HttpServletResponse response) {

        user = usersRepository.save(user);

        final String token = jwt.generateToken(user.getName());

        Cookie cookie = new Cookie("token", token);
        cookie.setMaxAge(60 * 15);
        response.addCookie(cookie);

        return new AuthenticationResponse(token);
    }
}
