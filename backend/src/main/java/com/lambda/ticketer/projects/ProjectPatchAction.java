package com.lambda.ticketer.projects;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class ProjectPatchAction {
    public enum Verb {
        ADD_MEMBER, REMOVE_MEMBER, RENAME
    }

    @NotNull(message = "La accion no puede ser nula")
    @JsonProperty("action")
    private Verb verb;

    @Size(max = 140, message = "El nombre no puede tener mas de 140 caracteres")
    @NotNull(message = "El valor no puede ser nulo")
    @NotBlank(message = "El valor no puede ser vacio")
    private String value;
}
