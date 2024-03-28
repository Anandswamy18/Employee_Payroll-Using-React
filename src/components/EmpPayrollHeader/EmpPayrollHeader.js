import { Outlet, useNavigate } from 'react-router'
import Logo from '../../../src/assets/logo.png'
import './EmpPayrollHeader.css'

function EmpPayrollHeader(){

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/registration")
      }
    return(
        <>
        <div className="emp-nav">
        <img src={Logo} alt=""  className='emp-logoimage'/>
        <div className="emp-logo" onClick={handleNavigate}><pre className="emp-employee"> EMPLOYEE <br />
          <div className="emp-payroll"> PAYROLL</div></pre>
        </div>
        <Outlet></Outlet>
      </div>
        
        
        </>
    )

}


export default EmpPayrollHeader;