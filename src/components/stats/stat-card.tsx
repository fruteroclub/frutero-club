import { JSX, SVGProps } from "react"
import { Card, CardHeader } from "@/components/ui/card"

interface StatCardProps {
  icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => JSX.Element
  number: string
  description: string
  color?: 'orange' | 'green' | 'pink' | 'dark'
}

export default function StatCard({ icon, number, description }: StatCardProps) {

  return (
    <Card className={`w-full rounded-2xl border-2 p-2 py-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <CardHeader className="px-4">
        <div className="bg-background p-2 w-12 h-12 rounded-full ring-2 ring-muted">{icon({ className: 'w-8 h-8' })}</div>
      </CardHeader>
      <div className={`font-funnel text-4xl text-primary md:text-6xl font-bold mb-2`}>
        {number}
      </div>
      <p className="text-foreground font-medium">
        {description}
      </p>
    </Card>
  )
} 