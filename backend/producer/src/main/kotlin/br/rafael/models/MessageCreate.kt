package br.rafael.models

import kotlinx.serialization.Serializable

@Serializable
class MessageCreate(
    val type: String,
    val data: UserMsg
) {
}