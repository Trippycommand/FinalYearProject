import React, { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Loading } from '@nextui-org/react'

export default function TransactionStatus() {
  const [open, setOpen] = useState(true)

  // To prevent closing of the dialog
  function handleClose() {
    setOpen(true)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[99999] overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-0"
            leaveTo="opacity-100"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="status inline-block transform overflow-hidden rounded-lg border bg-white py-6 text-center align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle md:w-[35%]">
              <div className="items-center justify-center px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6">
                <Loading>Completing the transaction</Loading>.
              </div>
              <p className="items-center justify-center px-4 py-4 text-sm text-black sm:flex sm:flex-row-reverse sm:px-6">
                (Transaction would usually take &lt; 1 minute...) .
              </p>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
