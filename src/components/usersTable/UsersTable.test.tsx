import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import UsersTable from './UsersTable';
import type { IUser } from '../../types';

const usersMock: IUser[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
];

describe('UsersTable Component', () => {
  it('should render table of users', async () => {
    render(<UsersTable onRowClick={vi.fn()} users={usersMock} />);

    const firstUser = await screen.findByText('Leanne Graham');
    const secondUser = await screen.findByText('Ervin Howell');
    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();
  });

  it('should call onRowClick on row click and pass the user', async () => {
    const mockHandleRowClick = vi.fn();

    render(<UsersTable onRowClick={mockHandleRowClick} users={usersMock} />);

    const firstUserName = await screen.findByText('Leanne Graham');

    fireEvent.click(firstUserName);

    expect(mockHandleRowClick).toHaveBeenCalledTimes(1);
    expect(mockHandleRowClick).toHaveBeenCalledWith(usersMock[0]);
  });
});
