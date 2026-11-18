const http = require("http");
const fs = require("fs");

let vehicles = [
  {
    id: 1,
    vehicleName: "Hyundai Creta",
    vehicleNumber: "HR26AB1234",
    type: "SUV",
    price: 1500000
  }
];

const server = http.createServer((req, res) => {

  // Home Route
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to Vehicle Management System</h1>");
  }

  // Vehicles Route
  else if (req.method === "GET" && req.url === "/vehicles") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(vehicles));
  }

  // About Route
  else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Vehicle Management Application");
  }

  // Info Route
  else if (req.method === "GET" && req.url === "/info") {

    fs.readFile("./public/info.html", (err, data) => {

      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading file");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }

    });
  }

  // Add Vehicle Route
  else if (req.method === "POST" && req.url === "/add-vehicle") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      try {

        const vehicle = JSON.parse(body);

        if (
          !vehicle.id ||
          !vehicle.vehicleName ||
          !vehicle.vehicleNumber ||
          !vehicle.type ||
          !vehicle.price
        ) {

          res.writeHead(400, { "Content-Type": "application/json" });

          return res.end(
            JSON.stringify({
              message: "Missing required fields"
            })
          );
        }

        vehicles.push(vehicle);

        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({
            message: "Vehicle added successfully"
          })
        );

      } catch {

        res.writeHead(400, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({
            message: "Invalid JSON"
          })
        );
      }
    });
  }

  // Invalid Routes
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route Not Found");
  }
});

server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});