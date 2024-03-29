import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Registration from "./components/EmployeeRegistration/Registration";
import EmpPayrollHeader from "./components/EmpPayrollHeader/EmpPayrollHeader";




function RoutingModule() {
    //    const routeConfig= createBrowserRouter([
    //     {
    //         path:"/",
    //         element:<Dashboard/>
    //     },
    //     {
    //         path:"/registration",
    //         element:<Registration/>
    //     },
    //     {
    //         path: '/edit/:empId',
    //         element: <Registration/>
    //     }

    //    ]);

    const routeConfig = createBrowserRouter([
        {
            path: "/",
            element: <EmpPayrollHeader />,
            children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "registration", element: <Registration /> },
                { path: '/edit/:empId', element: <Registration /> }

            ]
        },
    ]);


    return (
        <RouterProvider router={routeConfig} />
    )

}

export default RoutingModule;