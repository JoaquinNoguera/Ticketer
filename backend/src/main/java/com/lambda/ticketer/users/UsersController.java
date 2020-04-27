package com.lambda.ticketer.users;

import com.lambda.ticketer.exceptions.CustomException;
import com.lambda.ticketer.login.AuthenticationResponse;
import com.lambda.ticketer.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.security.Principal;

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

    @PatchMapping("/api/users")
    public Boolean changePassword(@Valid @RequestBody ChangePasswordRequest passwordRequest, Principal principal)
    throws Exception {
        User user = usersRepository.findByName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el usuario "+ principal.getName()));

        if (user.getPasswordHash().equals(passwordRequest.getOldPassword())) {
            user.setPasswordHash(passwordRequest.getPassword());
            usersRepository.save(user);

            return true;
        }
        else
            throw new CustomException("La antigua contraseña no es correcta");
    }
}
