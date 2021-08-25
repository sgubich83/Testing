package com.sgubich.repository;


import com.sgubich.dao.WalletEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface WalletRepository extends JpaRepository<WalletEntity, Long>
{
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update WalletEntity wt set wt.name = :name where wt.id = :id")
    Integer updateNameById(@Param("name") String name, @Param("id") Long id);


    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update WalletEntity wt set wt.value = wt.value + :value where wt.id = :id")
    Integer increaseValueById(@Param("value") Double value, @Param("id") Long id);


    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update WalletEntity wt set wt.value = wt.value - :value where wt.id = :id")
    Integer decreaseValueById(@Param("value") Double value, @Param("id") Long id);


    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("delete from WalletEntity wt where wt.id = :id")
    Integer deleteWalletEntityById(@Param("id") Long id);
}
