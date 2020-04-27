package com.lambda.ticketer.projects;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter @Setter
@NoArgsConstructor
public class InputProject {


    @NotNull(message = "El valor no puede ser nulo")
    @NotBlank(message = "El valor no puede ser vacio")
    String projectName;
}
