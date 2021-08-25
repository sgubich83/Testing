package com.sgubich.api;


import com.sgubich.common.ErrorCode;


public enum WalletError implements ErrorCode
{
    WRONG_GET_WALLET("Error while get wallet"),
    WRONG_ADD_WALLET("Error while adding wallet"),
    WRONG_UPDATE_WALLET("Error while update wallet"),
    WRONG_TRANSFER_WALLET("Error while transfer value"),
    WRONG_DELETE_WALLET("Error while delete wallet"),
    WRONG_EDIT_WALLET("Error while edit wallet");

    private final String code;


    WalletError(final String code)
    {
        this.code = code;
    }


    @Override
    public String getCode()
    {
        return code;
    }
}
