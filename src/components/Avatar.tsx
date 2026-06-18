"use client"

import Image from "next/image"

interface AvatarProps {
  url?: string | null
  size?: number
  onClick?: () => void
}

export default function Avatar({ url, size = 40, onClick }: AvatarProps) {
  const avatarSrc = url || "/avatar-default.png"

  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "1px solid rgba(10,10,10,0.08)",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <Image
        src={avatarSrc}
        alt="User avatar"
        fill
        sizes={`${size}px`}
        style={{ objectFit: "cover" }}
      />
    </div>
  )
}
