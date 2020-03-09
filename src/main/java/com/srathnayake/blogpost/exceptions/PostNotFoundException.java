package com.srathnayake.blogpost.exceptions;

/**
 * Created by snbrathnayake on 3/9/2020
 **/
public class PostNotFoundException extends RuntimeException {

    public PostNotFoundException(String message) {
        super(message);
    }
}
