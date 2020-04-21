package com.lambda.ticketer.tickets;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class TicketsController {

    @PostMapping("/api/projects/{id}/tickets")
    public String createNewTicket(@PathVariable("id") String projectId){
        return null;
    }

    @PatchMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public String createNewTicket(@PathVariable String projectId, @PathVariable String ticketId){
        return null;
    }

    @DeleteMapping("/api/projects/{projectId}/tickets/{ticketId}")
    public String deleteTicket(@PathVariable String projectId, @PathVariable String ticketId){
        return null;
    }
}
