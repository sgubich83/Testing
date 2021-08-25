package com.sgubich.common;


import com.fasterxml.jackson.annotation.JsonValue;


public interface ErrorCode
{
    @JsonValue
    String getCode();
}
