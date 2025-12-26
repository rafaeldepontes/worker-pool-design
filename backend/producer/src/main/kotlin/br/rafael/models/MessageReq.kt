package br.rafael.models

import kotlinx.serialization.Serializable

@Serializable
class MessageReq(
    val type: String,
    val times: Int,
    val user: UserMsg
) {
}