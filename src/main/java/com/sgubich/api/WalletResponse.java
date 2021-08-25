package com.sgubich.api;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Value;


@Value
@AllArgsConstructor
@NoArgsConstructor(force = true, access = AccessLevel.PRIVATE)
@Builder(setterPrefix = "with")
public class WalletResponse
{
    @NonNull
    Long id;

    @NonNull
    String name;

    Double value;
}
