package com.srathnayake.blogpost.controllers;

import com.srathnayake.blogpost.dto.PostRequest;
import com.srathnayake.blogpost.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by snbrathnayake on 3/9/2020
 **/
@RestController
//@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity createPost(@RequestBody PostRequest postRequest) {
        postService.createPost(postRequest);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostRequest>> getPosts() {
        return new ResponseEntity(postService.showAllPosts() , HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PostRequest> getSinglePosts(@PathVariable @RequestBody Long id) {
        return new ResponseEntity(postService.readSinglePosts(id) , HttpStatus.OK);
    }
}
