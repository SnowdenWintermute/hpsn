import ProfilePage from "../../../components/Profile/StudentProfile";
import Dashboard from "../../../components/Dashboard/DashboardLayout";
import CopyRight from "../../../components/Footer/CopyRight";

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3100/students/profile/${context.params.id}`);
  const studentData = await res.json();

  return { props: { student: studentData } };
}
export default function Profile({ student }) {
  return (
    <Dashboard>
       <ProfilePage student={student} />
      <CopyRight />
    </Dashboard>
  );
}

