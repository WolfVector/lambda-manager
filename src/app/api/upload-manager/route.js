import { headers, rootPath } from '@/server/msgraph'
import { NextResponse } from 'next/server'
import fs from "fs/promises"
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request) {
  const data = await request.formData()
  let userObj = data[Object.getOwnPropertySymbols(data)[0]]
  userObj = JSON.parse(userObj[0].value)
  const username = userObj.username.split("@")[0]

  const fileObj = Object.fromEntries(data)
  const file = fileObj.files

  if (!file) return NextResponse.json({ success: false }, { status: 400, headers })

  try {
    let filePath = path.join(
      rootPath,
      username
    )
    
    if(!existsSync(filePath))    
        await fs.mkdir(filePath, {  recursive: true})

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
  
    // Save the file
    filePath = path.join(
      filePath,
      file.name
    )
    await fs.writeFile(filePath, buffer)
    
    return NextResponse.json({ success: true }, { status: 200, headers })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false }, { status: 400, headers })
  }
}

export async function OPTIONS(request) {
  return NextResponse.json({ ok: true }, {
    status: 200,
    headers
  })
}