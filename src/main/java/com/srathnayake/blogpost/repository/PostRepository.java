package com.srathnayake.blogpost.repository;

import com.srathnayake.blogpost.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by snbrathnayake on 3/9/2020
 **/
public interface PostRepository extends JpaRepository<Post, Long> {
}
