import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Box,
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import ContentPasteGoSharpIcon from "@mui/icons-material/ContentPasteGoSharp";
import PriceCheckSharpIcon from "@mui/icons-material/PriceCheckSharp";

function PaymentManager() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(""); // Add this line
  const [classStats, setClassStats] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);

  // const { isLoading, error, data } = useQuery(
  //   ["students", selectedClassId],
  // const { data } =  axios.get(`http://localhost:3100/students/getAllWPayID/${selectedClassId}`)

  // );

  useEffect(() => {
    axios
      .get("http://localhost:3100/students/a/a/getclasses")
      .then((response) => {
        setClasses(response.data);
        console.log(students);
      })
      .catch((error) => {
        console.error("Error fetching classes: ", error);
      });
  }, [students]);

  const getStats = async () => {
    axios
      .get(`http://localhost:3100/class/stats/detailed/${selectedClassId}`)
      .then((response) => {
        const stats = response.data[0];

        setClassStats(stats);
        console.log(stats);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (event) => {
    const selectedClassId = event.target.value;
    setSelectedClassId(selectedClassId);

    axios
      .get(`http://localhost:3100/students/getAllWPayID/${selectedClassId}`)
      .then((response) => {
        // Map class IDs to class names
        const classMap = classes.reduce((map, cls) => {
          map[cls._id] = cls.ClassName;

          console.log(map);
          return map;
        }, {});

        // Add class names to students
        const studentsWithClassNames = response.data.map((student) => {
          return { ...student, ClassName: classMap[student.ClassID] || "N/A" };
        });
        console.log(studentsWithClassNames);
        // Set the updated students array to state
        setStudents(studentsWithClassNames);
        setFilteredStudents(studentsWithClassNames);
        console.log(students);
        console.log(filteredStudents);
      })
      .catch((error) => {
        console.error("Error fetching students: ", error);
      });
  };

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
  const registerPayment = (studentId) => {
    axios
      .post("http://localhost:3100/students/registerPayment", {
        studentId,
        classId: selectedClassId,
      })
      .then((response) => {
        console.log("Payment registered: ", response.data);
        // After a successful payment registration, fetch the updated list of students
        return axios.get(
          `http://localhost:3100/students/getAllWPayID/${selectedClassId}`
        );
      })
      .then((response) => {
        console.log(response);
        // Map class IDs to class names
        const classMap = classes.reduce((map, cls) => {
          map[cls._id] = cls.ClassName;
          console.log(map);
          return map;
        }, {});

        // Add class names to students
        const studentsWithClassNames = response.data.map((student) => {
          return { ...student, ClassName: classMap[student.ClassID] || "N/A" };
        });

        // Set the updated students array to state
        setStudents(studentsWithClassNames);
        setFilteredStudents(studentsWithClassNames);
        getStats();
        handleClick("success", "Payment registered successfully");
      })
      .catch((error) => {
        console.error("Error registering payment: ", error);
        handleClick("error", "Error registering payment");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3100/class/stats/detailed/${selectedClassId}`)
      .then((response) => {
        const stats = response.data[0];

        setClassStats(stats);

        console.log(stats);
      })
      .catch((err) => console.error(err));
  }, [selectedClassId]);

  const removePayment = (studentId, payID) => {
    axios
      .post("http://localhost:3100/students/removePayment", {
        studentId,
        payID,
      })
      .then((response) => {
        console.log("Payment registered: ", response.data);
        // After a successful payment registration, fetch the updated list of students
        return axios.get(
          `http://localhost:3100/students/getAllWPayID/${selectedClassId}`
        );
      })
      .then((response) => {
        // Map class IDs to class names
        const classMap = classes.reduce((map, cls) => {
          map[cls._id] = cls.ClassName;
          console.log(map);
          return map;
        }, {});

        // Add class names to students
        const studentsWithClassNames = response.data.map((student) => {
          return { ...student, ClassName: classMap[student.ClassID] || "N/A" };
        });

        // Set the updated students array to state
        setStudents(studentsWithClassNames);
        setFilteredStudents(studentsWithClassNames);
        getStats();
        handleClick("error", "Payment removed successfully");
      })
      .catch((error) => {
        handleClick("error", "Error removing payment");
        console.error("Error registering payment: ", error);
      });
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClick = (severity, msg) => {
    setSeverity(severity);
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const columns = [
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ClassName",
      headerName: "Class",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Section",
      headerName: "Section",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => (params.value ? "Paid" : "Not Paid"),
      //   cellClassName: (params) => (params.value ? styles.paid : styles.notPaid),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <Button
              disabled={params.row.paymentStatus}
              onClick={() => registerPayment(params.row._id)}
              size="small"
            >
              <PriceCheckSharpIcon />
            </Button>
            <Button
              disabled={!params.row.paymentStatus}
              onClick={() => removePayment(params.row._id, params.row.payID)}
              size="small"
            >
              Undo
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      {/* <Header /> */}
      <div>
        <div className="grid grid-cols-1">
          <div className="flex justify-center p-1  bg-gray-300 items-center">
            <FormControl sx={{ width: "150px" }} margin="normal">
              <Select
                style={{
                  width: "150px",
                  display: "flex",
                  justifyContent: "center",
                  color: "gray",
                }}
                onChange={handleChange}
                label="Select Class"
                size="small"
              >
                {classes.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.ClassName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {Object.keys(studentsBySection).map((section) => (
              <Button
                sx={{ color: "#5c6f83" }}
                key={section}
                onClick={() => setFilteredStudents(studentsBySection[section])}
                size="small"
              >
                {section}
              </Button>
            ))}
            <Button size="small" onClick={() => setFilteredStudents(students)}>
              Clear filter
            </Button>
          </div>

          <div
            style={{ height: 400, width: "100%" }}
            className="bg-gray text-gray"
          >
            <DataGrid
              rows={filteredStudents.map((student, index) => ({
                id: index + 1,
                ...student,
              }))}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              className="text-gray"
            />
          </div>
        </div>
        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Users
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in your account including their name,
                  title, email and role.
                </p>
              </div>
            </div>
          </div>
        </div>

        {classStats ? (
          <div className="mt-8 flow-root overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <table className="w-full text-left">
                <caption className="text-blue-600">Class Statistics</caption>
                <th className="bg-white">
                  <th
                    scope="col"
                    className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Students
                    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Paid
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                  >
                    Unpaid
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Collection
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <tr>
                    <td align="center"> Students</td>
                    <td>Paid</td>
                    <td>Unpaid</td>
                    <td>Collection</td>
                  </tr>
                </th>
                <tbody>
                  <tr>
                    <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                      {classStats.total}
                      <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                      <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {classStats.paid}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                      {classStats.unpaid}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      Rs.{classStats.totalAmountPaid}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="&MuiTable-root flex flex-row"
              >
                <caption>Section Statistics</caption>
                <TableHead className="bg-gray-50 ">
                  <TableRow>
                    <TableCell></TableCell>
                    {classStats.sections.map((section) => (
                      <TableCell key={section.section} className="flex">
                        {section.section}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className="flex flex-col">
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Students
                    </TableCell>
                    {classStats.sections.map((section) => (
                      <TableCell align="center" key={section.section}>
                        {section.total}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Paid
                    </TableCell>
                    {classStats.sections.map((section) => (
                      <TableCell align="center" key={section.section}>
                        {section.paid}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Unpaid
                    </TableCell>
                    {classStats.sections.map((section) => (
                      <TableCell align="center" key={section.section}>
                        {section.unpaid}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Collection
                    </TableCell>
                    {classStats.sections.map((section) => (
                      <TableCell align="center" key={section.section}>
                        {section.totalAmountPaid}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </>
          </div>
        ) : null}

        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default PaymentManager;
