package com.lambda.ticketer.tickets;

import com.lambda.ticketer.projects.Project;
import com.lambda.ticketer.users.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String header;
    String body;
    TicketStatus status;
    @ManyToOne
    User responsible;
    @ManyToOne
    Project project;

    public enum TicketStatus {
        PENDING, TAKEN, SOLVED
    }
}
