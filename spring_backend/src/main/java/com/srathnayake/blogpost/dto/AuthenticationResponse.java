package com.srathnayake.blogpost.dto;
import lombok.*;

/**
 * Created by snbrathnayake on 3/14/2020
 **/

@Data
@AllArgsConstructor
public class AuthenticationResponse {
    private String authenticationToken;
    private String username;

//    public AuthenticationResponse(String authenticationToken, String username) {
//        this.authenticationToken = authenticationToken;
//        this.username = username;
//    }
}