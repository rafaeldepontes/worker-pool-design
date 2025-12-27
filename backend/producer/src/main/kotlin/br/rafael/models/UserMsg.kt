package br.rafael.models

import kotlinx.serialization.Serializable

@Serializable
class UserMsg(
    val id: Long? = null,
    val username: String? = null,
    val age: Int? = null,
) {
}