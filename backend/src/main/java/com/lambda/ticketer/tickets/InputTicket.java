package com.lambda.ticketer.tickets;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@Getter @Setter
public class InputTicket {

    @NotNull(message = "El valor no puede ser nulo")
    @NotBlank(message = "El valor no puede ser vacio")
    private String header;

    @NotNull(message = "El valor no puede ser nulo")
    @NotBlank(message = "El valor no puede ser vacio")
    private String body;
}
