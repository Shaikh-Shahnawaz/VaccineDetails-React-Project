import { useState, useEffect } from "react";
import PieChart from "./components/pieChart";
import "./App.css";
function App() {
  const [currentDate, setCurrentDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  }); // Current Date Fetch from current_date.json in public/data

  const [vaccineDates, setVaccineDates] = useState([]); // List Of Vaccine Dates Fetch from vaccine_dates.json in public/data

  function getDate() {
    fetch("data/current_date.json")
      .then((res) => res.json())
      .then((data) => {
        let date = data.current_date.split("-");
        let day = parseInt(date[2]);
        let month = parseInt(date[1]);
        let year = parseInt(date[0]);
        // console.log(day,month,year)

        currentDate.day = day;
        currentDate.month = month;
        currentDate.year = year;
        setCurrentDate({ ...currentDate });
      });
  }
  useEffect(() => {
    // Use fetch() to fetch requited data from public/data
    fetch("data/vaccine_dates.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setVaccineDates(data);
      });

    // get date

    getDate();
  }, []);

  function nextDate() {
    if (currentDate.day < 30) {
      currentDate.day += 1;
      setCurrentDate({ ...currentDate });
    } else if (currentDate.day == 30) {
      currentDate.day = 1;
      currentDate.month = currentDate.month + 1;
      setCurrentDate({ ...currentDate });
    }
  }

  function previousDate() {
    if (currentDate.day > 1) {
      currentDate.day -= 1;
      setCurrentDate({ ...currentDate });
    } else if (currentDate.day == 1) {
      currentDate.day = 30;
      currentDate.month = currentDate.month - 1;
      setCurrentDate({ ...currentDate });
    }
  }

  //  Number of people who vaccinated

  let startDate = vaccineDates.filter((ele) => {
    if (currentDate.day < 10 || currentDate.month < 10) {
      return (
        ele.vaccination_date <
        String(
          currentDate.year +
            "-" +
            0 +
            currentDate.month +
            "-" +
            0 +
            currentDate.day
        )
      );
    } else {
      return (
        ele.vaccination_date <
        String(
          currentDate.year + "-" + currentDate.month + "-" + currentDate.day
        )
      );
    }
  });

  // console.log("=====>>>>", startDate);
  // console.log("<<<=====>>>>", vaccineDates);

  return (
    <div className="App container-fluid">
      <div className="bg-dark text-light "><h1> Vaccination Center Details </h1></div>
      {/* ------------------------------------------button div------------------------------------------ */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="date mt-4"
      >
        <button className="btn btn-outline-dark" onClick={nextDate}>
          +
        </button>{" "}
        {/* Set Current Date to next date on click  */}
        <div
          style={{ marginLeft: "15px", marginRight: "15px" }}
          className="currentdate bg-warning px-3 py-2"
        >
          <strong>
            {currentDate.day}-{currentDate.month}-{currentDate.year}
          </strong>
        </div>
        <button className="btn btn-outline-dark" onClick={previousDate}>
          -
        </button>{" "}
        {/* Set Current Date to drevious date on click  */}
      </div>

      {/* -------------------------------------table div------------------------------------- */}

      <div className="container mt-2">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Vaccination Status</th>
            </tr>
          </thead>
          <tbody>
            {
            vaccineDates.map((ele)=>(


              ele.vaccination_date <
        String(
          currentDate.year +
            "-" +
            0 +
            currentDate.month +
            "-" +
            0 +
            currentDate.day
        ) ? 
              <tr>
              <th className="bg-danger" scope="row">{ele.person_id}</th>
              <td>{ele.person_name}</td>
              <td className="bg-danger text-light" >Vaccine Done</td>
              
            </tr>
          :
          
              <tr>
              <th className="bg-success" scope="row">{ele.person_id}</th>
              <td>{ele.person_name}</td>
              <td className="bg-success text-light" >Vaccine Pending</td>
            </tr>
          

            ))
            }
          </tbody>
        </table>
      </div>

      {/* -------------------------------------------pie chart div------------------------------------------- */}
      <div className="chart">
        {/* Update the following Component to display pie chart with proper data, alignment and colors */}
        <PieChart
          allUser={[vaccineDates.length]}
          data={[startDate.length, vaccineDates.length - startDate.length]}
        />
      </div>

      {/* Add a table with the user data as explained in README.MD */}
    </div>
  );
}

export default App;
