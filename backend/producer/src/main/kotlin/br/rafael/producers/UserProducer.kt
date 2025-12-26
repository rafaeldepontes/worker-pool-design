package br.rafael.producers

import br.rafael.models.Message
import io.smallrye.reactive.messaging.rabbitmq.OutgoingRabbitMQMetadata
import jakarta.enterprise.context.ApplicationScoped
import kotlinx.serialization.json.Json
import org.eclipse.microprofile.reactive.messaging.Channel
import org.eclipse.microprofile.reactive.messaging.Emitter
import org.eclipse.microprofile.reactive.messaging.Metadata

@ApplicationScoped
class UserProducer {

    @Channel("processes_queue")
    lateinit var emitter: Emitter<ByteArray>

    fun publish(msg: Message) {
        val body = Json
            .encodeToString(msg)
            .toByteArray()

        val metadata = OutgoingRabbitMQMetadata
            .builder()
            .withRoutingKey("")
            .build()

        val msg = org.eclipse.microprofile.reactive.messaging.Message.of(body, Metadata.of(metadata))
        print("MESSAGE $msg\n")
        emitter.send(msg)
    }
}