package com.sas.repository;

import com.sas.model.Book;
import com.sas.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    @Transactional
    void deleteByBookId(Long bookId);

    List<Rating> findByBook_Id(Long id);


    boolean existsByUserIdAndBookId(Long userId, Long bookId);
}