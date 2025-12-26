package br.rafael.service.impl

import br.rafael.models.Message
import br.rafael.models.MessageReq
import br.rafael.models.UserDTO
import br.rafael.models.UserMsg
import br.rafael.producers.UserProducer
import br.rafael.repositories.UserRepository
import br.rafael.service.UserService
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.NotFoundException
import org.eclipse.microprofile.reactive.messaging.Channel
import org.eclipse.microprofile.reactive.messaging.Emitter
import java.util.stream.Collectors

@ApplicationScoped
class UserServiceImpl: UserService {

    val CREATE = "create"
    val UPDATE = "update"
    val DELETE = "delete"

    @Inject
    lateinit var repository: UserRepository

    @Inject
    lateinit var userProducer: UserProducer

    override fun get(id: Long): UserDTO {
        val user = repository.findById(id) ?: throw NotFoundException("User with id $id not found")

        return UserDTO(
            id = user.id ?: throw NotFoundException("User id is null"),
            age = user.age,
            username = user.username,
        )
    }

    override fun getAll(): List<UserDTO> {
        val pUsers = repository.findAll()

        if (pUsers.firstResult() == null) {
            return ArrayList()
        }

        return pUsers
            .stream()
            .map { user -> UserDTO(
                id = user.id ?: throw NotFoundException("User id is null"),
                age = user.age,
                username = user.username,
            ) }
            .collect(Collectors.toList())
    }

    override fun action(msg: MessageReq): Unit {
        validateMessage(msg)
        for (time in 1..msg.times) {
            userProducer.publish(
                Message(
                    type = msg.type,
                    user = UserMsg(
                        id = msg.user.id,
                        age = msg.user.age,
                        username = msg.user.username
                    ),
                )
            )
        }
    }

    fun validateMessage(msg: MessageReq) {
        requireNotNull(msg.type) { "Type is required" }
        requireNotNull(msg.times) { "Time is required" }

        if (msg.type == UPDATE || msg.type == DELETE) {
            requireNotNull(msg.user.id) { "Id is required" }
        }

        if (msg.type == UPDATE || msg.type == CREATE) {
            requireNotNull(msg.user) { "User is required" }
            requireNotNull(msg.user.username) { "Username is required" }
            requireNotNull(msg.user.age) { "Age is required" }
        }
    }
}