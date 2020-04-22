package com.lambda.ticketer.users;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UsersController {

    @PostMapping("/api/user")
    public User createUser(){
        return null;
    }
}
