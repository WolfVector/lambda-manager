import { getServerSession } from "next-auth";
import { LoginComponent } from "./Login";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'

export default async function Login() {
  const session = await getServerSession(authOptions)
  if(session) return redirect('/')
  
  return (
   <LoginComponent />
  )
}