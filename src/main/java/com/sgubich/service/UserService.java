package com.sgubich.service;


import java.util.Date;
import java.util.Optional;

import com.sgubich.api.AuthError;
import com.sgubich.api.AuthResponse;
import com.sgubich.common.Result;
import com.sgubich.dao.UserEntity;
import com.sgubich.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService
{

    @Autowired
    private UserRepository userRepository;


    public Result<AuthResponse, AuthError> findByLoginAndPassword(String login, String password)
    {
        Optional<UserEntity> userEntity = userRepository.findByLoginAndPassword(login, password);
        if (userEntity.isPresent())
        {
            String token = getJWTToken(login);
            return Result.success(new AuthResponse(token));
        }

        return Result.failed(AuthError.WRONG_AUTH);
    }


    private String getJWTToken(String username)
    {
        String secretKey = "mySecretKey";

        String token = Jwts
                .builder()
                .setId("softtekJWT")
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 600000))
                .signWith(SignatureAlgorithm.HS512,
                        secretKey.getBytes()).compact();

        return "Bearer " + token;
    }

}
