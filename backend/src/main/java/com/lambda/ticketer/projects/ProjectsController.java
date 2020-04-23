package com.lambda.ticketer.projects;

import com.lambda.ticketer.users.User;
import com.lambda.ticketer.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ProjectsController {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private ProjectsRepository projectsRepository;

    @Autowired
    UsersRepository usersRepository;

    @GetMapping("/api/users/projects")
    public List<Project> getAllProjects(Principal principal){
        User user = userRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);
        return user.getProjects();
    }

    @PostMapping("/api/users/projects")
    public Project createNewProject(@RequestBody InputProject inputProject, Principal principal){
        User user = userRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);

        Project newProject = new Project(inputProject.getProjectName(), user);
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
    public Project getProject(@PathVariable("id") long projectId, Principal principal){
        User user = userRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);
        Project project = projectsRepository.findByIdAndMembersContaining(projectId,user).orElseThrow(EntityNotFoundException::new);
        return project;
    }
}
