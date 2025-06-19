import { Dialog as DialogBaseUI } from '@base-ui-components/react/dialog';
import type { IDialogProps } from './types';
import InternalButton from './InternalButton';

const Dialog = ({
  title,
  content,
  onOpenChange,
  open,
  actionButtons,
  openButton,
  loading,
}: IDialogProps) => {
  return (
    <DialogBaseUI.Root
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
    >
      {openButton}
      <DialogBaseUI.Portal>
        <DialogBaseUI.Backdrop
          className={`fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 ${loading && 'animate-pulse'}`}
        />
        <DialogBaseUI.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
          <DialogBaseUI.Title className="-mt-1.5 mb-1 text-lg font-medium">
            {title}
          </DialogBaseUI.Title>
          {content}
          <div className="flex justify-end gap-4">
            <InternalButton isCloseButton disabled={loading}>
              Close
            </InternalButton>
            {actionButtons}
          </div>
        </DialogBaseUI.Popup>
      </DialogBaseUI.Portal>
    </DialogBaseUI.Root>
  );
};

export default Dialog;
