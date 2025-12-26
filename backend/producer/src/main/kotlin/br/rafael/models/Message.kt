package br.rafael.models

import kotlinx.serialization.Serializable

@Serializable
class Message(
    val type: String,
    val user: UserMsg
) {
}