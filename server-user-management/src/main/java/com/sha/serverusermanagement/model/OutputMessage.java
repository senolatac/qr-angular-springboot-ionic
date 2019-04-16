package com.sha.serverusermanagement.model;

import lombok.Data;

@Data
public class OutputMessage {
    private String token;
    private User user;
}
