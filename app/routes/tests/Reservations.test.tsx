import { screen, within } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

import { ReservationList } from '@/components/ReservationList';

import { renderComponent } from './testingHelpers';

describe('Reservations', () => {
  it('renders correct elements', async () => {
    const Stub = createRoutesStub([
      {
        path: '/reservations',
        Component: ReservationList,
        loader() {
          return [
            {
              id: 8,
              name: 'Reservation 1',
              userId: 47,
              roomId: 5,
              startDate: '2025-01-23T20:15:00.000Z',
              endDate: '2025-01-23T22:15:00.000Z',
              username: 'testuser',
              roomName: 'Room 5'
            },
            {
              id: 9,
              name: 'Reservation 2',
              userId: 47,
              roomId: 1,
              startDate: '2025-01-24T17:56:00.000Z',
              endDate: '2025-01-25T18:56:00.000Z',
              username: 'testuser',
              roomName: 'Room 1'
            }
          ];
        }
      }
    ]);

    renderComponent(<Stub initialEntries={['/reservations']} />);

    const reservationCards = await screen.findAllByTestId('reservation-card');

    expect(
      within(reservationCards[0]).getByText('Reservation 1')
    ).toBeInTheDocument();
    expect(within(reservationCards[0]).getByText('Room 5')).toBeInTheDocument();
    expect(
      within(reservationCards[0]).getByText('23.01.2025')
    ).toBeInTheDocument();

    expect(
      within(reservationCards[1]).getByText('Reservation 2')
    ).toBeInTheDocument();
    expect(within(reservationCards[1]).getByText('Room 1')).toBeInTheDocument();
    expect(
      within(reservationCards[1]).getByText('24.01.2025')
    ).toBeInTheDocument();
  });
});
