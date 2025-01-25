import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

import { SelectRoomForm } from '@/components/forms/SelectRoomForm';

describe('SelectRoomForm', () => {
  it('renders error messages', async () => {
    const Stub = createRoutesStub([
      {
        path: '/create-reservation',
        Component: SelectRoomForm,
        loader() {
          return [
            {
              id: 1,
              name: 'Room 1'
            },
            {
              id: 2,
              name: 'Room 2'
            }
          ];
        }
      }
    ]);

    render(<Stub initialEntries={['/create-reservation']} />);

    const butttons = await screen.findAllByRole('button');
    expect(butttons).toHaveLength(2);
    expect(butttons[0]).toHaveTextContent('Room 1');
    expect(butttons[1]).toHaveTextContent('Room 2');
  });
});
