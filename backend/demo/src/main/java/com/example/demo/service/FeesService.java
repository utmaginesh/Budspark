package com.example.demo.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CollegeForm;
import com.example.demo.dto.HostelForm;
import com.example.demo.model.CollegeFee;
import com.example.demo.model.HostelFee;
import com.example.demo.model.YearFee;
import com.example.demo.repository.CollegeFeeRepository;
import com.example.demo.repository.HostelFeeRepository;
import com.example.demo.repository.YearFeeRepository;

@Service
public class FeesService {
    @Autowired
    private YearFeeRepository yearFeeRepository;

    @Autowired
    private HostelFeeRepository hostelFeeRepository;

    @Autowired
    private CollegeFeeRepository collegeFeeRepository;

    public List<CollegeFee> getCollegeFees(String year){
        YearFee yearFee = yearFeeRepository.findByYear(year).get(0);
        return yearFee.getCollegeFees();
    }

    public List<HostelFee> getHostelFees(String year){
        YearFee yearFee = yearFeeRepository.findByYear(year).get(0);
        return yearFee.getHostelFees();
    }

    public HostelFee updateHostelFee(HostelForm hostelForm, Long id){
        HostelFee hostelFee = hostelFeeRepository.findById(id).orElse(null);
        hostelFee.setBlock(hostelForm.getBlock());
        hostelFee.setHFees(hostelForm.getHfees());
        hostelFee.setMessFees(hostelForm.getMessFees());
        int sum = hostelForm.getHfees().intValue() + hostelForm.getMessFees().intValue();
        hostelFee.setTotal(new BigDecimal(sum));
        return hostelFeeRepository.save(hostelFee);

    }
    public CollegeFee updateCollegeFee(CollegeForm collegeForm, Long id){
        CollegeFee collegeFee = collegeFeeRepository.findById(id).orElse(null);
        collegeFee.setDepartment(collegeForm.getDepartment());
        collegeFee.setSpecialCourse(collegeForm.getSpecialCourse());
        collegeFee.setTuition(collegeForm.getTuition());
        int sum = collegeForm.getTuition().intValue() + collegeForm.getSpecialCourse().intValue();
        collegeFee.setTotal(new BigDecimal(sum));
        return collegeFeeRepository.save(collegeFee);
    }
}
