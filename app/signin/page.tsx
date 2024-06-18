"use client"

import { signIn } from 'next-auth/react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function LoginForm() {


  const [email, setEmail] = useState(" ");
  const [password, setpassword] = useState(" ");
  
  return (
    <div className="flex flex-col justify-center h-screen">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>
          Please enter your information to SignIn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e)=>{setEmail(e.target.value)}}
              id="email"
              type="email"
              name="email"
              placeholder="some@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
             onChange={(e)=>{setpassword(e.target.value)}}
             id="password" type="password" required  name="password" />
          </div>
          <Button type="button" onClick={async()=>{
            const res = await signIn("credentials", {
              email: email,
              password: password,
              redirect: true,
              callbackUrl : "/"
          });
          console.log(res);
          }} className="w-full">
            Sign In
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="underline font-semibold">
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
