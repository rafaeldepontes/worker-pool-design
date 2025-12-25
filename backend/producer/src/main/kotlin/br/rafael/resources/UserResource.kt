package br.rafael.resources

import br.rafael.entities.User
import br.rafael.service.UserService
import br.rafael.service.impl.UserServiceImpl
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.NotFoundException
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
    fun getUsers() : List<User> {
        return service.getAll()
    }

    @GET
    @Path("{id}")
    fun getUser(@PathParam("id") id: Long) : User {
        return service.get(id)
    }
}