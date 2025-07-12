import { JSX, SVGProps } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface IconCardProps {
  icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => JSX.Element
  className?: string
  label: string
  description?: string
  color?: 'orange' | 'green' | 'pink' | 'dark'
}

export default function IconCard({ icon, className, label, description }: IconCardProps) {



  return (
    <Card className={cn(`w-full rounded-2xl border-2 py-4 text-center`, className)}>
      <CardHeader className="px-4 flex md:flex-col items-center justify-center w-full">
        <div className="bg-foreground border-none ring-none p-2 aspect-square w-1/2 md:w-3/4 h-full rounded-full flex items-center justify-center">{icon({ className: 'w-3/4 h-3/4 text-primary' })}</div>
        <CardTitle className={`font-funnel text-2xl font-medium`}>
          {label}
        </CardTitle>
      </CardHeader>
      {description && <p className="text-foreground font-medium">
        {description}
      </p>}
    </Card>
  )
} 