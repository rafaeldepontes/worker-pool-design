package br.rafael.repositories

import br.rafael.entities.User
import io.quarkus.hibernate.orm.panache.kotlin.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class UserRepository: PanacheRepository<User> {
    fun byId(id: Long) = find("id", id).firstResult()
}