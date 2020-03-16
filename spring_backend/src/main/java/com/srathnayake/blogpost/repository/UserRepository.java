package com.srathnayake.blogpost.repository;

import com.srathnayake.blogpost.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by snbrathnayake on 3/8/2020
 **/
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
