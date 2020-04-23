package com.lambda.ticketer.tickets;

import com.lambda.ticketer.projects.Project;
import com.lambda.ticketer.users.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketsRepository extends CrudRepository<Ticket, Long> {
    Optional<Ticket> findByIdAndProject(Long id, Project project);
    long countByResponsibleAndProjectAndStatus(User responsible, Project project, Ticket.TicketStatus status);
}
