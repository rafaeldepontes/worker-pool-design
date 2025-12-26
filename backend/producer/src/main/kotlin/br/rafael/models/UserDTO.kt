package br.rafael.models

import kotlinx.serialization.Serializable

@Serializable
class UserDTO(
    val id: Long,
    val username: String,
    val age: Int
) {
}