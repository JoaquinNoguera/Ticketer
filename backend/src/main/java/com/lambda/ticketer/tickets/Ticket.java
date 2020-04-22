package com.lambda.ticketer.tickets;

import com.lambda.ticketer.projects.Project;
import com.lambda.ticketer.users.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    Integer name;

    @Size(max = 140, message = "El encabezado de un ticket no puede tener mas de 140 caracteres")
    @NotNull(message = "El encabezado de un ticket no puede ser nulo")
    @NotBlank(message = "El encabezado de un ticket no puede ser vacio")
    String header;

    @NotNull(message = "El cuerpo de un ticket no puede ser nulo")
    @NotBlank(message = "El cuerpo de un ticket no puede ser vacio")
    String body;

    @NotNull(message = "El estado de un ticket no puede ser nulo")
    TicketStatus status;

    @ManyToOne
    User responsible;

    @NotNull(message = "El ticket debe pertenecer a un proyecto")
    @ManyToOne
    Project project;

    public enum TicketStatus {
        PENDING, TAKEN, SOLVED
    }
}
