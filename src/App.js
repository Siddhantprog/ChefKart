import { useEffect, useState } from "react";
import { usePapaParse } from "react-papaparse";

import Table from "./components/Table";

const columns = [
  { label: "ID", accessor: "id", sortable: true },
  { label: "First Name", accessor: "first_Name", sortable: true },
  { label: "Last Name", accessor: "last_name", sortable: true },
  { label: "Email", accessor: "email", sortable: false },
  { label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc" },
  { label: "IP Address", accessor: "ip_address", sortable: true },
  { label: "Airport Code", accessor: "airport_code", sortable: true },
  { label: "Time", accessor: "time", sortable: true },
  { label: "Status", accessor: "status", sortable: true },
  { label: "Mobile", accessor: "mobile", sortable: true },
  { label: "Area", accessor: "area", sortable: true },
  { label: "Edit", accessor: "edit", sortable: true },
];

const App = () => {
  const [text, setText] = useState([]);
  const { readString } = usePapaParse();

  useEffect(() => {
    fetch("./MOCK_DATA.CSV")
      .then((res) => res.text())
      .then((res) => {
        readString(res, {
          worker: true,
          complete: (results) => {
            const csvData = results.data.map((el) => {
              const obj = {
                id: el[0],
                first_Name: el[1],
                last_name: el[2],
                email: el[3],
                gender: el[4],
                ip_address: el[5],
                airport_code: el[6],
                time: el[7],
                status: el[8],
                mobile: el[9],
                area: el[10],
                show: el[11],
                edit: el[12],
              };

              return obj;
            });

            csvData.shift();
            csvData.pop();
            console.log(csvData);
            setText(csvData);
          },
        });
      });
  }, [text]);

  return (
    <div className="table_container">
      <h1>Reusable sortable table with React</h1>
      {text.length > 0 && (
        <Table caption="Chef kart" data={text} columns={columns} />
      )}
    </div>
  );
};

export default App;
