import { apiConfig, getToken, tokenRequest, headers } from '@/server/msgraph'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  try {
    const authResponse = await getToken(tokenRequest)

    let res = await fetch(apiConfig.uri + '/' + encodeURI(body.email), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authResponse.accessToken}`
      }
    })

    if(res === false) return NextResponse.json({ message: "Error at the api call"}, { 
        status: 200,
        headers
        }
      )

    res = await res.json()
    
    const isExists = (res.error) ? false : true ;

    return NextResponse.json({ ok: isExists }, {
      status: 200, 
      headers
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ ok: false }, { 
      status: 500, 
      headers
    })
  }
}

export async function OPTIONS(request) {
  return NextResponse.json({ ok: true }, {
    status: 200,
    headers
  })
}