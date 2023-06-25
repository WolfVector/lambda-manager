"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export function ModalAreYouSure({ yesHandler, closeHandler, isOpen }){
  const dialogRef = useRef(null)

  useEffect(() => {
    if(isOpen) dialogRef.current.showModal()
    else dialogRef.current.close()
  }, [isOpen])

  useEffect(() => {
    dialogRef.current.addEventListener('cancel', closeHandler)

    return () => {
      dialogRef.current.removeEventListener('cancel', closeHandler)
    }
  }, [])

  return (
    <dialog ref={dialogRef} className="w-1/4 rounded">
      <form className="flex justify-end" method="dialog">
        <button onClick={closeHandler} type="submit" autoFocus><Image alt="close icon" src="/img/close-circle-svgrepo-com.svg" width={20} height={20} /></button>
      </form>
      <div className="mt-6 text-center">
        <div className="font-medium text-xl mb-4">Are you sure?</div>
        <button onClick={yesHandler} className="py-2 px-4 mr-2 rounded-md bg-blue-400 text-white">Yes</button>
        <button onClick={closeHandler} className="p-2 rounded-md border">Cancel</button>
      </div>
    </dialog>
  )
}