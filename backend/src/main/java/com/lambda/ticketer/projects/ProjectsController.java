package com.lambda.ticketer.projects;

import com.lambda.ticketer.tickets.Ticket;
import com.lambda.ticketer.tickets.TicketsRepository;
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
    private TicketsRepository ticketsRepository;

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
        Project project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el proyecto "+ projectId));

        User user = usersRepository.findByName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el usuario "+ principal.getName()));

        if (user.equals(project.getOwner())) {
            user.getProjects().remove(project);
            usersRepository.save(user);

            projectsRepository.delete(project);
        }
        else {
            project.removeMember(user);
            projectsRepository.save(project);
        }

        return true;
    }

    @PatchMapping("/api/users/projects/{id}")
    public Project editProject(
            @PathVariable("id") Long projectId,
            @Valid @RequestBody ProjectPatchAction action,
            Principal principal) throws Exception {

        Project project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("No se encontro el proyecto con id"+ projectId));

        if (!principal.getName().equals(project.getOwner().getName()))
            throw new Exception("Usuario no autorizado para realizar la operacion");

        switch (action.getVerb()) {
            case ADD_MEMBER: {

                User user = usersRepository.findByName(action.getValue())
                        .orElseThrow(() -> new EntityNotFoundException("No se encontro el usuario "+ action.getValue()));

                project.addMember(user);
                project = projectsRepository.save(project);

                break;
            }
            case REMOVE_MEMBER: {

                if (principal.getName().equals(action.getValue()))
                    throw new Exception("El dueño de un proyecto no puede eliminarse a si mismo de un proyecto");

                boolean deleted = false;

                for(Ticket ticket : project.getTickets()){
                    if(ticket.getResponsible().getName().equals(action.getValue())){
                        ticket.setStatus(Ticket.TicketStatus.PENDING);
                        ticketsRepository.save(ticket);
                    }
                }

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

                break;
            }
            case RENAME: {

                project.setName(action.getValue());
                project = projectsRepository.save(project);

                break;
            }
        }

        return project;
    }

    @GetMapping("/api/projects/{id}")
    public Project getProject(@PathVariable("id") long projectId, Principal principal){
        User user = userRepository.findByName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el usuario "+ principal.getName()));

        return projectsRepository.findByIdAndMembersContaining(projectId, user)
            .orElseThrow(() -> new EntityNotFoundException(
                    "No se encuentra el proyecto "+ projectId +" para el usuario "+ user.getName()
            ));
    }
}
