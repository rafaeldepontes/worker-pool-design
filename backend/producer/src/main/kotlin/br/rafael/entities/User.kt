package br.rafael.entities

import br.rafael.converters.DateSerializer
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import kotlinx.serialization.Serializable
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Serializable
@Table(name = "users")
class User(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(nullable = false)
    var username: String,

    @Column(nullable = false)
    var age: Int,

    @Column(
        name = "created_at",
        insertable = false,
        updatable = false
    )
    @Serializable(with = DateSerializer::class)
    var createdAt: LocalDateTime? = null
) {
    protected constructor() : this(
        null,
        "",
        0,
        null
    )
}