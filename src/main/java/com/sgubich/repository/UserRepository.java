package com.sgubich.repository;


import java.util.Optional;

import com.sgubich.dao.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>
{
    Optional<UserEntity> findByLoginAndPassword(String login, String password);

}
