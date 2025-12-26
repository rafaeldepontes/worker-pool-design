package br.rafael.models

import kotlinx.serialization.Serializable

@Serializable
class UserMsg(
    val id: Long,
    val username: String,
    val age: Int
) {
}