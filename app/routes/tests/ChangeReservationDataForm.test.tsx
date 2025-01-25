import { screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

import { ChangeReservationDataForm } from '@/components/forms/ChangeReservationDataForm';
import { renderComponent } from './testingHelpers';

describe('ChangeReservationData', () => {
  it('renders correct elements', async () => {
    const exampleReservation = {
      id: 8,
      name: 'Reservation 1',
      userId: 47,
      roomId: 5,
      startDate: '2025-01-23T20:15:00.000Z',
      endDate: '2025-01-23T22:15:00.000Z',
      username: 'testuser',
      roomName: 'Room 5'
    };
    const Stub = createRoutesStub([
      {
        path: '/reservations/1',
        Component: ChangeReservationDataForm,
        loader() {
          return {
            reservation: exampleReservation,
            existingReservations: []
          };
        }
      }
    ]);

    renderComponent(<Stub initialEntries={['/reservations/1']} />, {
      isAuthenticated: true
    });
    expect(
      await screen.findByRole('heading', {
        name: /change reservation with id=8 for the room 5/i
      })
    ).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Reservation name')).toHaveValue(
      'Reservation 1'
    );

    expect(await screen.findByPlaceholderText('Start date')).toHaveValue(
      '2025-01-23T21:15'
    );
    expect(await screen.findByPlaceholderText('End date')).toHaveValue(
      '2025-01-23T23:15'
    );
  });
});
