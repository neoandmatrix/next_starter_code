import SignOutButton from "@/components/sign_out_button";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"
import Link from "next/link";


async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if(session){
    return <div>
    {JSON.stringify(session.user)}
    <SignOutButton/>
    </div> 
  }else{
    return <div>
      <Link href={"/signin"}>sign in</Link>
    </div>
  }
  
}

export default async function Home() {
  const session = await getUser();

  return (
    <div>
      {session}
      
    </div>
  );
}
