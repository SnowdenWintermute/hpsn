import React from "react";
import ClassPage from "./ClassPage";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import CopyRight from "../..//components//Footer//CopyRight";
const Classes = () => {
  return (
    <DashboardLayout>
      <ClassPage />
     <CopyRight/>
    </DashboardLayout>
  );
};

export default Classes;
