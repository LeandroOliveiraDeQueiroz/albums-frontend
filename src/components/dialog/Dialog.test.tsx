import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi, describe } from 'vitest';
import type { IDialogProps } from './types';
import Dialog from './Dialog';
import InternalButton from './InternalButton';

const defaultProps: IDialogProps = {
  open: true,
  onOpenChange: vi.fn(),
  title: 'Dialog Test',
  loading: false,
  actionButtons: (
    <>
      <InternalButton danger data-testid="dialog-delete-button">
        Delete
      </InternalButton>
      <InternalButton data-testid="dialog-save-button">Save</InternalButton>
    </>
  ),
  content: <div />,
  openButton: <button data-testid="dialog-open-button" />,
};

describe('Dialog Component', () => {
  const renderPhotoComponent = (props?: Partial<IDialogProps>) => {
    return render(<Dialog {...defaultProps} {...props} />);
  };

  it('should render title, content, and action buttons when the dialog is open', () => {
    const title = 'Dialog Test';
    const textContent = 'Text Content';
    const content = <div data-testid="dialog-content">{textContent}</div>;
    renderPhotoComponent({
      title,
      content,
    });

    expect(screen.getByText(title));
    expect(screen.getByTestId('dialog-content')).toHaveTextContent(textContent);

    expect(screen.getByTestId('dialog-save-button')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-delete-button')).toBeInTheDocument();

    expect(screen.getByTestId('dialog-close-button')).toBeInTheDocument();
  });

  it('should render title, content, action buttons when the dialog is closed', () => {
    renderPhotoComponent({
      open: false,
    });

    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();

    expect(screen.queryByTestId('dialog-save-button')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('dialog-delete-button'),
    ).not.toBeInTheDocument();

    expect(screen.queryByTestId('dialog-close-button')).not.toBeInTheDocument();
  });

  it('should call onOpenChange with false when the close button is clicked', () => {
    const mockOnOpenChange = vi.fn();
    renderPhotoComponent({
      open: true,
      onOpenChange: mockOnOpenChange,
    });

    const closeButton = screen.getByTestId('dialog-close-button');
    fireEvent.click(closeButton);

    expect(mockOnOpenChange).toHaveBeenCalledTimes(1);
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('should render the open button when the dialog is closed', () => {
    renderPhotoComponent({
      open: false,
    });

    const openButton = screen.getByTestId('dialog-open-button');
    expect(openButton).toBeInTheDocument();
  });
});
