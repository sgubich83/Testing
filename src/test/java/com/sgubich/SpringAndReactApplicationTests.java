package com.sgubich;


import com.sgubich.api.WalletResponse;
import com.sgubich.common.Result;
import com.sgubich.dao.WalletEntity;
import com.sgubich.repository.WalletRepository;
import com.sgubich.service.WalletService;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SpringAndReactApplicationTests
{

    @MockBean
    Controller controller;

    @Autowired
    WalletService walletService;

    @MockBean
    private WalletRepository walletRepository;

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void testGetWalletByIdMockMvc() throws Exception
    {
        WalletResponse walletResponse = new WalletResponse(1L, "Wallet", 0d);
        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setId(1L);
        walletEntity.setName("Wallet");
        walletEntity.setValue(0d);
        Mockito.when(walletRepository.getOne(1L)).thenReturn(walletEntity);
        Mockito.when(walletService.getWallet(1L)).thenReturn(Result.success(walletResponse));
        Mockito.when(controller.getWallet(1L)).thenReturn(Result.success(walletResponse));

        mockMvc.perform(get("/wallet/{id}", 1)
                .header("Authorization", "Bearer session_hash_token"))
                .andExpect(jsonPath("$.result.id", is(1)))
                .andExpect(jsonPath("$.result.name", Matchers.equalTo("Wallet")));

    }

}
