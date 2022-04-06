import { useEffect, useState } from "react";
// import "./App.css";
import { Helmet } from "react-helmet";
import { Button, Alert } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import CarModal from "./CarModal";
import UserModal from "./UserModal";
import CarList from "./CarList";
import SelectModal from "./SelectModal";
import Meta from "./Meta";

function App() {
  const [carList, setCarList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState("");
  const [alert, setAlert] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const addCar = (newCar) => {
    // TODO: call backend API to store the car in database
    localStorage.setItem(
      "car_list",
      JSON.stringify([...carList, newCar], 0, 2)
    );
    setCarList((prev) => [...prev, newCar]);
  };

  useEffect(() => {
    const carListString = localStorage.getItem("car_list");
    if (carListString) {
      setCarList(JSON.parse(carListString, 0, 2));
    }
    const userListString = localStorage.getItem("user_list");
    if (userListString) {
      setUserList(JSON.parse(userListString, 0, 2));
    }
    const userString = localStorage.getItem("current_user");
    if (userString) {
      setUser(JSON.parse(userString, 0, 2));
    }
  }, []);

  const loginUser = (data) => {
    const match = userList.find((elem) => elem.email === data.email);
    if (!match) setAlert("user not found");
    else if (match.password !== data.password) setAlert("password not matched");
    else {
      setUser(match);
      localStorage.setItem("current_user", JSON.stringify(match, 0, 2));
    }
  };

  const registerUser = (data) => {
    const match = userList.find((elem) => elem.email === data.email);
    if (match) setAlert("duplicate email");
    else {
      const newUser = { ...data, id: uuidv4().slice(0, 8) };
      setUserList((prev) => [...prev, newUser]);
      localStorage.setItem(
        "user_list",
        JSON.stringify([...carList, newUser], 0, 2)
      );
      localStorage.setItem("current_user", JSON.stringify(newUser, 0, 2));
      setUser(newUser);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("current_user");
    setUser(null);
  };

  // TODO: call API to retrieve car list
  return (
    <div style={{ marginLeft: "30%", marginTop: "5%", width: "100%" }}>
      <Helmet>
        <title>Distributed Car Rental</title>
      </Helmet>
      <h1>
        Welcome {user ? user.name : "to Distributed Car Rentals"}!{" "}
        {user ? `(user id: ${user.id})` : ""}
      </h1>
      {alert && <Alert color="danger">{alert}</Alert>}
      <Button
        color="primary"
        outline
        onClick={() => {
          setModal(user ? "new_car" : "user");
        }}
      >
        I want to provide my car!
      </Button>
      {!user && (
        <Button
          color="success"
          outline
          className="ms-2"
          onClick={() => {
            setModal("user");
          }}
        >
          Login
        </Button>
      )}
      {user && (
        <>
          {/* <Button
            color="success"
            outline
            className="ms-2"
            onClick={() => {Meta}}
          >
            Connect to Wallet
          </Button> */}
          {/* <Meta
          /> */}
          <Button className="ms-2" color="danger" outline onClick={onLogout}>
            Logout
          </Button>
        </>
      )}
      <Meta />
      <CarList
        list={carList}
        setModal={setModal}
        user={user}
        setSelectedCar={setSelectedCar}
      />
      <CarModal
        isOpen={modal === "new_car"}
        dismiss={() => setModal("")}
        onSubmit={(newCar) => addCar(newCar)}
        user={user}
      />
      <UserModal
        isOpen={modal === "user"}
        dismiss={() => setModal("")}
        onLogin={(newUser) => loginUser(newUser)}
        onRegister={(newUser) => registerUser(newUser)}
      />
      <SelectModal
        isOpen={modal === "select_car"}
        dismiss={() => setModal("")}
        selectedCar={selectedCar}
      />
    </div>
  );
}

export default App;
