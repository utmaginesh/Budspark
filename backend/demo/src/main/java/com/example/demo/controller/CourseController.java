package com.example.demo.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CourseForm;
import com.example.demo.dto.FilterCourseForm;
import com.example.demo.model.Course;
import com.example.demo.model.YearCourse;
import com.example.demo.repository.YearCourseRepository;
import com.example.demo.service.CourseService;

@RestController
@CrossOrigin(origins = "https://budsparkportal.netlify.app")
@RequestMapping("/api")
public class CourseController {
    @Autowired
    private YearCourseRepository yearCourse;

    @Autowired 
    private CourseService courseService;


    @PostMapping("/course/post")
    public void saveSemesterCourses() {
        // Second Year, Civil Engineering Department
        YearCourse itSecondYearCourses = new YearCourse();
        itSecondYearCourses.setYear("second");
        itSecondYearCourses.setDepartment("Information Technology");
        itSecondYearCourses.setOddSemCourses(Arrays.asList(
            new Course(null, "24IT321", "Data Structures", 4, 5),
            new Course(null, "24IT322", "Database Management Systems", 4, 5),
            new Course(null, "24IT323", "Operating Systems", 4, 5),
            new Course(null, "24IT324", "Computer Networks", 4, 5),
            new Course(null, "24IT325", "Software Engineering", 4, 5),
            new Course(null, "24IT326", "Mathematics VII", 4, 5)
        ));
        itSecondYearCourses.setEvenSemCourses(Arrays.asList(
            new Course(null, "24IT401", "Web Technologies", 4, 5),
            new Course(null, "24IT402", "Machine Learning", 4, 5),
            new Course(null, "24IT403", "Information Security", 4, 5),
            new Course(null, "24IT404", "Mobile Computing", 4, 5),
            new Course(null, "24IT405", "Cloud Computing", 4, 5),
            new Course(null, "24IT406", "Mathematics VIII", 4, 5)
        ));
        yearCourse.save(itSecondYearCourses);


    }
    @GetMapping("/getoddsem")
    public ResponseEntity<List<FilterCourseForm>> getUserCourses(){
        try{
            return ResponseEntity.status(200).body(courseService.getOddSemCourses());
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }

    }
    @GetMapping("/getevensem")
    public ResponseEntity<List<FilterCourseForm>> getUserEvenCourses(){
        try{
            return ResponseEntity.status(200).body(courseService.getEvenSemCourses());
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }

    }
    @PutMapping("/updatecourse/{id}")
    public ResponseEntity<?> updateOddCourse(@RequestBody CourseForm courseForm , @PathVariable Long id){
        try{
            return ResponseEntity.status(200).body(courseService.updateOddCourse(courseForm, id));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/getoddsem/{year}/{department}")
    public ResponseEntity<List<Course>> getUserCourses(@PathVariable String year, @PathVariable String department){
        try{
            return ResponseEntity.status(200).body(courseService.getOddSemCourses(year, department));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }

    }
    @GetMapping("/getevensem/{year}/{department}")
    public ResponseEntity<List<Course>> getUserEvenCourses(@PathVariable String year, @PathVariable String department){
        try{
            return ResponseEntity.status(200).body(courseService.getEvenSemCourses(year, department));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }

    }



}
