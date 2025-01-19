import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("/reservations", "routes/Reservations.tsx"),
  route("/create-reservation", "routes/CreateReservation.tsx"),
  route("/sign-in", "routes/Login.tsx"),
  route("/sign-up", "routes/Signup.tsx"),
  route("/reservations/:reservationId", "routes/ChangeReservationData.tsx"),
] satisfies RouteConfig;
