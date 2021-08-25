package com.sgubich;


import com.sgubich.api.AuthError;
import com.sgubich.api.AuthRequest;
import com.sgubich.api.AuthResponse;
import com.sgubich.api.TransferRequest;
import com.sgubich.api.WalletError;
import com.sgubich.api.WalletRequest;
import com.sgubich.api.WalletResponse;
import com.sgubich.common.Result;
import com.sgubich.service.UserService;
import com.sgubich.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class Controller
{

    @Autowired
    WalletService walletService;

    @Autowired
    UserService userService;


    @PostMapping("/auth")
    public Result<AuthResponse, AuthError> auth(@RequestBody AuthRequest request)
    {
        return userService.findByLoginAndPassword(request.getLogin(), request.getPassword());
    }


    @PostMapping("/wallet")
    public Result<WalletResponse, WalletError> createWallet(@RequestBody final WalletRequest request)
    {
        return walletService.saveOrUpdate(request);
    }


    @GetMapping("/wallets")
    public List<WalletResponse> getWallets()
    {
        return walletService.getWallets();
    }


    @GetMapping(value = "/wallet/{id}")
    public Result<WalletResponse, WalletError> getWallet(@PathVariable final Long id)
    {
        return walletService.getWallet(id);
    }


    @DeleteMapping(value = "/wallet/{id}")
    public Result<WalletResponse, WalletError> deleteWallet(@PathVariable final Long id)
    {
        return walletService.deleteWallet(id);
    }


    @PutMapping("/wallet")
    public Result<WalletResponse, WalletError> updateWallet(@RequestBody final WalletRequest request)
    {
        return walletService.updateNameById(request);
    }


    @PutMapping("/increase")
    public Result<WalletResponse, WalletError> increaseValue(@RequestBody final WalletRequest request)
    {
        return walletService.increaseValueById(request);
    }


    @PutMapping("/decrease")
    public Result<WalletResponse, WalletError> decreaseValue(@RequestBody final WalletRequest request)
    {
        return walletService.decreaseValueById(request);
    }


    @PostMapping("/transfer")
    public Result<WalletResponse, WalletError> transferValue(@RequestBody final TransferRequest request)
    {
        return walletService.transferValue(request);
    }
}
