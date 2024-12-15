package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.YearFee;
import java.util.List;


public interface YearFeeRepository extends JpaRepository<YearFee, Long>{
    List<YearFee> findByYear(String year);
}
