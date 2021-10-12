package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "leaveForm")
public class LeaveForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "employeeId")
    private long employeeId;

    @Column(name = "employeeName")
    private String employeeName;

    @Column(name = "typeofLeave")
    private String typeofLeave;

    @Column(name = "reason")
    private String reason;

    @Column(name = "status")
    private String status;

    public LeaveForm() {

    }

    public LeaveForm(long id, long employeeId, String employeeName, String typeofLeave, String reason, String status) {
        this.id = id;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.typeofLeave = typeofLeave;
        this.reason = reason;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getTypeofLeave() {
        return typeofLeave;
    }

    public void setTypeofLeave(String typeofLeave) {
        this.typeofLeave = typeofLeave;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}