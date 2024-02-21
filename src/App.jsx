import { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import PatientList from "./components/PatientList";

function App() {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const setPatientsFromLocalStorage = () => {
      const patientsFromLocalStorage = JSON.parse(localStorage.getItem("patients")) ?? [];
      patientsFromLocalStorage?.length > 0 && setPatients(patientsFromLocalStorage);
    };

    setPatientsFromLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const deletePatient = (id) => {
    const newPatientsAfterDeletePatient = patients.filter(
      (patientFromPatients) => patientFromPatients.id !== id
    );
    setPatients(newPatientsAfterDeletePatient);
  };

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <PatientList patients={patients} setPatient={setPatient} deletePatient={deletePatient} />
      </div>
    </div>
  );
}

export default App;
