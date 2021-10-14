import axios from 'axios';

const TRACKER_API_BASE_URL = "http://localhost:8080/v1/tracker";

class TrackerService {

    getTrackerDetails(){
        return axios.get(TRACKER_API_BASE_URL);
    }
    getEmployeeLeaveById(employeeId){
        return axios.get(TRACKER_API_BASE_URL + '/' + employeeId);
    }
    updateEmployeeLeave(employee, employeeId){
        return axios.put(TRACKER_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(TRACKER_API_BASE_URL + '/' + employeeId);
    }
}

export default new TrackerService()
