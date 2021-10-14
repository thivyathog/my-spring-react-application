import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import Calender from './Calender';
import {format} from "date-fns";
import TrackerService from '../services/TrackerService';

class ViewEmployeeTracker extends Component {
    constructor(props) {
        super(props)


        this.state = {
            employees: [],
            employee: {},
            id: this.props.match.params.id,
            employeeId: '',
            status:'',
            employeeName : '',
            typeofLeave : '',
            reason : ''
        }
        this.updateEmployeeLeave = this.updateEmployeeLeave.bind(this);
    }

    updateEmployeeLeave = (id) => {
        TrackerService.getEmployeeLeaveById(this.state.id).then( res => {
            this.setState({employee: res.data}

            );
        })
        let leaveForm = {id: this.state.employee.id, employeeId: this.state.employeeId, status:"approved",employeeName: this.state.employeeName,typeofLeave:this.state.typeofLeave,reason:this.state.reason};
        console.log('employee => ' + JSON.stringify(leaveForm));
        console.log('id => ' + JSON.stringify(this.state.id));
        TrackerService.updateEmployeeLeave(leaveForm, id).then( res => {
            this.props.history.push('/tacker');
        });
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }


    renderDate(props) {


        return (
            <table className = "table table-striped table-bordered">

                <thead>
                <tr>
                    <th> Employee Name</th>
                    <th> Employee  Id</th>
                    <th> Type of Leave</th>
                    <th> Remaining</th>
                    <th> Reason</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.employees.map(
                        employee =>
                            <tr key = {employee.id}>
                                <td> { employee.firstName}{employee.lastName} </td>
                                <td> {employee.id}</td>
                                <td> Annual</td>
                                <td>Annual : {employee.annualLeave}<br/>
                                    casual : {employee.casualLeave}<br/>
                                    Medical : {employee.medicalLeave}<br/>
                                </td>
                                <td></td>
                                <td>

                                    <button style={{marginLeft: "10px"}} onClick={ () => this.updateEmployeeLeave(employee.id)} className="btn btn-danger">Approve </button>
                                    <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">Decline </button>
                                </td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        );
    }

    render() {
        return (<div><Calender>
            </Calender>
                {this.renderDate()}

        </div>

        )
    }
}

export default ViewEmployeeTracker
