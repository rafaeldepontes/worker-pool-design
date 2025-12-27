package br.rafael.models

import kotlinx.serialization.Serializable

@Serializable
class MessageUpdate(
    val type: String,
    val ids: List<Long>,
    val data: UserMsg
)  {
}