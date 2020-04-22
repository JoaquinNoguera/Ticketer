package com.lambda.ticketer.tickets;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class TicketsController {

    @PostMapping("/api/projects/{id}/tickets")
    public Ticket createNewTicket(@PathVariable("id") long projectId){
        return null;
    }

    @PatchMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public Ticket createNewTicket(@PathVariable long projectId, @PathVariable long ticketId){
        return null;
    }

    @DeleteMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public Ticket deleteTicket(@PathVariable long projectId, @PathVariable long ticketId){
        return null;
    }
}
