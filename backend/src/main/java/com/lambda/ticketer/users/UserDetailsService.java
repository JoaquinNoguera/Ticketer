package com.lambda.ticketer.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = usersRepository.findByName(username)
                .orElseThrow(() -> new UsernameNotFoundException("No se encontró al usuario "+ username));

        return new org.springframework.security.core.userdetails.User(
                user.getName(),
                user.getPasswordHash(),
                new ArrayList<>()
        );
    }
}
