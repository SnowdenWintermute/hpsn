import { Update } from "./../buttons/update";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";

import { useState, useEffect } from "react";

const calculateYearDifference = (dateString) => {
  const admissionDate = new Date(dateString);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate - admissionDate;
  const diffInYears = diffInMilliseconds / 1000 / 60 / 60 / 24 / 365;

  return Math.floor(diffInYears);
};


export default function ProfilePage({ student }) {
  const [Profile, setProfile] = useState(null);
  if (!student) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    if (student) {
      setProfile(student.result);
    }
  }, [student]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="px-4 pt-5 sm:px-0">
        <h3 className="text-xl tracking-widest font-bold leading-10 text-gray-500">
          Student Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t  border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Name
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow ">{Profile?.Name}</span>{" "}
              <span
                className={
                  Profile?.status.isActive
                    ? "inline-flex ml-5 items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-gray-600"
                    : "inline-flex ml-5 items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-gray-600"
                }
              >
                <svg
                  className={
                    Profile?.status.isActive
                      ? "h-1.5 w-1.5  fill-green-400"
                      : ""
                  }
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>
                {Profile?.status.isActive ? "Active" : "Inactive"}
              </span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Class
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{Profile?.Section}</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Admission Date
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {formatDate(Profile?.Admission_Date)}
              </span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Registration No
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{Profile?.Registration_No}</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Father Name
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{Profile?.Father_Name}</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Gender
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{Profile?.Gender}</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Date of Birth
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{Profile?.DOB}</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Address
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{Profile?.Address}</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Phone Number
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">0{Profile?.Phone_No}</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Fathers Occupation
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{Profile?.Fathers_Occupation}</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Class
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{Profile?.ClassID}</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Email address
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">margotfoster@example.com</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Salary expectation
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">$120,000</span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              About
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </span>
              <span className="ml-4 flex-shrink-0">
                <Update />
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-500">
              Attachments
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-500"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        resume_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-500">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0 space-x-4">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                    <span className="text-gray-500" aria-hidden="true">
                      |
                    </span>
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-gray-500 hover:text-gray-500"
                    >
                      Remove
                    </button>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-500"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        coverletter_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-500">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0 space-x-4">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                    <span className="text-gray-500" aria-hidden="true">
                      |
                    </span>
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-gray-500 hover:text-gray-500"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
