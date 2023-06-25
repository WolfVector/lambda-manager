import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from 'next/server'
import path from "path";
import { rootPath } from "@/server/msgraph";
import { createReadStream, existsSync } from "fs";
import { lookup } from "mime-types";
import { unlink } from "fs/promises";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  const username = session.user.email.split("@")[0]
  const fileName = params.file

  if(!session) return NextResponse.json({ ok: false }, { status: 403 })

  const filePath = path.join(
    rootPath,
    username,
    fileName
  )

  if(!existsSync(filePath)) return NextResponse.json({ ok: false, message: "File does not exists" }, { status: 404 })
  
  let ext = path.extname(filePath)
  if(ext == '.exe') return NextResponse.json({ ok: false, message: "Wrong type" }, { status: 400 })
  
  try {
    const mime = lookup(filePath)
  
    const readStream = createReadStream(filePath);
    return new Response(readStream, { status: 200, headers: {
      'Content-Type': mime,
      "Content-Disposition": `attachment; filename=${fileName}`
    }})    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ ok: false, message: "There was a problem while processing the request" }, { status: 400 })
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const username = session.user.email.split("@")[0]
  const fileName = params.file

  if(!session) return NextResponse.json({ ok: false }, { status: 403 })

  const filePath = path.join(
    rootPath,
    username,
    fileName
  )

  if(!existsSync(filePath)) return NextResponse.json({ ok: false })
  
  try {
    await unlink(filePath)
  
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ ok: false })
  }
}