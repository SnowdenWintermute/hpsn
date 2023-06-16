import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useMemo } from "react";
import Link from "next/link";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoneySharp";
import RequestQuoteSharpIcon from "@mui/icons-material/RequestQuoteSharp";
import PieChartSharpIcon from "@mui/icons-material/PieChartSharp";
import Groups2SharpIcon from "@mui/icons-material/Groups2Sharp";
import StudentPieChart from '../components/Charts/StudentPie'
const links = [
  {
    name: "Students",
    href: "/classes",
   
    description:
      "View and manage student details instantly to keep database record up to date.",
    icon: SchoolIcon,
  },
  {
    name: "Teachers",
    href: "#",
    description:
      "View teachers profiles in a snap. View, add or modify information to ensure records are upto date",
    icon: Groups2SharpIcon,
  },
  {
    name: "Payment Registration",
    href: "#",
    description:
      "Register monthly fees swiftly, streamline your financial process",
    icon: AttachMoneyIcon,
  },
  {
    name: "Expense Registration",
    href: "#",
    description:
      "Keep track of your expenditure. Log educational expenses efficiently",
    icon: RequestQuoteSharpIcon,
  },
  
];
const link2s = [
  {
    name: "Students",
    href: "/classes",
   
    description:
      "View and manage student details instantly to keep database record up to date.",
    icon: SchoolIcon,
  },
  {
    name: "Teachers",
    href: "#",
    description:
      "View teachers profiles in a snap. View, add or modify information to ensure records are upto date",
    icon: Groups2SharpIcon,
  },
  {
    name: "Payment Registration",
    href: "#",
    description:
      "Register monthly fees swiftly, streamline your financial process",
    icon: AttachMoneyIcon,
  },
  {
    name: "Expense Registration",
    href: "#",
    description:
      "Keep track of your expenditure. Log educational expenses efficiently",
    icon: RequestQuoteSharpIcon,
  },
  {
    name: "Statistics",
    href: "#",
    description: "Access detailed statistics, analyze trends.",
    icon: PieChartSharpIcon,
  },
];

export default function Main() {
  return (
    <div className="flex justify-between items-center  ">
      <div className="grid gap-2 grid-col-2"
      >
        <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
          <h2 className="sr-only">Popular pages</h2>
          <ul
            role="list"
            className="-mt-6 divide-y divide-gray-900/5 border-b  border-gray-900/5"
          >
            {link2s.map((link, linkIdx) => (
              <li
                key={linkIdx}
                className="relative flex bg-blue-900 shadow-xl hover:bg-blue-600 m-1 p-2 rounded-md gap-x-6 py-6"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-xl ring-1  ring-gray-900/10">
                  <link.icon
                    className="h-6 w-6 text-gray-100"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-auto ">
                  <h3 className="text-sm font-semibold leading-6 text-gray-50">
                    <Link href={link.href}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {link.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-gray-50 md:lg ">
                    {link.description}
                  </p>
                </div>
                <div className="flex-none self-center">
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
     
      </div>
      <div className="grid mt-10 divide-y  gap-1 divide-gray-900/5 border-b  w-1/2 mx-auto  border-gray-900/5"
      >
        
         <div className="bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-600 shadow-black shadow-sm  rounded-md text-white font-roboto text-xs ">
       
        <StudentPieChart />
         </div>
         
          
         <div className="bg-black p-10">ABCE</div>
          
       
      
    </div>
    </div>
  );
}
