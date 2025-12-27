package br.rafael.resources

import br.rafael.models.MessageReq
import br.rafael.models.UserDTO
import br.rafael.service.UserService
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.PathParam
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType

@Path("/api/v1/users")
@Produces(MediaType.APPLICATION_JSON)
class UserResource {

    @Inject
    lateinit var service: UserService

    @GET
    fun getUsers() : List<UserDTO> {
        return service.getAll()
    }

    @GET
    @Path("{id}")
    fun getUser(@PathParam("id") id: Long) : UserDTO {
        return service.get(id)
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    fun doAction(msg: MessageReq) {
        service.action(msg)
    }
}