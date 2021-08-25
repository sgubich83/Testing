package com.sgubich.service;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.sgubich.api.TransferRequest;
import com.sgubich.api.WalletError;
import com.sgubich.api.WalletRequest;
import com.sgubich.api.WalletResponse;
import com.sgubich.common.Result;
import com.sgubich.dao.WalletEntity;
import com.sgubich.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class WalletService
{
    @Autowired
    private WalletRepository walletRepository;


    public Result<WalletResponse, WalletError> saveOrUpdate(WalletRequest request)
    {
        WalletEntity walletEntity = walletRepository.save(this.requestConvertToEntity(request));
        if (walletEntity.getId() != null)
        {
            return Result.success(this.walletEntityConvertToWalletResponse(walletEntity));
        }
        return Result.failed(WalletError.WRONG_ADD_WALLET);
    }


    public Result<WalletResponse, WalletError> updateNameById(WalletRequest request)
    {
        Integer result = walletRepository.updateNameById(request.getName(), request.getId());
        if (result != null)
        {
            return Result.success();
        }
        return Result.failed(WalletError.WRONG_UPDATE_WALLET);
    }


    public Result<WalletResponse, WalletError> increaseValueById(WalletRequest request)
    {
        Integer result = walletRepository.increaseValueById(request.getValue(), request.getId());
        if (result != null)
        {
            return Result.success();
        }
        return Result.failed(WalletError.WRONG_UPDATE_WALLET);
    }


    public Result<WalletResponse, WalletError> decreaseValueById(WalletRequest request)
    {
        Integer result = walletRepository.decreaseValueById(request.getValue(), request.getId());
        if (result != null)
        {
            return Result.success();
        }
        return Result.failed(WalletError.WRONG_UPDATE_WALLET);
    }


    public Result<WalletResponse, WalletError> transferValue(TransferRequest request)
    {
        Integer increaseResult = walletRepository.increaseValueById(request.getValue(), request.getToWalletId());
        Integer decreaseResult = walletRepository.decreaseValueById(request.getValue(), request.getFromWalletId());
        if (increaseResult != null && decreaseResult != null)
        {
            return Result.success();
        }
        return Result.failed(WalletError.WRONG_TRANSFER_WALLET);
    }


    public Result<WalletResponse, WalletError> getWallet(Long id)
    {
        WalletEntity walletEntity = walletRepository.getOne(id);
        if (walletEntity.getId() != null)
        {
            return Result.success(this.walletEntityConvertToWalletResponse(walletEntity));
        }
        return Result.failed(WalletError.WRONG_GET_WALLET);
    }


    public Result<WalletResponse, WalletError> deleteWallet(Long id)
    {
        Integer result = walletRepository.deleteWalletEntityById(id);
        if (result != null)
        {
            return Result.success();
        }
        return Result.failed(WalletError.WRONG_DELETE_WALLET);
    }


    public List<WalletResponse> getWallets()
    {
        List<WalletEntity> walletEntityList = new ArrayList<>(walletRepository.findAll());

        return walletEntityList.stream()
                .map(this::walletEntityConvertToWalletResponse)
                .collect(Collectors.toList());
    }


    private WalletEntity requestConvertToEntity(WalletRequest request)
    {
        final WalletEntity entity = new WalletEntity();
        entity.setName(request.getName());
        entity.setValue(request.getValue());
        return entity;
    }


    private WalletResponse walletEntityConvertToWalletResponse(WalletEntity walletEntity)
    {
        return WalletResponse.builder()
                .withId(walletEntity.getId())
                .withName(walletEntity.getName())
                .withValue(walletEntity.getValue())
                .build();
    }
}
