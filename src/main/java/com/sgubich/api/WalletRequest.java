package com.sgubich.api;


import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class WalletRequest
{
    private Long id;

    private String name;

    private Double value;
}
