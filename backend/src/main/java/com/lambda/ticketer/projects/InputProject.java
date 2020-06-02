package com.lambda.ticketer.projects;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter @Setter
@NoArgsConstructor
public class InputProject {

    @Size(max = 140, message = "El nombre de un proyecto no puede tener mas de 140 caracteres")
    @NotNull(message = "El valor no puede ser nulo")
    @NotBlank(message = "El valor no puede ser vacio")
    String projectName;
}
