package com.srathnayake.blogpost.security;

import com.srathnayake.blogpost.exceptions.SpringBlogException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.*;
import java.security.cert.CertificateException;

/**
 * Created by snbrathnayake on 3/8/2020
 **/

@Service
public class JwtProvider {

    // private Key key;
    private KeyStore keyStore;

    /**
     * when every time the server start-up then new key will generates.
     * Asymmetric Encryption using java-keystore (jwt =>)
     * java-keystore contains a public_key and private_key
     * when we generate the Token : private_key signToken public_key to validate Token
     **/
    @PostConstruct
    public void init() {
        // key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        try {
            keyStore = KeyStore.getInstance("JKS");
            InputStream resource = getClass().getResourceAsStream("/springblog.jks");
            keyStore.load(resource, "secret".toCharArray());
        } catch (KeyStoreException | IOException | NoSuchAlgorithmException | CertificateException e) {
            throw new SpringBlogException("Exception occurred while loading the keystore");
        }

    }

    public String generateToken(Authentication authentication) {
        User principal = (User) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(principal.getUsername())
                .signWith(getPrivateKey()) // .signWith(key)
                .compact();
    }

    private PrivateKey getPrivateKey() {
        try {
            return (PrivateKey) keyStore.getKey("springblog", "secret".toCharArray());
        } catch (KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e) {
            throw new SpringBlogException("Exception occurred while retrieving private_key from the keystore");
        }
    }

    public boolean validateToken(String jwt) {
        Jwts.parser().setSigningKey(getPublicKey()).parseClaimsJws(jwt); // Jwts.parser().setSigningKey(key).parseClaimsJws(jwt);
        return true;
    }

    private PublicKey getPublicKey() {
        try {
           return keyStore.getCertificate("springblog").getPublicKey();
        } catch (KeyStoreException e) {
            throw new SpringBlogException("Exception occurred while retrieving public_key from the keystore");
        }
    }

    public String getUsernameFromJWT(String jwtToken) {
        Claims claims = Jwts.parser()
                .setSigningKey(getPublicKey()) // key
                .parseClaimsJws(jwtToken)
                .getBody();

        return claims.getSubject();
    }
}
