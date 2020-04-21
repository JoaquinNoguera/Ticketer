package com.lambda.ticketer.users;

import com.lambda.ticketer.projects.Project;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String name;
    String passwordHash;
    @ManyToMany
    List<Project> projects;
}
