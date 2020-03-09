package com.srathnayake.blogpost;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	@Value("${server.port}")
	private static String port = "8090";

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		System.out.println("server started on : "+port);
	}

}
