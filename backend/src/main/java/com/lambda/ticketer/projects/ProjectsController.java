package com.lambda.ticketer.projects;

import com.lambda.ticketer.users.User;
import com.lambda.ticketer.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;

@RestController
public class ProjectsController {

    @Autowired
    ProjectsRepository projectsRepository;

    @Autowired
    UsersRepository usersRepository;

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
    public Project editProject(
            @PathVariable("id") Long projectId,
            @Valid @RequestBody ProjectPatchAction action) {

        Project project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("No se encontro el proyecto con id"+ projectId));

        switch (action.getVerb()) {
            case ADD_MEMBER: {
                User user = usersRepository.findByNameAndProjectsContaining(action.getValue(), project)
                        .orElseThrow(() -> new EntityNotFoundException("No se encontro el usuario "+ action.getValue()));

                break;
            }
            case REMOVE_MEMBER: {

                break;
            }
            case RENAME: {

                break;
            }
        }

        return project;
    }

    @GetMapping("/api/projects/{id}")
    public Project getProject(@PathVariable("id") long projectId){
        return null;
    }
}
