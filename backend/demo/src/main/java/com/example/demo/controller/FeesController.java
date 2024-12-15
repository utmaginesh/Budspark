package com.example.demo.controller;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CollegeForm;
import com.example.demo.dto.HostelForm;
import com.example.demo.model.CollegeFee;
import com.example.demo.model.HostelFee;
import com.example.demo.model.YearFee;
import com.example.demo.repository.YearFeeRepository;
import com.example.demo.service.FeesService;

@RestController
@RequestMapping("/api")
public class FeesController {
    @Autowired
    private YearFeeRepository yearFeeRepository;

    @Autowired
    private FeesService feesService;

    @PostMapping("/fees/post")
    public void saveSemesterCourses() {
        // Fourth Year Fees
        YearFee fourthYearFee = new YearFee();
        fourthYearFee.setYear("fourth");
        fourthYearFee.setCollegeFees(Arrays.asList(
            new CollegeFee(null, "Computer Science and Engineering", new BigDecimal("56000"), new BigDecimal("11500"), new BigDecimal("67500")),
            new CollegeFee(null, "Information Technology", new BigDecimal("56000"), new BigDecimal("11500"), new BigDecimal("67500")),
            new CollegeFee(null, "Mechanical Engineering", new BigDecimal("56000"), new BigDecimal("11500"), new BigDecimal("67500")),
            new CollegeFee(null, "Civil Engineering", new BigDecimal("56000"), new BigDecimal("11500"), new BigDecimal("67500")),
            new CollegeFee(null, "Electrical Engineering", new BigDecimal("56000"), new BigDecimal("11500"), new BigDecimal("67500"))
        ));
        fourthYearFee.setHostelFees(Arrays.asList(
            new HostelFee(null, "A block", new BigDecimal("23000"), new BigDecimal("16500"), new BigDecimal("39500")),
            new HostelFee(null, "B block", new BigDecimal("23000"), new BigDecimal("16500"), new BigDecimal("39500")),
            new HostelFee(null, "C block", new BigDecimal("23000"), new BigDecimal("16500"), new BigDecimal("39500")),
            new HostelFee(null, "D block", new BigDecimal("23000"), new BigDecimal("16500"), new BigDecimal("39500")),
            new HostelFee(null, "E block", new BigDecimal("23000"), new BigDecimal("16500"), new BigDecimal("39500")),
            new HostelFee(null, "F block", new BigDecimal("23000"), new BigDecimal("16500"), new BigDecimal("39500"))
        ));

        yearFeeRepository.save(fourthYearFee);

    }
    @GetMapping("/get")
    public List<YearFee> checkget(){
        return yearFeeRepository.findAll();
    }

    @GetMapping("/getcollegefees/{year}")
    public ResponseEntity<List<CollegeFee>> getCollegeFees(@PathVariable String year){
        try{
            return ResponseEntity.status(200).body(feesService.getCollegeFees(year));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/gethostelfees/{year}")
    public ResponseEntity<List<HostelFee>> getHostelFees(@PathVariable String year){
        try{
            return ResponseEntity.status(200).body(feesService.getHostelFees(year));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/updatehostelfees/{id}")
    public ResponseEntity<?> updateHostelFees(@RequestBody HostelForm hostelForm , @PathVariable Long id){
        try{
            return ResponseEntity.status(200).body(feesService.updateHostelFee(hostelForm, id));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/updatecollegefees/{id}")
    public ResponseEntity<?> updateCollegeFees(@RequestBody CollegeForm collegeForm , @PathVariable Long id){
        try{
            return ResponseEntity.status(200).body(feesService.updateCollegeFee(collegeForm, id));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

}
