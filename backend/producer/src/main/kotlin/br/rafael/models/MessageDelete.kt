package br.rafael.models

import kotlinx.serialization.Serializable

@Serializable
class MessageDelete(
    val type: String,
    val ids: List<Long>,
) {
}