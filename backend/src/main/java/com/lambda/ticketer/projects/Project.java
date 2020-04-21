package com.lambda.ticketer.projects;

import com.lambda.ticketer.users.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String name;
    @ManyToOne
    User owner;
    @ManyToMany
    List<User> members;
}
