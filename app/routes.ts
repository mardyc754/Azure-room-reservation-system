import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/Home.tsx'),
  route('/reservations', 'routes/Reservations.tsx'),
  route('/create-reservation/:roomId', 'routes/CreateReservation.tsx'),
  route('/create-reservation', 'routes/SelectRoom.tsx'),

  route('/sign-in', 'routes/Login.tsx'),
  route('/sign-up', 'routes/Signup.tsx'),
  route('/reservations/:reservationId', 'routes/ChangeReservationData.tsx'),

  route('/logout', 'routes/api/Logout.tsx'),
  route(
    '/reservations/:reservationId/cancel',
    'routes/api/CancelReservation.tsx'
  )
] satisfies RouteConfig;
