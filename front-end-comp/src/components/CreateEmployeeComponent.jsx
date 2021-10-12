import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
           
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            annualLeave : '',
            casualLeave :'',
            medicalLeave :'',
            totalLeave:''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
        this.changeAnnualLeaveHandler = this.changeAnnualLeaveHandler.bind(this);
        this.changeCasualLeaveHandler = this.changeCasualLeaveHandler.bind(this);
        this.changeMedicalLeaveHandler = this.changeMedicalLeaveHandler.bind(this);
    }

  
    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId, annualLeave : employee.annualLeave,
                    casualLeave :employee.casualLeave,
                    medicalLeave :employee.medicalLeave
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,annualLeave: this.state.annualLeave,casualLeave: this.state.casualLeave,medicalLeave: this.state.medicalLeave};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changeAnnualLeaveHandler= (event) => {
        this.setState({annualLeave: event.target.value});
    }
    changeCasualLeaveHandler= (event) => {
        this.setState({casualLeave: event.target.value});
    }
    changeMedicalLeaveHandler= (event) => {
        this.setState({medicalLeave: event.target.value});
    }
    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Annual Leave </label>
                                            <input placeholder="Annual leave" name="annualLeave" className="form-control"
                                                   value={this.state.annualLeave} onChange={this.changeAnnualLeaveHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Casual Leave: </label>
                                            <input placeholder="Entitled Leave" name="casualLeave" className="form-control"
                                                   value={this.state.casualLeave} onChange={this.changeCasualLeaveHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Medical Leave </label>
                                            <input placeholder="Entitled Leave" name="medicalLeave" className="form-control"
                                                   value={this.state.medicalLeave} onChange={this.changeMedicalLeaveHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
