import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// AGREGAMOS variantes
const avatarVariants = cva(
  "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center text-base font-bold",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700",
        admin: "bg-rose-500 text-white",
        vendedor: "bg-blue-500 text-white",
        cajero: "bg-orange-400 text-white",
        produccion: "bg-purple-500 text-white",
        entregas: "bg-green-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);


export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(avatarVariants({ variant }), className)} {...props} />
  )
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  React.ElementRef<"img">,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  React.ElementRef<"span">,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback, avatarVariants }

