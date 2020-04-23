package com.lambda.ticketer.projects;

import com.lambda.ticketer.users.User;
import com.lambda.ticketer.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
public class ProjectsController {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private ProjectsRepository projectsRepository;

    @GetMapping("/api/users/projects")
    public List<Project> getAllProjects(Principal principal){
        User user = userRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);
        return user.getProjects();
    }

    @PostMapping("/api/users/projects")
    public Project createNewProject(@RequestBody InputProject inputProject, Principal principal){
        User user = userRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);

        Project newProject = new Project(null, inputProject.getProjectName(), user, Collections.singletonList(user), new ArrayList<>());
        newProject = projectsRepository.save(newProject);
        return newProject;
    }

    @DeleteMapping("/api/users/projects/{id}")
    public Boolean deleteProject(@PathVariable("id") long projectId, Principal principal){
        Project project = projectsRepository.findById(projectId).orElseThrow(EntityNotFoundException::new);

        User user = userRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);

        if(user.equals(project.getOwner())){
            projectsRepository.delete(project);
            return true;
        }

        return false;
    }

    @PatchMapping("/api/users/projects/{id}")
    public Project editProject(@PathVariable("id") long projectId){
        return null;
    }

    @GetMapping("/api/projects/{id}")
    public Project getProject(@PathVariable("id") long projectId, Principal principal){
        User user = userRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);
        Project project = projectsRepository.findByIdAndMembersContaining(projectId,user).orElseThrow(EntityNotFoundException::new);
        return project;
    }
}
