import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, vi, describe } from 'vitest';
import Photo from './Photo';
import type { IPhotoProps } from './types';
import type { IPhoto } from '../../../types';

const mockPhoto: IPhoto = {
  id: 123,
  url: 'https://example.com/mock-photo.jpg',
  albumId: 1,
  thumbnailUrl: 'https://example.com/mock-photo.jpg',
  title: 'Test Photo Title',
};

describe('Photo Component', () => {
  const renderPhotoComponent = (props?: Partial<IPhotoProps>) => {
    const defaultProps: IPhotoProps = {
      photo: mockPhoto,
      onDelete: vi.fn(),
      onDeleteLoading: false,
      canDelete: true,
    };
    return render(<Photo {...defaultProps} {...props} />);
  };

  it('renders the photo with correct src and alt text', () => {
    renderPhotoComponent();

    const image = screen.getByAltText(mockPhoto.title);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPhoto.url);
  });

  describe('Delete Button Visibility', () => {
    it('shows the delete button when canDelete is true', () => {
      renderPhotoComponent({ canDelete: true });

      const deleteIconContainer = screen.getByTestId('delete-button-container');
      expect(deleteIconContainer).toBeInTheDocument();
    });

    it('hides the delete button when canDelete is false', () => {
      renderPhotoComponent({ canDelete: false });

      expect(
        screen.queryByTestId('delete-button-container'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Delete Functionality', () => {
    it('calls onDelete when the delete button is clicked and not loading', async () => {
      const mockOnDelete = vi.fn();
      renderPhotoComponent({
        onDelete: mockOnDelete,
        onDeleteLoading: false,
        canDelete: true,
      });

      const deleteButton = screen.getByTestId('delete-button');
      fireEvent.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });
  });
});
