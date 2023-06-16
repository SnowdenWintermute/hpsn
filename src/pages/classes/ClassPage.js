import useFetchClasses from "../../hooks/useFetchClass";
import useFetchStudentsByClass from "../../hooks/useFetchStudentsByClass";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import React, { useState, useEffect, useMemo } from "react";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ModalD from "../../components/Modals/DeactivationModal";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

export default function ClassPage() {
  const [classes, setClasses] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);
  const [classID, setClassID] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const {
    data: fetchedClasses,
    isLoading: isClassesLoading,
    error: classesError,
  } = useFetchClasses();
  const {
    data: fetchedStudents,
    isLoading: isStudentsLoading,
    error: studentsError,
  } = useFetchStudentsByClass(classID);
  useEffect(() => {
    if (!isClassesLoading && !classesError) {
      setClasses(fetchedClasses);
    }
  }, [classes, isClassesLoading, classesError]);
  useEffect(() => {
    const classMap = classes.reduce((map, cls) => {
      map[cls._id] = cls.ClassName;
      return map;
    }, {});

    if (!isStudentsLoading && !studentsError && fetchedStudents) {
      const sClassNames = fetchedStudents.map((student) => {
        return { ...student, ClassName: classMap[student.ClassID] || "N/A" };
      });
      setStudents(sClassNames);
      setFilteredStudents(sClassNames);
    }
  }, [fetchedStudents, isStudentsLoading, studentsError]);

  const handleClassChange = (e) => {
    const index = e.target.value;
    const selectedClassItem = classes[index];
    setClassID(selectedClassItem._id);
    setSelectedClassIndex(index);
    setSelectedSection(""); // This will clear the selected section state when a new class is selected
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    console.log(e.target.value);
    setFilteredStudents(studentsBySection[e.target.value]);
    console.log("working");
  };
  useEffect(() => {
    console.log("classID has changed:", classID);
  }, [classID]);

  const studentsBySection = useMemo(() => {
    const sections = {};
    students.forEach((student) => {
      const section = student.Section;
      if (sections[section]) {
        sections[section].push(student);
      } else {
        sections[section] = [student];
      }
    });
    return sections;
  }, [students]);

  //Modal logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);

  return (
    <div className="px-4 pt-3   sm:px-6 lg:px-8">
      <div className="sm:flex border-b pb-5 pt-3 sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-3xl tracking-widest font-semibold leading-6 text-gray-600">
            Students
          </h3>
          <p className="mt-2 text-sm text-gray-700">
            List of students in this class.
          </p>
        </div>
        <div className="mt-  sm:ml-4 sm:mt-0">
          <label htmlFor="mobile-search-candidate" className="sr-only">
            Search
          </label>
          <label htmlFor="desktop-search-candidate" className="sr-only">
            Search
          </label>
          <div className="flex  items-center rounded-md shadow-sm">
            <div className="relative flex-grow ring-5 ring-red focus-within:z-10">
              <div className="pointer-events-none  absolute inset-y-0 left-0 flex text-sm items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="mobile-search-candidate"
                id="mobile-search-candidate"
                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                placeholder="Search"
              />
              <input
                type="text"
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                placeholder="Search candidates"
              />
            </div>

            <select className="bg-transparent text-gray-500 text-sm border-transparent focus:border-transparent focus:ring-0 border-0 w-fit"
            value={selectedClassIndex || ""}
            onChange={handleClassChange}>
            {classes.map((classItem, index) => (
                  <option key={index} value={index}>
                    {classItem.ClassName}
                  </option>
                ))}
            </select>
            <select className="bg-transparent  text-gray-500 text-sm focus-outline-none border-transparent focus:border-transparent focus:ring-0 border-0 w-fit"
            value={selectedSection}
            onChange={handleSectionChange}>
            <option
                 
                 value=""
                 disabled
               >
                 Section
               </option>
               {classes[selectedClassIndex]?.Section?.map((section, index) => (
                 <option key={index} value={section}>
                   {section}
                 </option>
               ))}
            </select>
          </div>
        </div>
          {/* <div className="relative flex ring-2 focus-within:z-10">
            <div className="pointer-events-none  absolute inset-y-0 left-0 flex text-sm items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
                type="text"
                name="mobile-search-candidate"
                id="mobile-search-candidate"
                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                placeholder="Search"
              />
              <input
                type="text"
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                placeholder="Search Students"
              />

           
             <select
                className="bg-transparent text-gray-500 text-sm border-transparent focus:border-transparent focus:ring-0 border-0 w-fit"
                value={selectedClassIndex || ""}
                 onChange={handleClassChange}
              >
                <option
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto  py-1 text-base shadow-lg  ring-opacity-1  focus:outline-none sm:text-sm"
                  value=""
                  disabled
                >
                  class
                </option>
                {classes.map((classItem, index) => (
                  <option key={index} value={index}>
                    {classItem.ClassName}
                  </option>
                ))}
              </select>
           
            <div className="relative w-3/4 flex-grow-0 -ml-px inline-flex rounded-r-md items-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 ring-1   ring-inset ring-gray-300">
              <select
                value={selectedSection}
                className="bg-transparent text-gray-500 text-sm border-transparent focus:border-transparent focus:ring-0 border-0 w-fit" onChange={handleSectionChange}
              >
                <option
                 
                  value=""
                  disabled
                >
                  Section
                </option>
                {classes[selectedClassIndex]?.Section?.map((section, index) => (
                  <option key={index} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
        
      </div>
      {/* <BreadCrumbs /> */}

      <div className="mt-8 flow-root transition-all ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2  align-middle">
            <table className="min-w-full divide-y divide-gray-300 border-b-10">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  text-gray-900 sm:pl-6 lg:pl-8 "
                  >
                    Roll
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  text-gray-900 sm:pl-6 lg:pl-8 "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Section
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border divide-x   bg-white ">
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {student.Registration_No}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {student.Name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {student.Gender}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {student.ClassName}
                    </td>
                    <td className="whitespace-nowrap px-3 pl-9 py-4 text-sm text-gray-500">
                      {student.Section}
                    </td>
                    <td className="relative flex justify-around whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <EditNoteSharpIcon />
                        <span className="sr-only">, {student.name}</span>
                      </a>
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <AccountBoxSharpIcon />
                        <span className="sr-only">, {student.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
