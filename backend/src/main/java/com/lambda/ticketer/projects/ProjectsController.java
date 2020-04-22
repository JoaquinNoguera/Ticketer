package com.lambda.ticketer.projects;

import com.lambda.ticketer.users.User;
import com.lambda.ticketer.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class ProjectsController {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private ProjectsRepository projectsRepository;

    @GetMapping("/api/users/projects")
    public List<Project> getAllProjects(){
        return null;
    }

    @PostMapping("/api/users/projects")
    public Project createNewProject(@RequestBody InputProject inputProject, Principal principal){
        Optional<User> user = userRepository.findByName(principal.getName());
        if(user.isPresent()) {
            Project newProject = new Project(null, inputProject.getProjectName(), user.get(), Collections.singletonList(user.get()), new ArrayList<>());
            newProject = projectsRepository.save(newProject);
            return newProject;
        }
        return  null;
    }

    @DeleteMapping("/api/users/projects/{id}")
    public Boolean deleteProject(@PathVariable("id") long projectId, Principal principal){
        Optional<Project> project = projectsRepository.findById(projectId);
        if(project.isPresent()){
            Optional<User> user = userRepository.findByName(principal.getName());
            if(user.isPresent()) {
                if(user.get().equals(project.get().getOwner())){
                    projectsRepository.delete(project.get());
                    return true;
                }
            }
        }
        return false;
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
