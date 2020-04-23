package com.lambda.ticketer.tickets;

import org.springframework.web.bind.annotation.*;

@RestController
public class TicketsController {

    @PostMapping("/api/projects/{id}/tickets")
    public Ticket createNewTicket(@PathVariable("id") long projectId){
        return null;
    }

    @PatchMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public Ticket editTicket(@PathVariable long projectId, @PathVariable long ticketId){
        return null;
    }

    @DeleteMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public Boolean deleteTicket(@PathVariable long projectId, @PathVariable long ticketId){
        return null;
    }
}
