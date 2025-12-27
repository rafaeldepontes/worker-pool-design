package br.rafael.service

import br.rafael.models.MessageReq
import br.rafael.models.UserDTO

interface UserService {
    fun get(id: Long): UserDTO
    fun getAll(): List<UserDTO>
    fun action(msg: MessageReq): Unit
}