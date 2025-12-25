package br.rafael.service.impl

import br.rafael.entities.User
import br.rafael.repositories.UserRepository
import br.rafael.service.UserService
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.NotFoundException
import java.util.Collections
import java.util.stream.Collectors

@ApplicationScoped
class UserServiceImpl: UserService {

    @Inject
    lateinit var repository: UserRepository

    override fun get(id: Long): User {
        return repository.findById(id) ?: throw NotFoundException("User with id $id not found")
    }

    override fun getAll(): List<User> {
        val pUsers = repository.findAll()

        if (pUsers.firstResult() == null) {
            return ArrayList()
        }

        return pUsers
            .stream()
            .map { user -> user as User }
            .collect(Collectors.toList())
    }

}