package br.rafael.producers

import io.smallrye.reactive.messaging.rabbitmq.OutgoingRabbitMQMetadata
import jakarta.enterprise.context.ApplicationScoped
import kotlinx.serialization.KSerializer
import kotlinx.serialization.json.Json
import org.eclipse.microprofile.reactive.messaging.Channel
import org.eclipse.microprofile.reactive.messaging.Emitter
import org.eclipse.microprofile.reactive.messaging.Metadata

@ApplicationScoped
class UserProducer {

    @Channel("processes_queue")
    lateinit var emitter: Emitter<ByteArray>

    fun <T> publish(msg: T, serializer: KSerializer<T>) {
        val body = Json.encodeToString(serializer, msg).toByteArray()

        val metadata = OutgoingRabbitMQMetadata
            .builder()
            .withRoutingKey("")
            .build()

        val message = org.eclipse.microprofile.reactive.messaging.Message
            .of(body, Metadata.of(metadata))

        emitter.send(message)
    }

}