package com.lambda.ticketer.projects;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ProjectsController {

    @GetMapping("/api/users/projects")
    public String getAllProjects(){
        return null;
    }

    @PostMapping("/api/users/projects")
    public String createNewProject(){
        return null;
    }

    @DeleteMapping("/api/users/projects/{id}")
    public String deleteProject(@PathVariable("id") String projectId){
        return null;
    }

    @PatchMapping("/api/users/projects/{id}")
    public String editProject(@PathVariable("id") String projectId){
        return null;
    }

    @GetMapping("/api/projects/{id}")
    public String getProject(@PathVariable("id") String projectId){
        return null;
    }
}
