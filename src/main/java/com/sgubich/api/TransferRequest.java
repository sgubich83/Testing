package com.sgubich.api;


import lombok.Data;


@Data
public class TransferRequest
{
    private Long fromWalletId;

    private Long toWalletId;

    private Double value;
}
