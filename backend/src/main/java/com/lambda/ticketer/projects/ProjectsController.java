package com.lambda.ticketer.projects;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ProjectsController {

    @GetMapping("/api/users/projects")
    public List<Project> getAllProjects(){
        return null;
    }

    @PostMapping("/api/users/projects")
    public Project createNewProject(){
        return null;
    }

    @DeleteMapping("/api/users/projects/{id}")
    public Boolean deleteProject(@PathVariable("id") long projectId){
        return null;
    }

    @PatchMapping("/api/users/projects/{id}")
    public Project editProject(@PathVariable("id") long projectId){
        return null;
    }

    @GetMapping("/api/projects/{id}")
    public Project getProject(@PathVariable("id") long projectId){
        return null;
    }
}
