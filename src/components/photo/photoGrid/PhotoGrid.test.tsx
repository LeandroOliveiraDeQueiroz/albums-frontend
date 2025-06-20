import { render, screen } from '@testing-library/react';
import { expect, it, vi, describe } from 'vitest';
import type { IPhotoGridProps } from './types';
import type { IPhoto } from '../../../types';
import PhotoGrid from './PhotoGrid';

const mockPhotos: IPhoto[] = [
  {
    id: 123,
    url: 'https://example.com/mock-photo.jpg',
    albumId: 1,
    thumbnailUrl: 'https://example.com/mock-photo.jpg',
    title: 'Test 1 Photo Title',
  },
  {
    id: 456,
    url: 'https://example.com/mock-photo.jpg',
    albumId: 1,
    thumbnailUrl: 'https://example.com/mock-photo.jpg',
    title: 'Test 2 Photo Title',
  },
];

describe('PhotoGrid Component', () => {
  const renderPhotoComponent = (props?: Partial<IPhotoGridProps>) => {
    const defaultProps: IPhotoGridProps = {
      photos: mockPhotos,
      onDelete: vi.fn(),
      onDeleteLoading: false,
    };
    return render(<PhotoGrid {...defaultProps} {...props} />);
  };

  it('should render the photos with correct alt and src', () => {
    renderPhotoComponent();

    const firstPhoto = screen.getByAltText(mockPhotos[0].title);
    const secondPhoto = screen.getByAltText(mockPhotos[1].title);

    expect(firstPhoto).toBeInTheDocument();
    expect(firstPhoto).toHaveAttribute('src', mockPhotos[0].url);
    expect(secondPhoto).toBeInTheDocument();
    expect(secondPhoto).toHaveAttribute('src', mockPhotos[1].url);
  });

  describe('Delete Buttons Visibility', () => {
    it('should render the delete buttons when onDelete exist', () => {
      renderPhotoComponent({ onDelete: vi.fn() });

      const photoContainers = screen.getAllByTestId('delete-button-container');
      expect(photoContainers).toHaveLength(mockPhotos.length);
    });

    it('should hide delete buttons when onDelete does not exist', () => {
      renderPhotoComponent({ onDelete: undefined });

      expect(() => screen.getAllByTestId('delete-button-container')).toThrow();
    });
  });
});
