package com.lambda.ticketer.exceptions;

import com.lambda.ticketer.tickets.Ticket;
import org.springframework.core.MethodParameter;
import org.springframework.data.repository.query.Parameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ControllerHandlerException {


    @ExceptionHandler({CustomException.class})
    public ResponseEntity<ExceptionResponse> customExceptionHandler(CustomException exception){
        return new ResponseEntity<ExceptionResponse>(
                (new ExceptionResponse(exception.getMessage())), HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<ExceptionResponse> entityNotFoundExceptionHandler(
            EntityNotFoundException exception
    ){
        return new ResponseEntity<ExceptionResponse>(
                (new ExceptionResponse(exception.getMessage())), HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler({UsernameNotFoundException.class})
    public ResponseEntity<ExceptionResponse> usernameNotFoundExceptionHandler(
            UsernameNotFoundException exception
    ){
        return new ResponseEntity<ExceptionResponse>(
                (new ExceptionResponse(exception.getMessage())), HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ExceptionResponse> exceptionHandler(Exception exception){
        return new ResponseEntity<ExceptionResponse>(
                (new ExceptionResponse("A ocurrido un error inesperado")), HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler({BadCredentialsException.class})
    public ResponseEntity<ExceptionResponse> badCredentialExceptionHandler(){
        return new ResponseEntity<ExceptionResponse>(
                (new ExceptionResponse("Usuario o Contraseña Incorrectos")), HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ExceptionResponse> accessDeniedExceptionHandler(){
        return new ResponseEntity<ExceptionResponse>(
                (new ExceptionResponse("El usuario no tiene permisos")), HttpStatus.FORBIDDEN
        );
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<List<FormExceptionResponse>> MethodArgumentNotValidExceptionExceptionHandler(
            MethodArgumentNotValidException exception
    ){
            List<FormExceptionResponse> errors = new ArrayList<>();

            for (FieldError error : exception.getBindingResult().getFieldErrors()) {
                errors.add(new FormExceptionResponse(error.getDefaultMessage(),error.getField()));
            }
            for (ObjectError error : exception.getBindingResult().getGlobalErrors()) {
                errors.add(new FormExceptionResponse(error.getDefaultMessage(),error.getObjectName()));
            }

            return new ResponseEntity(errors,HttpStatus.BAD_REQUEST);
    }





}
