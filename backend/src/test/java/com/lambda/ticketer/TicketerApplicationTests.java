package com.lambda.ticketer;

import com.lambda.ticketer.projects.Project;
import com.lambda.ticketer.projects.ProjectsRepository;
import com.lambda.ticketer.tickets.Ticket;
import com.lambda.ticketer.tickets.TicketsRepository;
import com.lambda.ticketer.users.User;
import com.lambda.ticketer.users.UsersRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.internal.exceptions.ExceptionIncludingMockitoWarnings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.sql.DataSource;
import javax.swing.text.html.parser.Entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TicketerApplicationTests {
	@Autowired
	EntityManager entityManager;
	@Autowired
	UsersRepository usersRepository;
	@Autowired
	ProjectsRepository projectsRepository;
	@Autowired
	TicketsRepository ticketsRepository;

	@Test
	void createUsers() {
		User user1 = new User(null, "Joaquin", "1234", null);
		User user2 = new User(null, "Jeremias", "1234", null);

		entityManager.persist(user1);
		entityManager.persist(user2);

		usersRepository.findAll().forEach(user -> assertNotNull(user.getId()));
	}

	@Test
	void createProjects() {
		User user1 = new User(null, "Jeremias", "1234", null);
		entityManager.persist(user1);

		Project project1 = new Project("El matat", user1);
		entityManager.persist(project1);

		projectsRepository.findAll().forEach(project -> {
			assertNotNull(project.getId());
			assertNotNull(project.getOwner().getId());
		});
	}

	@Test
	void createTickets() {
		User user1 = new User(null, "Jeremias", "1234", null);
		Project project1 = new Project("El matat", user1);

		user1 = usersRepository.save(user1);
		project1 = projectsRepository.save(project1);

		Ticket ticket1 = new Ticket(null, 1, "Hay que hacer la API", "CON NODEEEE", Ticket.TicketStatus.PENDING, user1, null);
		Ticket ticket2 = new Ticket(null, 2, "Hay que hacer la API 2", "CON PYTHONNN", Ticket.TicketStatus.SOLVED, user1, null);
		ticket1.setProject(project1);
		ticket2.setProject(project1);

		entityManager.persist(ticket1);
		entityManager.persist(ticket2);

		assertNotNull(ticket1.getId());
		projectsRepository.findById(project1.getId()).get().getTickets().forEach(ticket -> {
			assertNotNull(ticket.getId());
		});
	}

	@Test
	public void deleteTickets() {
		User user1 = new User(null, "Jeremias", "1234", null);
		Project project1 = new Project("El matat", user1);

		user1 = usersRepository.save(user1);
		project1 = projectsRepository.save(project1);

		Ticket ticket1 = project1.addTicket("Hay que hacer la API", "CON NODEEEE",user1);
		Ticket ticket2 = project1.addTicket("Hay que hacer la API 2", "CON PYTHONNN",user1);

		entityManager.persist(ticket1);
		entityManager.persist(ticket2);

		ticketsRepository.delete(ticket1);
		ticketsRepository.delete(ticket2);
		project1.removeTicket(ticket1);
		project1.removeTicket(ticket2);

		assertFalse(ticketsRepository.findAll().iterator().hasNext());
		assertEquals(0, projectsRepository.findById(project1.getId()).get().getTickets().size());
	}

	@Test
	public void deleteProject() {

		User user1 = new User(null, "Jeremias", "1234", null);
		Project project1 = new Project("El matat", user1);

		user1 = usersRepository.save(user1);
		project1 = projectsRepository.save(project1);

		Ticket ticket1 = project1.addTicket("Hay que hacer la API", "CON NODEEEE", user1);
		Ticket ticket2 = project1.addTicket("Hay que hacer la API 2", "CON PYTHONNN", user1);

		entityManager.persist(ticket1);
		entityManager.persist(ticket2);

		projectsRepository.delete(project1);

		assertFalse(ticketsRepository.findAll().iterator().hasNext());
	}

	@Test
	public void darseDebaja() {
		User user1 = new User(null, "Jeremias", "1234", new ArrayList<>());
		User user2 = new User(null, "Joaco", "1223", new ArrayList<>());

		Project project1 = new Project("El matat", user1);

		user1 = usersRepository.save(user1);
		user2 = usersRepository.save(user2);
		project1 = projectsRepository.save(project1);

		Ticket ticket1 = project1.addTicket("Hay que hacer la API", "CON NODEEEE",user1);
		Ticket ticket2 = project1.addTicket("Hay que hacer la API 2", "CON PYTHONNN",user1);

		project1.addMember(user2);
		projectsRepository.save(project1);

		project1.removeMember(user2);
		projectsRepository.save(project1);

		Project finalProject = project1;
		usersRepository.findById(user2.getId()).get().getProjects().forEach(project -> {
			if (project == finalProject) {
				fail();
			}
		});

		ticket1 = ticketsRepository.save(ticket1);
		ticket2 = ticketsRepository.save(ticket2);
	}
}