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
    public Ticket editTicket(@PathVariable long projectId, @PathVariable long ticketId, @RequestBody TicketPatchAction action, Principal principal)
    throws Exception{
        User user = usersRepository.findByName(principal.getName()).orElseThrow(EntityNotFoundException::new);
        Project project = projectsRepository.findByIdAndMembersContaining(projectId,user).orElseThrow(EntityNotFoundException::new);
        Ticket ticket = ticketsRepository.findByIdAndProject(ticketId,project).orElseThrow(EntityNotFoundException::new);

        switch (action.getVerb()){
            case TAKE: {
                if(ticket.getStatus().equals(Ticket.TicketStatus.TAKEN)){
                    throw new Exception("El ticket ya esta tomado");
                } else{
                    ticket.setStatus(Ticket.TicketStatus.TAKEN);
                    ticket.setResponsible(user);
                    ticket = ticketsRepository.save(ticket);
                }
                break;
            }
            case DROP: {
                if(ticket.getResponsible().equals(user)){
                    ticket.setStatus(Ticket.TicketStatus.PENDING);
                    ticket = ticketsRepository.save(ticket);
                }else{
                    throw new Exception("El ticket no es suyo para dejarlo");
                }
            }
            case SOLVED:{
                if(ticket.getResponsible().equals(user)) {
                    ticket.setStatus(Ticket.TicketStatus.SOLVED);
                    ticket = ticketsRepository.save(ticket);
                }else{
                    throw new Exception("El ticket no es suyo");
                }
                break;
            }
            case CHANGE:{
                if(ticket.getResponsible().equals(user)){
                    ticket.setHeader(action.getValue().getHeader());
                    ticket.setBody(action.getValue().getHeader());
                }else{
                    throw new Exception("El ticket no es suyo para dejarlo");
                }
                break;
            }
        }

        return ticket;
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
