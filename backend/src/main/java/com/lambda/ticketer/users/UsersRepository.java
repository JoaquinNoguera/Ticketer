package com.lambda.ticketer.users;

import com.lambda.ticketer.projects.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends CrudRepository<User, Long> {
    Optional<User> findByName(String name);

    Optional<User> findByNameAndProjectsContaining(String name, Project project);
}
