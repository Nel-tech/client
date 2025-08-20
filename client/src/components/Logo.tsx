interface TropiqkLogoProps {
  size?: number
  className?: string
  alt?:string
  variant?: "default" | "white" | "dark"
}

export function TropiqkLogo({ size = 120, className = "", variant = "default" }: TropiqkLogoProps) {
  const getColors = () => {
    switch (variant) {
      case "white":
        return { primary: "#FFFFFF", secondary: "#FFFFFF" }
      case "dark":
        return { primary: "#1A1A1A", secondary: "#1A1A1A" }
      default:
        return { primary: "#FF6B35", secondary: "#1A1A1A" }
    }
  }

  const colors = getColors()

  return (
    <div className={`flex items-center gap-3 ${className}`}>
     
      <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
       
        <circle cx="24" cy="24" r="20" stroke={colors.primary} strokeWidth="3" fill="none" />

       
        <path d="M19 16L19 32L33 24L19 16Z" fill={colors.primary} />

        <path d="M35 35L41 41" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
      </svg>

     
      <div className="flex flex-col">
        <span
          className="font-bold text-2xl  text-white font-poppins tracking-tight leading-none "
        >
          Tropiqk
        </span>
      </div>
    </div>
  )
}
