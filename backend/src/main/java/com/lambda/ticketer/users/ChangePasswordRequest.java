package com.lambda.ticketer.users;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class ChangePasswordRequest {
    @NotNull(message = "Debe ingresar su antigua contraseña")
    @NotBlank(message = "Debe ingresar su antigua contraseña")
    private String oldPassword;
    @NotNull(message = "Debe ingresar una nueva contraseña")
    @NotBlank(message = "Debe ingresar una nueva contraseña")
    @Size(min = 4, message = "La contraseña debe tener al menos 4 caracteres")
    private String password;
}
