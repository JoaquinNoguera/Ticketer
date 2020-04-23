package com.lambda.ticketer.projects;

import com.lambda.ticketer.users.User;
import com.lambda.ticketer.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;
import java.util.Collections;

import javax.validation.Valid;
import java.util.HashSet;
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

        Project newProject = new Project(null, inputProject.getProjectName(), user, new HashSet<>(Collections.singleton(user)), new HashSet<>());
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
            @Valid @RequestBody ProjectPatchAction action,
            Principal principal) throws Exception {

        Project project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("No se encontro el proyecto con id"+ projectId));

        switch (action.getVerb()) {
            case ADD_MEMBER: {

                boolean principalInProject = false;
                for (User user : project.getMembers()) {
                    if (user.getName().equals(principal.getName())) {
                        principalInProject = true;
                        break;
                    }
                }

                if (principalInProject) {
                    User user = usersRepository.findByName(action.getValue())
                            .orElseThrow(() -> new EntityNotFoundException("No se encontro el usuario "+ action.getValue()));

                    project.addMember(user);
                    project = projectsRepository.save(project);
                }
                else
                    throw new Exception("Usuario no autorizado para realizar la operacion");

                break;
            }
            case REMOVE_MEMBER: {
                if (principal.getName().equals(action.getValue()))
                    throw new Exception("El usua");

                if (principal.getName().equals(project.getOwner().getName())) {
                    boolean deleted = false;
                    for (User user : project.getMembers()) {
                        if (user.getName().equals(action.getValue())) {
                            project.removeMember(user);
                            project = projectsRepository.save(project);
                            deleted = true;

                            break;
                        }
                    }
                    if (!deleted) {
                        throw new EntityNotFoundException("No se encontró el usuario "+ action.getValue());
                    }
                }
                else
                    throw new Exception("Usuario no autorizado para realizar la operacion");

                break;
            }
            case RENAME: {
                if (principal.getName().equals(project.getOwner().getName())) {
                    project.setName(action.getValue());
                    project = projectsRepository.save(project);
                }
                else
                    throw new Exception("Usuario no autorizado para realizar la operacion");

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
