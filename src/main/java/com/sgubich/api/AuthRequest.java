package com.sgubich.api;


import lombok.Data;


@Data
public class AuthRequest
{
    private String login;

    private String password;
}
