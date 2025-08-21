'use client'
 
import { useLinkStatus } from 'next/link'
import {Loader2} from "lucide-react"
 
export default function LinkLoading({text}: {text: string}) {
  const { pending } = useLinkStatus()
  return pending ? (
    <Loader2 className="animate-spin" />
  ) : <span className="text-inherit">
    {text}
  </span>
}