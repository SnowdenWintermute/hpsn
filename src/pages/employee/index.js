import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import RegistrationForm from "../../components/Forms/NonTeachingStaff";
import React from "react";

import CopyRight from "../../components/Footer/CopyRight";
import EmployeeTable from "../../components/Tables/EmployeeTable"
const Employees = () => {
  return (
    <div>
      <DashboardLayout>
        {/* <RegistrationForm /> */}
        <EmployeeTable />
        <CopyRight />
      </DashboardLayout>
    </div>
  );
};

export default Employees;
