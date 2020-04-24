package com.lambda.ticketer.login;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    @NotNull(message = "Debe ingresar el nombre de usuario")
    @NotBlank(message = "Debe ingresar el nombre de usuario")
    private String name;
    @NotNull(message = "Debe ingresar la contraseña")
    @NotBlank(message = "Debe ingresar la contraseña")
    private String password;

}
