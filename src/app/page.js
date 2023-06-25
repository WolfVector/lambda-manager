import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import fs from "fs/promises"
import path from "path";
import { rootPath } from "@/server/msgraph";
import { existsSync } from "fs";
import { redirect } from 'next/navigation'
import { FilesRow } from "./FilesRow";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if(!session) return redirect('/login')

  const username = session.user.email.split("@")[0]

  async function getUserFiles() {
    const filePath = path.join(
      rootPath,
      username
    )

    if(!existsSync(filePath)) return { ok: true, files: [] }

    try {
      const files = await fs.readdir(filePath)
      return { ok: true, files }
    } catch (error) {
      return { ok: false }
    }
  }

  const filesObj = await getUserFiles()
  if(filesObj.ok == false) return <div>There was a problem while getting your files, try again.</div>

  return (
    <div className="p-3">
      <div className="flex justify-end text-sm text-slate-400"> { session.user.name } </div>
      <div className="mt-2">
        <FilesRow files={filesObj.files} />
      </div>
    </div>
  )
}
