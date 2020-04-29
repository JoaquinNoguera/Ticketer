package com.lambda.ticketer.tickets;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class TicketPatchAction {
    public enum Verb {
        TAKE, DROP, SOLVE, CHANGE
    }

    @NotNull(message = "La accion no puede ser nula")
    @JsonProperty("action")
    private TicketPatchAction.Verb verb;

    @Valid
    private InputTicket value;
}
