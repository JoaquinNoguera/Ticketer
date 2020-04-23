package com.lambda.ticketer.tickets;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter @Setter
public class InputTicket {
    private String header;
    private String body;
}
