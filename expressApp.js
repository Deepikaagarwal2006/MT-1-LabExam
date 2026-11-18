const express = require("express");

const app = express();

app.use(express.json());

let vehicles = [
  {
    id: 1,
    vehicleName: "Hyundai Creta",
    vehicleNumber: "HR26AB1234",
    type: "SUV",
    price: 1500000
  },
  {
    id: 2,
    vehicleName: "Maruti Swift",
    vehicleNumber: "DL8CAF5030",
    type: "Hatchback",
    price: 750000
  },
  {
    id: 3,
    vehicleName: "Honda City",
    vehicleNumber: "UP14AB9999",
    type: "Sedan",
    price: 1200000
  }
];

// GET ALL
app.get("/vehicles", (req, res) => {
  res.json(vehicles);
});

// GET BY ID
app.get("/vehicles/:id", (req, res) => {

  const vehicle = vehicles.find(
    v => v.id == req.params.id
  );

  if (!vehicle) {
    return res.status(404).json({
      message: "Vehicle not found"
    });
  }

  res.json(vehicle);
});

// POST
app.post("/vehicles", (req, res) => {

  const { id, vehicleName, vehicleNumber, type, price } = req.body;

  if (
    !id ||
    !vehicleName ||
    !vehicleNumber ||
    !type ||
    !price ||
    price <= 0
  ) {

    return res.status(400).json({
      message: "Invalid Data"
    });
  }

  const newVehicle = {
    id,
    vehicleName,
    vehicleNumber,
    type,
    price
  };

  vehicles.push(newVehicle);

  res.status(201).json({
    message: "Vehicle added successfully",
    vehicle: newVehicle
  });
});

// PUT
app.put("/vehicles/:id", (req, res) => {

  const index = vehicles.findIndex(
    v => v.id == req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Vehicle not found"
    });
  }

  vehicles[index] = {
    ...vehicles[index],
    ...req.body
  };

  res.json({
    message: "Vehicle updated successfully",
    vehicle: vehicles[index]
  });
});

// DELETE
app.delete("/vehicles/:id", (req, res) => {

  const index = vehicles.findIndex(
    v => v.id == req.params.id
  );

  if (index === -1) {

    return res.status(404).json({
      message: "Vehicle not found"
    });

  }

  const deleted = vehicles.splice(index, 1);

  res.json({
    message: "Vehicle deleted successfully",
    vehicle: deleted[0]
  });
});

app.listen(4000, () => {
  console.log("Express Server running at http://localhost:4000");
});