package com.lambda.ticketer.projects;

import com.lambda.ticketer.users.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ProjectsRepository extends CrudRepository<Project, Long> {
    Optional<Project> findByIdAndMembersContaining(Long id, User user);
}
