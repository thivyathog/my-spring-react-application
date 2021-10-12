package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.LeaveForm;
import net.javaguides.springboot.repository.TrackRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/")
public class LeaveFormController {

    @Autowired
    private TrackRepository trackRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    // get all leave forms
    @GetMapping("/track")
    public List<LeaveForm> getAllEmployees(){
        return trackRepository.findAll();
    }

    // create leave form
    @PostMapping("/track")
    public LeaveForm createEmployee(@RequestBody LeaveForm leaveForm) {
        return trackRepository.save(leaveForm);
    }

    // get leaveform by id
    @GetMapping("/track/{id}")
    public ResponseEntity<LeaveForm> getEmployeeById(@PathVariable Long id) {
        LeaveForm leaveForm = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(leaveForm);
    }

    // update leaveForm

    @PutMapping("/track/{id}")
    public ResponseEntity<LeaveForm> updateLeaveForm(@PathVariable Long id, @RequestBody LeaveForm employeeDetails){
        LeaveForm leaveForm = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));


        Employee employee = employeeRepository.findById(employeeDetails.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        leaveForm.setStatus(employeeDetails.getStatus());
        switch( employeeDetails.getTypeofLeave()) {
            case "Annual":
                employee.setAnnualLeave(String.valueOf(Integer.parseInt(employee.getAnnualLeave())-1));
                break;
            case "Medical":
                employee.setMedicalLeave(String.valueOf(Integer.parseInt(employee.getMedicalLeave())-1));
                break;
            case "Casual":
                employee.setCasualLeave(String.valueOf(Integer.parseInt(employee.getCasualLeave())-1));
                break;
        }
        Employee updatedEmploye = employeeRepository.save(employee);
        ResponseEntity.ok(updatedEmploye);
        LeaveForm updatedEmployee = trackRepository.save(leaveForm);
        return ResponseEntity.ok(updatedEmployee);
    }

    // delete leaveForm
    @DeleteMapping("/track/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        LeaveForm leaveForm = trackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        trackRepository.delete(leaveForm);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
