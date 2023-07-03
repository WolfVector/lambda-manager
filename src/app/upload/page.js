"use client"
// Import React FilePond
import { FilePond } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import "./override.css"

import { useRef, useState } from "react";
import Image from 'next/image';
import { handleAsyncReq } from '@/lib/utils';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PORT = 300
const IP = "localhost"

export default function Home() {
  const [files, setFiles] = useState([])
  const [isExists, setIsExists] = useState(false)
  const usernameRef = useRef("")
  const filepondRef = useRef("")

  async function handleVerifyUser() {
    let username = usernameRef.current.value

    const id = toast.loading("Verifying user...")

    const res = await handleAsyncReq(`/api/verify-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: username })
    })

    if(res === false) {
      toast.update(id, { render: "There was some problem. Try again", type: "error", isLoading: false, autoClose: 3000 });
      setIsExists(false)
    }
    else if(!res.ok) {
      toast.update(id, { render: "User does not exists", type: "error", isLoading: false, autoClose: 3000});
      setIsExists(false)
    }
    else  {
      toast.update(id, { render: "User verified", type: "success", isLoading: false, autoClose: 3000 });
      setIsExists(true)
    }
  }

  function handleInitFile(file) {
    if(file.fileExtension == 'exe') {
      toast.error("Exe files not allowed", { autoClose: 3000 })
      return file.abortProcessing()
    }
    
    file.setMetadata("username", usernameRef.current.value)
  }

  function handleProcessFile(file) {
    if(file.fileExtension == 'exe') {
      toast.error("Exe files not allowed", { autoClose: 3000 })
      return file.abortProcessing()
    }
  }

  return (
    <div className='grow mt-16 m-auto w-1/2 flex flex-col h-full'>
      <ToastContainer pauseOnFocusLoss={false} />
       <div className='grow rounded-md'>
        <div className='flex justify-between p-3'>
          <div className='text-2xl font-bold'>Upload your files</div>
          
        </div>
        <div className='mt-8 m-auto w-1/2'>
          <div className='text-sm font-medium text-slate-400 mb-1'>
            email
          </div>

          <div className='flex gap-2'>
            <input ref={usernameRef} type='text' className='rounded-md bg-slate-100 p-3 placeholder:text-slate-400 focus:outline-0' />
            <button onClick={handleVerifyUser} className='py-2 px-4 text-sm text-white font-semibold bg-blue-300 rounded-md'>Verify user</button>
          </div>

          { isExists && (
            <div className='mt-12'>
              <div className='text-sm font-medium text-slate-400 mb-1'>
                files
              </div>
            
              <FilePond
                ref={filepondRef}
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                server={`/api/upload-manager`}
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle='Select files'
                credits={null}
                oninitfile={handleInitFile}
                onprocessfilestart={handleProcessFile}
              />
            </div>
          ) }

          
        </div>
        
        
      </div>
    </div>
  )
}
