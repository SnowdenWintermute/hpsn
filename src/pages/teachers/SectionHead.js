import ModalD from "../../components/Modals/DeactivationModal";
import Divider from "../../components/Divider/BottomD";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import useFetchTeachers from "../../hooks/useFetchTeachers";
import useFetchEmployees from "../../hooks/useFetchEmployees";
import { useDeactivateTeacher } from "../../hooks/useDeactivateTeacher";
import { Popover } from "@headlessui/react";

export default function TeacherSec() {
  const [genderFilter, setGenderFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [sortPayOrder, setSortPayOrder] = useState("asc");

  const { data: fetchData, refetch, loading, isError } = useFetchTeachers();
  const {
    data: fetchEmployees,
    refetch: refetchEmployees,
    loading: loadingEmployees,
    isError: isErrorEmployees,
  } = useFetchEmployees();

  const teachers = useMemo(() => {
    if (!fetchData || !Array.isArray(fetchData.employee)) return [];

    let filteredTeachers = [...fetchData.employee];

   if(!loadingEmployees && !isErrorEmployees){ return filteredTeachers;}
   
  }, [fetchData, genderFilter, designationFilter, sortPayOrder]);

  const employees = useMemo(() => {
    if (!fetchEmployees || !Array.isArray(fetchEmployees.employee)) return [];

    let filteredEmployees = [...fetchEmployees.employee];

    return filteredEmployees;
  }, [fetchEmployees]);
  console.log(employees);
  return (
    <div>
      <div className="border-b mt-5 border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-3xl tracking-widest font-semibold leading-6 text-gray-600">
          Teachers Directory
        </h3>
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

            <select className="bg-transparent text-gray-500 text-sm border-transparent focus:border-transparent focus:ring-0 border-0 w-fit">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select className="bg-transparent  text-gray-500 text-sm focus-outline-none border-transparent focus:border-transparent focus:ring-0 border-0 w-fit">
              <option value="">Designation</option>
              <option value="High">High</option>
              <option value="Primary">Primary</option>
            </select>
          </div>
        </div>
      </div>
      <List teachers={teachers} refetchTeachers={refetch} />
      <Divider />
      <div className="border-b mt-5 border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-3xl tracking-widest font-semibold leading-6 text-gray-600">
          Non Teaching Directory
        </h3>
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

            <select className="bg-transparent text-gray-500 text-sm border-transparent focus:border-transparent focus:ring-0 border-0 w-fit">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select className="bg-transparent  text-gray-500 text-sm focus-outline-none border-transparent focus:border-transparent focus:ring-0 border-0 w-fit">
              <option value="">Designation</option>
              <option value="High">High</option>
              <option value="Primary">Primary</option>
            </select>
          </div>
        </div>
      </div>
      <NonTeachingList
        employees={employees}
        refetchEmployees={refetchEmployees}
      />
    </div>
  );
}
import { Snackbar, Alert } from "@mui/material";

const List = ({ teachers, refetchTeachers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const updateStatusMutation = useDeactivateTeacher();

  console.log(currentPerson);
  const handleOpenModal = (person) => {
    setCurrentPerson(person);
    setIsModalOpen(true);
  };
  // const handleDeactivate = (personId, comment) => {
  //   updateStatusMutation.mutate({ id: personId, comment });
  // };
  const queryClient = useQueryClient();
  const handleDeactivate = (personId, comment) => {
    updateStatusMutation.mutate(
      { id: personId, comment },
      {
        onSuccess: () => {
          setOpen(true);
          queryClient.invalidateQueries('teachers');
          setMessage("Teacher Deactivated  successfully!");
          refetchTeachers();
        },
      }
    );
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const DeactivateButton = ({ person }) => {
    return (
      <Popover className="relative  ">
        {({ open }) => (
          <>
            <Popover.Button className="text-orange-500 hover:text-orange-400 border-transparent focus:border-transparent focus:ring-0 border-0 ">
              {person.status.isActive ? "Deactivate" :  <RemoveCircleOutlineSharpIcon  />}
            </Popover.Button>

            <Popover.Panel
              className={`${
                open
                  ? "flex flex-col items-center justify-center  text-gray-50 bg-gray-500 divide-y divide-gray-800 p-2 m-2 rounded-md text-xs"
                  : "hidden"
              } absolute z-10`}
            >
              <div className="p-2 font-roboto  tracking-widest">
                {person.status.comments}
              </div>
              <div>
                {!person.status.isActive && (
                  <button
                    onClick={() => handleReactivate(person._id)}
                    className="p-2 font-roboto hover:bg-blue-400 hover:rounded-md tracking-widest"
                  >
                    Reactivate
                  </button>
                )}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Last Name
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
                    Designation
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Pay
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {teachers?.map((person) => (
                  <tr
                    key={person.first_name}
                    // className={
                    //   person.status.isActive ? "" : "bg-red-200"
                    // }
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.first_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  text-sm text-gray-500">
                      {person.last_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.gender}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.designation}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.package}
                    </td>
                    <td
                      className={
                        person.status.isActive
                          ? "relative whitespace-nowrap py-4 pl-3 pr-4 text-center w-fit  text-sm font-medium sm:pr-0"
                          : " relative whitespace-nowrap py-4 pl-3 pr-4 text-center w-fit  text-sm font-medium sm:pr-0"
                      }
                      /*className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center w-fit  text-sm font-medium sm:pr-0"*/
                    >
                      {person.status.isActive ? (
                        <button
                          onClick={() => handleOpenModal(person)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {" "}
                          Edit<span className="sr-only">, {person.name}</span>
                        </button>
                      ) : (
                        <DeactivateButton person={person} />
                      )}
                      {/* <button
                        onClick={() => handleOpenModal(person)}
                        className="text-indigo-600 hover:text-indigo-900" 
                      >
                        Edit<span className="sr-only">, {person.name}</span>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && currentPerson && (
            <ModalD
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              person={currentPerson}
              onDeactivate={handleDeactivate} // Passing the function as a prop
            />
          )}
        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseModal}
        >
          <Alert
            onClose={handleCloseModal}
            severity={updateStatusMutation.isSuccess ? "success" : "error"}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};


const NonTeachingList = ({ employees, refetchEmployees }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const updateStatusMutation = useDeactivateTeacher();

  console.log(currentPerson);
  const handleOpenModal = (person) => {
    setCurrentPerson(person);
    setIsModalOpen(true);
  };
  // const handleDeactivate = (personId, comment) => {
  //   updateStatusMutation.mutate({ id: personId, comment });
  // };
const queryClient = useQueryClient();
  const handleDeactivate = (personId, comment) => {
    updateStatusMutation.mutate(
      { id: personId, comment },
      {
        onSuccess: () => {
          setOpen(true);
          queryClient.invalidateQueries('employees');
          setMessage("Employee deactivated successfully!");
          refetchEmployees();
        },
      }
    );
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const DeactivateButton = ({ person }) => {
  
  
    return (
      <Popover className="relative ">
        {({ open }) => (
          <>
            <Popover.Button
        
              className="text-orange-500 hover:text-orange-400 border-transparent focus:border-transparent focus:ring-0 border-0 "
            >
              {person.status.isActive ? (
                "Deactivate"
              ) : (
                <RemoveCircleOutlineSharpIcon  />
              )}
            </Popover.Button>

            <Popover.Panel
             
              className={`${
                open
                  ? "flex flex-col items-center justify-center  text-gray-50  p-2 m-2 rounded-md text-xs"
                  : "hidden"
              } absolute z-10`}
            >
              {/* <div
             
               className="p-2 font-roboto tracking-widest">
                {person.status.comments}
              </div> */}
              <div  >
                {!person.status.isActive && (
                  <button
               
                
                    onClick={() => handleReactivate(person._id)}
                    className="p-2 font-roboto tracking-widest relative bottom-20 rounded-md right-20 bg-gray-500  hover:bg-blue-500 hover:text-white hover:rounded-md"
                  >
                    Reactivate
                  </button>
                )}
              </div>
             
               
              
            </Popover.Panel>
          </>
        )}
      </Popover>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Last Name
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
                    Designation
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Pay
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees?.map((person) => (
                  <tr
                    key={person.first_name}
                    // className={
                    //   person.status.isActive ? "" : "bg-red-200"
                    // }
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.first_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4  text-sm text-gray-500">
                      {person.last_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.gender}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.designation}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.package}
                    </td>
                    <td
                      className={
                        person.status.isActive
                          ? "relative whitespace-nowrap py-4 pl-3 pr-4 text-center w-fit  text-sm font-medium sm:pr-0"
                          : " relative whitespace-nowrap py-4 pl-3 pr-4 text-center w-fit  text-sm font-medium sm:pr-0"
                      }
                      /*className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center w-fit  text-sm font-medium sm:pr-0"*/
                    >
                      {person.status.isActive ? (
                        <button
                          onClick={() => handleOpenModal(person)}
                          className="text-gray-500 hover:text-gray-600 "
                        >
                          {" "}
                          Edit<span className="sr-only">, {person.name}</span>
                        </button>
                      ) : (
                        <DeactivateButton person={person}  />
                      )}
                      {/* <button
                        onClick={() => handleOpenModal(person)}
                        className="text-indigo-600 hover:text-indigo-900" 
                      >
                        Edit<span className="sr-only">, {person.name}</span>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isModalOpen && currentPerson && (
            <ModalD
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              person={currentPerson}
              onDeactivate={handleDeactivate} // Passing the function as a prop
            />
          )}
        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseModal}
        >
          <Alert
            onClose={handleCloseModal}
            severity={updateStatusMutation.isSuccess ? "success" : "error"}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
      <Divider />
    </div>
  );
};
