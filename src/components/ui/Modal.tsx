import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import type { ReactNode } from 'react'

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  title?: string
}

function Modal({ isOpen, closeModal, children, title }: IProps) {

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-[2px] bg-black/30">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {title ? <DialogTitle as="h3" className="text-lg font-bold text-indigo-700 mb-4">
                {title}
              </DialogTitle> : null}
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Modal;