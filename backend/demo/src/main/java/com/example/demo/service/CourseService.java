package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CourseForm;
import com.example.demo.dto.FilterCourseForm;
import com.example.demo.model.Course;
import com.example.demo.model.YearCourse;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.YearCourseRepository;

@Service
public class CourseService {
    @Autowired
    private YearCourseRepository yearCourseRepository;

    @Autowired
    private CourseRepository courseRepository;
    
    public List<FilterCourseForm> getOddSemCourses(){
        List<YearCourse> yearCourse = yearCourseRepository.findAll();
        List<FilterCourseForm> l = new ArrayList<>();
        for(YearCourse yCourse : yearCourse){
            List<Course> co = yCourse.getOddSemCourses();
            List<FilterCourseForm> f = new ArrayList<>();
            for(Course c : co){
                FilterCourseForm fp = new FilterCourseForm(c.getId(), c.getCode(), c.getName(), c.getCredits(), c.getContactHrs(), yCourse.getYear(), yCourse.getDepartment());
                f.add(fp);
            }
            l.addAll(f);
        }
        return l;
    }

    public List<FilterCourseForm> getEvenSemCourses(){
        List<YearCourse> yearCourse = yearCourseRepository.findAll();
        List<FilterCourseForm> l = new ArrayList<>();
        for(YearCourse yCourse : yearCourse){
            List<Course> co = yCourse.getEvenSemCourses();
            List<FilterCourseForm> f = new ArrayList<>();
            for(Course c : co){
                FilterCourseForm fp = new FilterCourseForm(c.getId(), c.getCode(), c.getName(), c.getCredits(), c.getContactHrs(), yCourse.getYear(), yCourse.getDepartment());
                f.add(fp);
            }
            l.addAll(f);
        }
        return l;
    }
    public Course updateOddCourse(CourseForm course, Long id){
        Course course2 = courseRepository.findById(id).orElse(null);
        course2.setCode(course.getCode());
        course2.setName(course.getName());
        course2.setCredits(course.getCredits());
        course2.setContactHrs(course.getContactHrs());
        return courseRepository.save(course2);
    }

    public List<Course> getOddSemCourses(String year, String department){
        YearCourse yearCourse = yearCourseRepository.findByYearAndDepartment(year, department).get(0);
        return yearCourse.getOddSemCourses();
    }

    public List<Course> getEvenSemCourses(String year, String department){
        YearCourse yearCourse = yearCourseRepository.findByYearAndDepartment(year, department).get(0);
        return yearCourse.getEvenSemCourses();
    }

}
