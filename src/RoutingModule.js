import { createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Registration from "./components/EmployeeRegistration/Registration";



function RoutingModule(){
   const routeConfig= createBrowserRouter([
    {
        path:"/",
        element:<Dashboard/>
    },
    {
        path:"/registration",
        element:<Registration/>
    },
    {
        path: '/edit/:empId',
        element: <Registration/>
    }
   
   ]);

   return(
       <RouterProvider router={routeConfig}/>
   )
     
}

export default RoutingModule;