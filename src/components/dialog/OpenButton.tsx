import { Dialog as DialogBaseUI } from '@base-ui-components/react/dialog';
import type { TOpenButtonProps } from './types';

const OpenButton = (props: TOpenButtonProps) => {
  return (
    <DialogBaseUI.Trigger
      {...props}
      className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-500"
    />
  );
};

export default OpenButton;
