import type { ReactNode } from 'react';

export interface IDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: ReactNode;
  openButton?: ReactNode;
  actionButtons?: ReactNode;
  loading?: boolean;
}

export type TOpenButtonProps = React.ComponentProps<'button'>;

export interface IInternalButtonProps extends React.ComponentProps<'button'> {
  isCloseButton?: boolean;
  danger?: boolean;
}
