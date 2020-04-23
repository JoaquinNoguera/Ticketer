package com.lambda.ticketer.tickets;

import com.lambda.ticketer.projects.Project;
import com.lambda.ticketer.projects.ProjectsRepository;
import com.lambda.ticketer.users.User;
import com.lambda.ticketer.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;

@RestController
public class TicketsController {


    @Autowired
    UsersRepository usersRepository;

    @Autowired
    ProjectsRepository projectsRepository;

    @Autowired
    TicketsRepository ticketsRepository;

    @PostMapping("/api/projects/{id}/tickets")
    public Ticket createNewTicket(@PathVariable("id") long projectId, @RequestBody InputTicket inputTicket, Principal principal){
        User user = usersRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);
        Project project = projectsRepository.findByIdAndMembersContaining(projectId,user).orElseThrow(EntityNotFoundException::new);
        Ticket ticket = project.addTicket(inputTicket.getHeader(),inputTicket.getBody(),user);
        return ticketsRepository.save(ticket);
    }

    @PatchMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public Ticket editTicket(@PathVariable long projectId, @PathVariable long ticketId){
        return null;
    }

    @DeleteMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public Boolean deleteTicket(@PathVariable long projectId, @PathVariable long ticketId,Principal principal)
    throws Exception {
        User user = usersRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);
        Project project = projectsRepository.findByIdAndMembersContaining(projectId,user).orElseThrow(EntityNotFoundException::new);
        Ticket ticket = ticketsRepository.findById(ticketId).orElseThrow(EntityNotFoundException::new);

        if(user.equals(ticket.getResponsible()) || ticket.getStatus().equals(Ticket.TicketStatus.PENDING)){
        if(project.equals(ticket.getProject())) {
        ticketsRepository.delete(ticket);
        } else{
        throw new Exception("El ticket no pertenece al proyecto");
        }
        }else{
        throw  new Exception("El ticket le pertenece a otro usuario");
        }
            return true;
        }
}
