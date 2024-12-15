package com.example.demo.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.YearCourse;

public interface YearCourseRepository extends JpaRepository<YearCourse, Long>{
    List<YearCourse> findByYearAndDepartment(String year, String department);
}
