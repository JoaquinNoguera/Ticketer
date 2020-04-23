package com.lambda.ticketer.projects;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.lambda.ticketer.tickets.Ticket;
import com.lambda.ticketer.users.User;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @NotNull(message = "El nombre de proyecto no puede ser nulo")
    @NotBlank(message = "El nombre de proyecto no puede estar vacio")
    String name;

    @NotNull(message = "Un proyecto debe tener dueño")
    @ManyToOne
    User owner;

    @NotNull(message = "Un proyecto debe tener al menos un miembro (el dueño)")
    @Size(min = 1, message = "Un proyecto debe tener al menos un miembro (el dueño)")
    @ManyToMany
    Set<User> members;

    @NotNull
    @OneToMany(mappedBy = "project", cascade = CascadeType.REMOVE)
    Set<Ticket> tickets;

    public void addTicket(Ticket ticket) {
        tickets.add(ticket);
        ticket.setProject(this);
    }

    public void removeTicket(Ticket ticket) {
        tickets.remove(ticket);
    }

    public void addMember(User user) {
        members.add(user);
        user.getProjects().add(this);
    }

    public void removeMember(User user) {
        members.remove(user);
        user.getProjects().remove(this);
    }
}
