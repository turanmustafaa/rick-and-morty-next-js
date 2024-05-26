"use client"
import { LucideIcon, LocateIcon, Blocks, User } from "lucide-react"

export type Status = {
    value: string
    label: string
    icon: LucideIcon
}

export const statuses: Status[] = [
    {
        value: "location",
        label: "Location",
        icon: LocateIcon,
    },
    {
        value: "episode",
        label: "Episode",
        icon: Blocks,
    },
    {
        value: "character",
        label: "Character",
        icon: User,
    }
]