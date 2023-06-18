import { useState, useMemo, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDeactivateEmployee } from "../../hooks/useDeactivateStatus";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import ModalD from "../../components//Modals/DeactivationModal";
import useFetchEmployees from "../../hooks/useFetchEmployees";
import { Snackbar, Alert } from "@mui/material";

export default function EmployeeTable({ refetchEmployees }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [filterData, setFilterData] = useState("");
  const [filterByGender, setFilterByGender] = useState("all");
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: employeeData, isLoading, error } = useFetchEmployees();

  useEffect(() => {
    if (
      !isLoading &&
      !error &&
      employeeData &&
      Array.isArray(employeeData.employee)
    ) {
      setEmployees(employeeData.employee);
    }
  }, [employeeData, isLoading, error]);

  const filteredEmployees = useMemo(() => {
    if (filterByGender !== "all") {
      return employees.filter((item) => item.gender === filterByGender);
    }

    if (!searchTerm) return employees;

    return employees.filter((employee) =>
      employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm, filterByGender]);

  // console.log(employeeData);

  const handleOpenModal = (person) => {
    setCurrentPerson(person);
    setIsModalOpen(true);
  };

  const updateStatusMutation = useDeactivateEmployee();

  const handleDeactivate = (personId, comment) => {
    updateStatusMutation.mutate(
      { id: personId, comment },
      {
        onSuccess: () => {
          setOpen(true);
          queryClient.invalidateQueries("employees");
          setTimeout(() => {
            setOpen(false);
          }, 3000);
          setMessage(
            `Successfully deactivated ${personId.first_name} ${personId.last_name}`
          );
          refetchEmployees();
        },
      }
    );
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                placeholder="Search candidates"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              label="Gender"
              onChange={(e) => setFilterByGender(e.target.value)}
              className="bg-transparent text-gray-500 text-sm border-transparent focus:border-transparent focus:ring-0 border-0 w-fit"
            >
              <option value="all">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              /* onChange={(e) => setSortBy(e.target.value)}*/
              className="bg-transparent  text-gray-500 text-sm focus-outline-none border-transparent focus:border-transparent focus:ring-0 border-0 w-fit"
            >
              <option>Pay</option>
              <option value="pay">ASC</option>
              <option value="Low">DSC</option>
            </select>
          </div>
        </div>
      </div>
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
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                {isModalOpen && currentPerson && (
                  <ModalD
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    person={currentPerson}
                    onDeactivate={handleDeactivate} // Passing the function as a prop
                  />
                )}
                <tbody className="divide-y divide-gray-200">
                  {filteredEmployees.map((person, index) => (
                    <tr key={index}>
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
                            Edit<span className="sr-only">, {person.name}</span>
                          </button>
                        ) : (
                          <RemoveCircleOutlineSharpIcon />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleCloseModal}
                >
                  <Alert
                    onClose={handleCloseAlert}
                    severity={
                      updateStatusMutation.isSuccess ? "success" : "error"
                    }
                  >
                    {message}
                  </Alert>
                </Snackbar>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
