"use client"
import { ModalAreYouSure } from "@/components/Modal";
import { handleAsyncReq } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function FilesRow({ files }) {
  const [deleteModal, setDeleteModal] = useState(false)
  const [fileToDelete, setFileToDelete] = useState(null)
  const [fileList, setFileList] = useState(files)

  /*useEffect(() => {
    setFileList(files)
  }, [files])*/

  async function confirmDelete() {
    setDeleteModal(false)

    const id = toast.loading("Deleting file...")

    const res = await handleAsyncReq(`/api/files/${fileToDelete}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      cache: "no-store"
    })

    if(res === false) toast.update(id, { render: "There was some problem on the server", type: "error", isLoading: false, autoClose: 3000 });
    else if(!res.ok) toast.update(id, { render: "There was a problem while deleting the file", type: "error", isLoading: false, autoClose: 3000});
    else {
      files = fileList.filter((item) => item !== fileToDelete);
      setFileList(files);

      toast.update(id, { render: "File deleted", type: "success", isLoading: false, autoClose: 3000 });
    }
    
    setFileToDelete(null)
  }

  function closeHandler(evt) {
    setDeleteModal(false)
    setFileToDelete(null)
  }

  function handleDeleteModal(file) {
    setDeleteModal(true)
    setFileToDelete(file)
  }

  return (
    <>
    <ToastContainer pauseOnFocusLoss={false} />
    <table className="mt-8 w-full divide-y divide-gray-200">
      <thead className="text-sm">
        <tr className="bg-gray-50">
          <th className="text-left font-medium py-2 text-gray-500">File</th>
          <th className="font-medium py-2 text-gray-500">Delete</th>
        </tr>
      </thead>
      <tbody className="text-sm divide-y divide-gray-200">
        {
          fileList.map((file, index) => (
            <tr className="odd:bg-white even:bg-gray-50" key={file}>
              <td className="px-2 py-3"><Link className="hover:underline" target="_blank" href={`/api/files/${file}`}>{ file }</Link></td>
              <td className="py-3 align-middle text-center"> <button onClick={() => handleDeleteModal(file)} className="px-2 py-1 rounded-md bg-red-400 text-white">Delete</button> </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    <ModalAreYouSure yesHandler={confirmDelete} closeHandler={closeHandler} isOpen={deleteModal} />
    </>
  )
}