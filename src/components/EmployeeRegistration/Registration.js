import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import TextField from '@mui/material/TextField';
import profileImg1 from '../../assets/profile1.png'
import profileImg2 from '../../assets/profile2.png'
import profileImg3 from '../../assets/profile3.png'
import profileImg4 from '../../assets/profile4.png'
import "./Registration.css"




export default function Registration() {


  const [empData, setEmpData] = useState({
    name: "",
    pimage: "",
    gender: "",
    department: [],
    salary: "",
    startDate: {
      day: "", month: "", year: ""
    },
    notes: ""

  })
  const navigate = useNavigate()
  const { empId } = useParams()

  useEffect(() => {

    if (empId >= 0) {
      const existingData = localStorage.getItem("empData")
      setEmpData(JSON.parse(existingData)[empId])
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setEmpData(prevState => ({
          ...prevState,
          department: [...prevState.department, value]
        }));
      } else {
        setEmpData(prevState => ({
          ...prevState,
          department: prevState.department.filter(dep => dep !== value)
        }));
      }
    } else if (name === 'day' || name === 'month' || name === 'year') {
      setEmpData(prevState => ({
        ...prevState,
        startDate: {
          ...prevState.startDate,
          [name]: value
        }
      }));
    } else {
      setEmpData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };






  const handleSubmit = (e) => {
    e.preventDefault();

    let existingData = JSON.parse(localStorage.getItem('empData')) || [];



    if (empId) {

      existingData[empId] = empData;
    } else {

      existingData.push(empData);
    }

    localStorage.setItem('empData', JSON.stringify(existingData));


    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard")
  }



  const handleReset = (e) => {
    setEmpData({
      name: "",
      pimage: "",
      gender: "",
      department: [],
      salary: "",
      startDate: {
        day: "", month: "", year: ""
      },
      notes: ""

    })
  }
  return (



    <>




      <div className="field">
        <span>Employee Payroll form</span>


        <form action="" onSubmit={handleSubmit}>
          <div className="reg-elements">
            <div className="reg-label">
              <label htmlFor="name" className="label">Name</label>

              <TextField label="enter name" id="outlined-size-small" size="small" className="name-input" name="name" value={empData.name}
                onChange={handleChange} />
            </div>


            <div className="reg-label">
              <label htmlFor="pimage" className="label">Profile Image</label>

              <div className="profile">
                <input type="radio" name="pimage" value={profileImg1} checked={empData.pimage === profileImg1} onChange={handleChange} /><img src={profileImg1} alt="" className="img1" />
                <input type="radio" name="pimage" value={profileImg2} checked={empData.pimage === profileImg2} onChange={handleChange} /><img src={profileImg2} alt="" className="img2" />
                <input type="radio" name="pimage" value={profileImg3} checked={empData.pimage === profileImg3} onChange={handleChange} /><img src={profileImg3} alt="" className="img3" />
                <input type="radio" name="pimage" value={profileImg4} checked={empData.pimage === profileImg4} onChange={handleChange} /><img src={profileImg4} alt="" className="img4" />
              </div>
            </div>

            <div className="gen-label">
              <label htmlFor="gender">Gender</label>
              <div className="reg-radio">
                <input type="radio" name="gender" value={"male"} checked={empData.gender === "male"} id="male" className="gender" onChange={handleChange} /> Male
                <input type="radio" name="gender" value={"Female"} checked={empData.gender === "Female"} id="female" className="gender" onChange={handleChange} /> Female
              </div>
            </div>


            <div className="dep-label">
              <label htmlFor="department">Department</label>
              <div className="reg-dept">
                <input type="checkbox" name="department" value={"HR"} checked={empData.department.includes("HR")} className="deptartment" onChange={handleChange} />HR
                <input type="checkbox" name="department" value={"Sales"} checked={empData.department.includes("Sales")} className="deptartment" onChange={handleChange} /> Sales
                <input type="checkbox" name="department" value={"Finance"} checked={empData.department.includes("Finance")} className="deptartment" onChange={handleChange} /> Finance
                <input type="checkbox" name="department" value={"Enginerr"} checked={empData.department.includes("Enginerr")} className="deptartment" onChange={handleChange} /> Enginerr
                <input type="checkbox" name="department" value={"Other"} checked={empData.department.includes("Other")} className="deptartment" onChange={handleChange} /> Other
              </div>
            </div>


            <div className="salary-label">
              <label htmlFor="salary">Salary</label>
              <div className="reg-salary">
                <select name="salary" className="reg-select" value={empData.salary} onChange={handleChange} required>
                  <option>Select Salary</option>

                  <option value="10000">10000</option>
                  <option value="20000">20000</option>
                  <option value="50000">50000</option>
                </select>
              </div>
            </div>


            <div className="date-label">
              <label htmlFor="startDate">Start Date</label>

              <div className="reg-date">
                <select name="day" className="select-date" value={empData.startDate.day} onChange={handleChange}>
                  <option >Day</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <select name="month" className="select-month" value={empData.startDate.month} onChange={handleChange}>
                  <option >Month</option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                </select>

                <select name="year" className="select-year" value={empData.startDate.year} onChange={handleChange}>
                  <option value="">Year</option>
                  <option value="2000">2000</option>
                  <option value="2000">2000</option>
                  <option value="2000">2000 </option>
                </select>
              </div>
            </div>

            <div className="note-label">
              <label htmlFor="notes">Notes</label>
              <div className="reg-text">
                <textarea className="text-area" name="notes" cols="60" rows="4" value={empData.notes} onChange={handleChange} required></textarea>
              </div>
            </div>

            <div className="button-label">
              <div className="reg-button">
                <button type="reset" className="cancel" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="submit">Submit</button>
                <button type="reset" className="reset" onClick={handleReset}>Reset</button>
              </div>
            </div>


          </div>
        </form>




      </div>
    </>

  )

}