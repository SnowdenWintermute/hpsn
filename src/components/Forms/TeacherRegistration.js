import { Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import useFetchClasses from "../../hooks/useFetchClass";
import ConfirmationModal from "../../components//Modals/ConfirmationModal";
import { useCreateTeacher } from "../../hooks/useCreateTeacher";

const initialFormState = {
  first_name: "",
  last_name: "",
  gender: "",
  type: "Teaching",
  father_name: "",
  address: "",
  cnic: "",
  phone: "",
  dob: "",
  last_qualification: "",
  passing_year: "",
  marks_obtained: "",
  board_uni: "",
  designation: "",
  joining_date: "",
  package: "",
  approving_authority: "",
};

const formStateL = {
  documents: false,
  comments: false,
  academicRecord: false,
};

export default function StudentForm() {
  const [form, setForm] = useState(initialFormState);
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState(formStateL);
  const [message, setMessage] = useState("");
console.log(form)
  const teacherMutation = useCreateTeacher();

  const handleSubmit = (e) => {
    e.preventDefault();
    teacherMutation.mutate(form, {
      onSuccess: () => {
        setMessage("Teacher created successfully!");
        setOpen(true);
        setForm(initialFormState);  
      },
      onError: (err) => {
        setMessage("Error creating teacher. Please try again!", err.message);
        setOpen(true);
      },
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12 font-roboto sm:space-y-16">
        <div>
          <h2 className="text-xl font-semibold leading-7 text-gray-900">
            Register New Teacher
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Fill the all details to register a new teacher.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                First Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  value={form.first_name}
                  onChange={handleChange}
                  required={true}
                  id="first_name"
                  name="first_name"
                  autoComplete="first_name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Last Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  value={form.last_name}
                  required={true}
                  onChange={handleChange}
                  name="last_name"
                  id="last_name"
                  autoComplete="last_name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Gender
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  value={form.gender}
                  onChange={handleChange}
                  name="gender"
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            <br />
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="father_name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Father&apos;s Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  required={true}
                  onChange={handleChange}
                  value={form.father_name}
                  name="father_name"
                  id="father_name"
                  autoComplete="father_name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  type="text"
                  required={true}
                  onChange={handleChange}
                  value={form.address}
                  name="address"
                  id="address"
                  autoComplete="address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="cnic"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                CNIC
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  onChange={handleChange}
                  required={true}
                  value={form.cnic}
                  id="cnic"
                  name="cnic"
                  autoComplete="cnic"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Phone Number
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  required={true}
                  minLength={11}
                  maxLength={11}
                  onChange={handleChange}
                  value={form.phone}
                  id="phone"
                  name="phone"
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="dob"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Date of Birth
              </label>
              <div className="sm:col-span-2 sm:mt-0">
                <input
                  type="date"
                  required={true}
                  onChange={handleChange}
                  value={form.dob}
                  id="dob"
                  name="dob"
                  autoComplete="dob"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        {/* academic record */}
        <fieldset>
          <legend className="sr-only">Academic Record</legend>
          <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
            <div
              className="text-sm font-semibold leading-6 text-gray-900"
              aria-hidden="true"
            >
              Academic Record
            </div>
          </div>
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="last_qualification"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Qualification
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  required={true}
                  name="last_qualification"
                  value={form.last_qualification}
                  onChange={handleChange}
                  id="last_qualification"
                  autoComplete="last_qualification"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="passing_year"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Passing Year
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  required={true}
                  minLength={4}
                  maxLength={4}
                  value={form.passing_year}
                  onChange={handleChange}
                  name="passing_year"
                  id="passing_year"
                  autoComplete="passing_year"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <br />
            <div className=" sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="marks_obtained"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Marks Obtained
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  onChange={handleChange}
                  value={form.marks_obtained}
                  required={true}
                  id="marks_obtained"
                  name="marks_obtained"
                  autoComplete="marks_obtained"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className=" sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="board_uni"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Board / University
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  onChange={handleChange}
                  required={true}
                  value={form.board_uni}
                  name="board_uni"
                  id="board_uni"
                  autoComplete="board_uni"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="sr-only">Contract Details</legend>
          <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
            <div
              className="text-sm font-semibold leading-6 text-gray-900"
              aria-hidden="true"
            >
              Contract Record
            </div>
          </div>
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="joining_date"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Joining Date
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="date"
                  name="joining_date"
                  required={true}
                  value={form.joining_date}
                  onChange={handleChange}
                  id="joining_date"
                  autoComplete="joining_date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="designation"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Designation
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  name="designation"
                  id="designation"
                  onChange={handleChange}
                  value={form.designation}
                  autoComplete="designation"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Designation</option>
                  <option value={"High"}>High School</option>
                  <option value={"Primary"}>Primary School</option>
                </select>
              </div>
            </div>

            <br />
            <div className=" sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="package"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Package
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  name="package"
                  onChange={handleChange}
                  value={form.package}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className=" sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="approving_authority"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Approving Authority
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  onChange={handleChange}
                  value={form.approving_authority}
                  id="approving_authority"
                  name="approving_authority"
                  autoComplete="approving_authority"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </fieldset>

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
                          id="personalInfo"
                          name="personalInfo"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="documents"
                          className="font-medium text-gray-900"
                        >
                          Contact Information
                        </label>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="documents"
                          name="documents"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="documents"
                          className="font-medium text-gray-900"
                        >
                          Documents verified
                        </label>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="academicRecord"
                          name="academicRecord"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="academicRecord"
                          className="font-medium text-gray-900"
                        >
                          Academic record
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
          severity={teacherMutation.isSuccess ? "success" : "error"}
        >
          {message}
        </Alert>
      </Snackbar>

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
