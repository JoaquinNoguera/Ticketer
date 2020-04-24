package com.lambda.ticketer.exceptions;

import lombok.Getter;

@Getter
public class CustomValidationException extends Exception {
    final String field;

    public CustomValidationException(String message, String field) {
        super(message);
        this.field = field;
    }
}
