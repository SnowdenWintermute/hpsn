import { Snackbar, Alert, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import ReviewStudent from "./ReviewStudent";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { getClasses } from "../../pages/api/axiosRoutes";
import axios from "axios";
const initialFormState = {
  Admission_Date: new Date(),
  ClassID: "",
  Section: "",
  Name: "",
  Father_Name: "",
  Fathers_Occupation: "",
  Father_ID: "",
  Gender: "",
  DOB: "",
  Address: "",
  Phone_No: "",
};
// function Example() {
//   const { isLoading, error, data, isFetching } = useQuery({
//     queryKey: ["repoData"],
//     queryFn: () =>
//       axios
//         .get("http://localhost:3100/students/a/getclasses")
//         .then((res) => res.data),
//   });

//   if (isLoading) return "Loading...";

//   if (error) return "An error has occurred: " + error.message;
// }

export default function StudentForm() {
  const [form, setForm] = useState(initialFormState);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["classData"],
    queryFn: () =>
      axios
        .get("http://localhost:3100/students/a/getclasses")
        .then((res) => res.data),
  });
  useEffect(() => {
    if (!isLoading && !error) {
      setClasses(data);
    }
  }, [data, isLoading, error]);
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);

  // const handleClassChange = (e) => {
  //   const selectedClass = classes.find(
  //     (classItem) => classItem._id === e.target.value
  //   );
  //   setSelectedClass(selectedClass);
  //   setForm({
  //     ...form,
  //     ClassID: selectedClass?._id,
  //     Section: '',
  //   });
  //    setSelectedSection(''); // Clear the selected section when class changes
  // };
  // const handleClassChange = (e) => {
  //   const index = e.target.value;
  //   setSelectedClassIndex(index);
  //   const selectedClass = classes[index];
  //   setForm({
  //     ...form,
  //     ClassID: selectedClass?._id,
  //     Section: "",
  //   });
  //   setSelectedSection(""); // Clear the selected section when class changes
  // };
  const handleClassChange = (e) => {
    const index = e.target.value;
    setSelectedClassIndex(index);
    const selectedClass = classes[index];
    setForm({
      ...form,
      ClassID: selectedClass?._id,
      Section: "", // This will clear the section in the form state when a new class is selected
    });
    console.log(form,selectedClass);
    setSelectedSection(""); // This will clear the selected section state when a new class is selected
  };

  useEffect(() => {
    if (form) console.log(form);
  }, [selectedClass, form]);

  // const handleSectionChange = (e) => {
  //   setSelectedSection(e.target.value);
  //   setForm({
  //     ...form,
  //     Section: e.target.value,
  //   });
  // };
  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setForm({
      ...form,
      Section: e.target.value,
    });
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);

    console.log(form);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log(form);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-xl font-semibold leading-7 text-gray-900">
            Register New Student
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Fill the details to add student
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="Name"
                  value={form.Name}
                  onChange={handleChange}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>{" "}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="Gender"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Gender
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  name="Gender"
                  onChange={handleChange}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Date of Birth
              </label>
              <div className="sm:col-span-2 sm:mt-0">
                <input
                  type="date"
                  name="DOB"
                  onChange={handleChange}
                  value={form.DOB}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <br />
            <div className=" sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Father&apos;s Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  name="Father_Name"
                  onChange={handleChange}
                  value={form.Father_Name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="FathersID"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Fathers ID
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="Father_ID"
                  onChange={handleChange}
                  value={form.Father_ID}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="Father Occupation"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Father&apos;s Occupation
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="Fathers_Occupation"
                  onChange={handleChange}
                  value={form.Fathers_Occupation}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                onChange={handleChange}
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  type="text"
                  name="Address"
                  onChange={handleChange}
                  value={form.Address}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="Father Occupation"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Phone Number
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="Phone_No"
                  onChange={handleChange}
                  value={form.Phone_No}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Class
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                {/* <select
                  value={selectedClass?._id}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleClassChange}
                >
                  <option value="" disabled>
                    Select a class
                  </option>
                  {classes.map((classItem, index) => (
                    <option key={index} value={classItem._id}>
                      {classItem.ClassName}
                    </option>
                  ))}
                </select> */}
                <select
                  value={selectedClassIndex || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleClassChange}
                >
                  <option value="" disabled>
                    Select a class
                  </option>
                  {classes.map((classItem, index) => (
                    <option key={index} value={index}>
                      {classItem.ClassName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Section
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  value={selectedSection}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleSectionChange}
                >
                  <option value="" disabled>
                    Select a Section
                  </option>
                  {classes[selectedClassIndex]?.Section?.map(
                    (section, index) => (
                      <option key={index} value={section}>
                        {section}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Information Check
          </h2>

          <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <fieldset>
              <legend className="sr-only">By Email</legend>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                <div
                  className="text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  Personal Information
                </div>
                <div className="mt-4 sm:col-span-2 sm:mt-0">
                  <div className="max-w-lg space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Contact Information
                        </label>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-900"
                        >
                          Documents Verified
                        </label>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-900"
                        >
                          Offers
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="sr-only">Session Information</legend>
              <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                <div
                  className="text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  Session Information
                </div>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="max-w-lg">
                    <p className="text-sm leading-6 text-gray-600">
                      Student will be joining as
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          New Student
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Mid Session
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-nothing"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-nothing"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Transfer Student
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          // severity={createStudentMutation.isSuccess ? "success" : "error"}
        >
          {/* {message} */}
        </Alert>
      </Snackbar>
      <ReviewStudent />
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
