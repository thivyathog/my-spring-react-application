import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import Calender from './Calender';

class ViewEmployeeTracker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
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

    render() {
        return (<div><Calender>
            </Calender>
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
                                    <td>Annaul : {employee.annualLeave}<br/>
                                        casual : {employee.casualLeave}<br/>
                                        Medical : {employee.medicalLeave}<br/>
                                    </td>
                                    <td></td>
                                    <td>

                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Decline </button>
                                        <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">Approve </button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
        </div>

        )
    }
}

export default ViewEmployeeTracker
