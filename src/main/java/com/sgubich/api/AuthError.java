package com.sgubich.api;


import com.sgubich.common.ErrorCode;


public enum AuthError implements ErrorCode
{
    WRONG_AUTH("Wrong login or password");

    private final String code;


    AuthError(final String code)
    {
        this.code = code;
    }


    @Override
    public String getCode()
    {
        return code;
    }
}
