import React from "react";
import StudentForm from "./StudentForm";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import Header from "./Header";
import { CheckCircleIcon, BuildingOfficeIcon } from "@heroicons/react/solid";
const Students = () => {
  return (
    <DashboardLayout>
      <StudentForm />
    </DashboardLayout>
  );
};

export default Students;
