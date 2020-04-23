package com.lambda.ticketer.tickets;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class TicketPatchAction {
    public enum Verb {
        TAKE, DROP, SOLVED,CHANGE
    }

    @NotNull(message = "La accion no puede ser nula")
    @JsonProperty("action")
    private TicketPatchAction.Verb verb;

    private InputTicket value;
}
