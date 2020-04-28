package com.lambda.ticketer.login;

import com.lambda.ticketer.security.JwtUtils;
import com.lambda.ticketer.users.User;
import com.lambda.ticketer.users.UserDetailsService;
import com.lambda.ticketer.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.security.Principal;
import java.util.Optional;

@RestController
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/api/login")
    public Boolean authenticationUser(
            @Valid @RequestBody AuthenticationRequest authenticationRequest,
            HttpServletResponse response)
            throws Exception {

        authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getName(),
                            authenticationRequest.getPassword()));

        final String jwt = jwtUtils.generateToken(authenticationRequest.getName());
        Cookie cookie = new Cookie("token",jwt);
        cookie.setMaxAge(60 * 15);
        cookie.setPath("/");
        response.addCookie(cookie);

        return true;
    }

    @GetMapping("/api/authentication")
    public AuthenticationResponse authenticationUser(Principal principal){
        User user = usersRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);
        return new AuthenticationResponse(user.getName());
    }
}
