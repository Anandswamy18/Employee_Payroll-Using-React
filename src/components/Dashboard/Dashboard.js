import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Dashboard.css"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Dashboard() {

    const [empData, setEmpData] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const dataFromLocalStorage = localStorage.getItem('empData');



        if (dataFromLocalStorage) {
            setEmpData(JSON.parse(dataFromLocalStorage));

        }


    }, []);

    const navigate = useNavigate()
    const handleAddUser = () => {

        navigate("/registration")
    }



    const handleDelete = (index) => {
        const updatedEmpData = [...empData];
        updatedEmpData.splice(index, 1);
        setEmpData(updatedEmpData);
        localStorage.setItem("empData", JSON.stringify(updatedEmpData));
    };

    const handleEdit = (index) => {

        const employee = empData[index];
        navigate(`/edit/${index}`, { state: { employee } });
    };


    return (
        <>


            <div className="dashboard-header">Employee Details</div>
            <div className="dashboard-head"><input type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} className="dash-input" />
                <button className="dashboard-symbol" onClick={handleAddUser}>
                    <span>+</span>
                    <span className="dashboard-text">Add User</span>
                </button>
            </div>

            <div className="dashboard-field">       
                {empData.length === 0 ? (
                    <div className="no-data-found">

                        <marquee behavior="scroll" scrollamount="20" scrolldelay="10" direction="right" > No data found. Please add user.</marquee>
                    </div>
                ) : (
                    <table border="0px" cellspacing="0px" className="dashboard-table">
                        <tr className="dashboard_table-header">
                            <th className="namefield">NAME</th>
                            <th>GENDER</th>
                            <th className="departmentfield">DEPARTMENT</th>
                            <th>SALARY</th>
                            <th>START DATE</th>
                            <th>ACTIONS</th>
                        </tr>
                        {empData.filter((employee) => {
                            return search.toLowerCase() === '' ? employee : employee.name.toLowerCase().includes(search)
                                || (Array.isArray(employee.department) && employee.department.some(dep => dep.toLowerCase().includes(search)) ||
                                    employee.salary.toLowerCase().includes(search));

                        })
                            .map((employee, index) => (
                                <tr key={index} className="dashboard-contents">
                                    <td className="dashboard-namefield">
                                        <div className="dash-image-blk">
                                            {<img src={employee.pimage} alt="" className="dash-image" />}
                                        </div>
                                        <div className="dash-name">{employee.name}</div>
                                    </td>
                                    <td>{employee.gender}</td>
                                    <td>
                                        <div className="dash-dept-blk">
                                            {Array.isArray(employee.department) && employee.department.map((dept, index) => (
                                                <div key={index} className="dash-dept">{dept}</div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>₹   {employee.salary}</td>
                                    <td>{`${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`}</td>
                                    <td className="icon-fields">
                                        <div className="deleteicon">
                                            <IconButton aria-label="delete" size="small">
                                                <DeleteIcon fontSize="small" onClick={() => handleDelete(index)} />
                                            </IconButton>
                                        </div>
                                        <div className="editicon">
                                            <EditIcon fontSize="small" onClick={() => handleEdit(index)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </table>
                )}
            </div>

        </>
    )
}

export default Dashboard;