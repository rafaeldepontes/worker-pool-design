package br.rafael.service

import br.rafael.entities.User

interface UserService {
    fun get(id: Long): User
    fun getAll(): List<User>
}