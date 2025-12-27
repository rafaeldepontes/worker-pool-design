package br.rafael.service.impl

import br.rafael.models.MessageCreate
import br.rafael.models.MessageDelete
import br.rafael.models.MessageReq
import br.rafael.models.MessageUpdate
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

const val CREATE = "create"
const val UPDATE = "update"
const val DELETE = "delete"

@ApplicationScoped
class UserServiceImpl: UserService {

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

        when (msg.type) {
            CREATE -> publishCreate(msg)
            UPDATE -> publishUpdate(msg)
            DELETE -> publishDelete(msg)
        }
    }

    fun validateMessage(msg: MessageReq) {
        requireNotNull(msg.type) { "Type is required" }

        if (msg.type == CREATE) {
            requireNotNull(msg.times) { "Times is required" }
        }

        if (msg.type == UPDATE || msg.type == DELETE) {
            requireNotNull(msg.ids) { "Id(s) is(are) required" }
        }

        if (msg.type == UPDATE || msg.type == CREATE) {
            requireNotNull(msg.user) { "User is required" }
            requireNotNull(msg.user.username) { "Username is required" }
            requireNotNull(msg.user.age) { "Age is required" }
        }
    }

    private fun publishCreate(msg: MessageReq) {
        userProducer.publish(
            MessageCreate(
                type = msg.type,
                data = UserMsg(
                    age = msg.user?.age,
                    username = msg.user?.username
                ),
            ),
            MessageCreate.serializer()
        )
    }

    private fun publishUpdate(msg: MessageReq) {
        userProducer.publish(
            MessageUpdate(
                type = msg.type,
                ids = msg.ids,
                data = UserMsg(
                    age = msg.user?.age,
                    username = msg.user?.username
                ),
            ),
            MessageUpdate.serializer()
        )
    }
    private fun publishDelete(msg: MessageReq) {
        userProducer.publish(
            MessageDelete(
                type = msg.type,
                ids = msg.ids,
            ),
            MessageDelete.serializer()
        )
    }

}