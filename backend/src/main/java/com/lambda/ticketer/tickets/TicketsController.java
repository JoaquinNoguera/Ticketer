package com.lambda.ticketer.tickets;

import com.lambda.ticketer.exceptions.CustomException;
import com.lambda.ticketer.projects.Project;
import com.lambda.ticketer.projects.ProjectsRepository;
import com.lambda.ticketer.users.User;
import com.lambda.ticketer.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
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
    public Ticket createNewTicket(
            @PathVariable("id") long projectId,
            @Valid @RequestBody InputTicket inputTicket,
            Principal principal)
    {
        User user = usersRepository.findByName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el usuario "+ principal.getName()));

        Project project = projectsRepository.findByIdAndMembersContaining(projectId, user)
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el proyecto "+ projectId));

        Ticket ticket = project.addTicket(inputTicket.getHeader(), inputTicket.getBody(), user);

        return ticketsRepository.save(ticket);
    }

    @PatchMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public Ticket editTicket(
            @PathVariable long projectId,
            @PathVariable long ticketId,
            @Valid @RequestBody TicketPatchAction action,
            Principal principal)
    throws Exception {
        User user = usersRepository.findByName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el usuario "+ principal.getName()));

        Project project = projectsRepository.findByIdAndMembersContaining(projectId, user)
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el proyecto "+ projectId));

        Ticket ticket = ticketsRepository.findByIdAndProject(ticketId, project)
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el ticket "+ ticketId));

        switch (action.getVerb()){
            case TAKE: {
                if (ticket.getStatus().equals(Ticket.TicketStatus.TAKEN))
                    throw new CustomException("El ticket ya esta tomado");
                else {
                    long count = ticketsRepository.countByResponsibleAndProjectAndStatus(user, project, Ticket.TicketStatus.TAKEN);

                    if (count <= 3) {
                        ticket.setStatus(Ticket.TicketStatus.TAKEN);
                        ticket.setResponsible(user);
                        ticket = ticketsRepository.save(ticket);
                    }
                    else
                        throw new CustomException("El usario ya tiene muchos tickets tomados");
                }
                break;
            }
            case DROP: {
                if (ticket.getResponsible().equals(user) || ticket.getStatus().equals(Ticket.TicketStatus.SOLVED)){
                    ticket.setStatus(Ticket.TicketStatus.PENDING);
                    ticket = ticketsRepository.save(ticket);
                }
                else
                    throw new CustomException("El ticket no es suyo para dejarlo");

                break;
            }
            case SOLVED: {
                if (ticket.getResponsible().equals(user)) {
                    ticket.setStatus(Ticket.TicketStatus.SOLVED);
                    ticket = ticketsRepository.save(ticket);
                }
                else
                    throw new CustomException("El ticket no es suyo");

                break;
            }
            case CHANGE: {
                if (ticket.getResponsible().equals(user) || ticket.getStatus().equals(Ticket.TicketStatus.PENDING)){
                    ticket.setHeader(action.getValue().getHeader());
                    ticket.setBody(action.getValue().getBody());

                    ticket = ticketsRepository.save(ticket);
                }
                else
                    throw new CustomException("El ticket no es suyo para dejarlo");

                break;
            }
        }

        return ticket;
    }

    @DeleteMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public Boolean deleteTicket(
            @PathVariable long projectId,
            @PathVariable long ticketId,
            Principal principal)
    throws Exception {
        User user = usersRepository.findByName(principal.getName())
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el usuario "+ principal.getName()));

        Project project = projectsRepository.findByIdAndMembersContaining(projectId,user)
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el proyecto "+ projectId));

        Ticket ticket = ticketsRepository.findById(ticketId)
                .orElseThrow(() -> new EntityNotFoundException("No se encuentra el ticket "+ ticketId));

        if (user.equals(ticket.getResponsible()) || ticket.getStatus().equals(Ticket.TicketStatus.PENDING)) {
            if (project.equals(ticket.getProject())) {
                ticketsRepository.delete(ticket);
            }
            else
                throw new CustomException("El ticket no pertenece al proyecto");
        }
        else
            throw  new CustomException("El ticket le pertenece a otro usuario");

        return true;
    }
}
