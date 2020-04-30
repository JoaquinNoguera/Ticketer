package com.lambda.ticketer.tickets;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@Getter @Setter
public class InputTicket {

    @Size(max = 140, message = "El encabezado de un ticket no puede tener mas de 140 caracteres")
    @NotNull(message = "El valor no puede ser nulo")
    @NotBlank(message = "El valor no puede ser vacio")
    @JsonProperty("header")
    private String header;

    @NotNull(message = "El valor no puede ser nulo")
    @JsonProperty("body")
    private String body;
}
