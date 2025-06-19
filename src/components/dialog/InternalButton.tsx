import { Dialog as DialogBaseUI } from '@base-ui-components/react/dialog';
import type { IInternalButtonProps } from './types';

const InternalButton = ({
  isCloseButton,
  danger,
  ...props
}: IInternalButtonProps) => {
  if (isCloseButton)
    return (
      <DialogBaseUI.Close
        {...props}
        className={`flex h-10 items-center justify-center rounded-md border text-base font-medium select-none px-3.5
            ${
              danger
                ? 'border-red-200 bg-red-50 text-red-900 hover:bg-red-100'
                : 'border-gray-200 bg-gray-50 text-gray-900  hover:bg-gray-100 '
            }    
        `}
      />
    );
  return (
    <button
      {...props}
      className={`flex h-10 items-center justify-center rounded-md border text-base font-medium select-none px-3.5
        ${
          danger
            ? 'border-red-200 bg-red-50 text-red-900 hover:bg-red-100 disabled:bg-red-100 disabled:text-red-400'
            : 'border-gray-200 bg-gray-50 text-gray-900  hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-500'
        }    
    `}
    />
  );
};

export default InternalButton;
