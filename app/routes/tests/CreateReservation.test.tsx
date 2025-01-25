import { screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

import { CreateReservationForm } from '@/components/forms/CreateReservationForm';
import { renderComponent } from './testingHelpers';

describe('CreateReservation', () => {
  it('renders correct elements', async () => {
    const Stub = createRoutesStub([
      {
        path: '/create-reservation/1',
        Component: CreateReservationForm,
        loader() {
          return {
            room: {
              id: 1,
              name: 'Room 1'
            },
            reservations: []
          };
        }
      }
    ]);

    renderComponent(<Stub initialEntries={['/create-reservation/1']} />, {
      isAuthenticated: true
    });
    expect(
      await screen.findByPlaceholderText('Reservation name')
    ).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText('Start date')
    ).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('End date')).toBeInTheDocument();
  });
});
