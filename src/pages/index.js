import { border } from "@mui/system";
import DashboardLayout from "../../src/components/Dashboard/DashboardLayout";
import CopyRight from "../../src/components/Footer/CopyRight";
import Main from "./page";
export default function HomePage() {
  return (
    <DashboardLayout>
  {/*      <Main /> */}
   <div style={style.div}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(1,1fr)',gap:'1rem'}} className="w-1/2 ">
      
      <div style={style.div} className="bg-blue-600 flex shadow-black shadow-md hover:bg-blue-500">
      <button className="bg-blue-200 p-2 rounded-xl m-1">=</button>
      <div style={{display:"flex" ,flexDirection:"column"}} >
      <p className="text-white inline-block font-roboto tracking-wide underline p-2">Students</p>
      <p className="text-gray-200 inline-block text-xs font-roboto tracking-wide -mt-1 ml-2">View teachers profiles in a snap. View, add or modify information to ensure records are upto date</p>
      </div>
      </div>
      <div style={style.div}>
      <button className="bg-blue-200 py-1 px-2 m-1">one</button>
      </div>
      <div style={style.div}>
      <button className="bg-blue-200 py-1 px-2 m-1">one</button>
      </div>
      <div style={style.div}>
      <button className="bg-blue-200 py-1 px-2 m-1">one</button>
      </div>
      </div>
      </div>

      <CopyRight />
    </DashboardLayout>
  );
}

const style = {
  div: {
    padding: "2rem 1rem",
    margin: "1rem",
    border: "1px solid black",
    borderRadius: ".5rem",
  },
  imgcircle: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    padding: "1rem",
    border: "1px solid black",
    transform:"scale(0.5)"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid black",
    alignItems: "center",
    flexWrap: "wrap",
  },
  parades: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    border: "1px solid black",
  },
};

  