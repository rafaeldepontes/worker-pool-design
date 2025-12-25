package br.rafael.entities

import br.rafael.converters.DateSerializer
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
@Entity(name = "users")
class User {
    @Id
    @GeneratedValue
    var id: Long? = null;
    lateinit var username: String
    var age: Int? = null;
    @Serializable(with = DateSerializer::class)
    lateinit var createdAt: LocalDate;
}