import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import RegistrationForm from "../../components/Forms/NonTeachingStaff";
import React from "react";

import CopyRight from "../../components/Footer/CopyRight";

const Employees = () => {
  return (
    <div>
      <DashboardLayout>
        <RegistrationForm />
        <CopyRight />
      </DashboardLayout>
    </div>
  );
};

export default Employees;
