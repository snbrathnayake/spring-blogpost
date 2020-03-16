package com.srathnayake.blogpost.services;

import com.srathnayake.blogpost.dto.PostRequest;
import com.srathnayake.blogpost.exceptions.PostNotFoundException;
import com.srathnayake.blogpost.models.Post;
import com.srathnayake.blogpost.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

/**
 * Created by snbrathnayake on 3/9/2020
 **/

@Service
public class PostService {

    @Autowired
    private AuthService authService;

    @Autowired
    private PostRepository postRepository;

    public void createPost(PostRequest postRequest) {
        Post post = mapFromDtoToPost(postRequest);
        postRepository.save(post);
    }

    public List<PostRequest> showAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(this::mapFromPostToDto).collect(toList());
    }

    public PostRequest readSinglePosts(Long id) {
        Post post = postRepository.findById(id).orElseThrow(()-> new PostNotFoundException("For id " + id));
        return mapFromPostToDto(post);
    }

    private Post mapFromDtoToPost(PostRequest reqDto) {
        Post post = new Post();
        User loggedInUser = authService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("No User logged in"));

        post.setTitle(reqDto.getTitle());
        post.setContent(reqDto.getContent());
        post.setUsername(loggedInUser.getUsername());
        post.setCreatedOn(Instant.now());
        post.setUpdatedOn(Instant.now());

        return post;
    }

    // PostRequest and PostResponse are equal
    // TODO update to PostRequest -> PostDto class
    // convert Post Object(pojo) into PostRequest(DTO)
    private PostRequest mapFromPostToDto(Post post) {

        PostRequest postDto = new PostRequest();

        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setUsername(post.getUsername());

        return postDto;
    }

}
