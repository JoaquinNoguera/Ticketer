package com.lambda.ticketer.users;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UsersController {

    @GetMapping("/api/user")
    public String createUser(){
        return null;
    }
}
