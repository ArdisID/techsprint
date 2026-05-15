import { motion } from 'framer-motion'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus-ring relative overflow-hidden"
  
  const variants = {
    primary: "bg-primary-500 text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:bg-primary-600",
    secondary: "bg-secondary-500 text-white shadow-[0_2px_10px_rgba(20,184,166,0.2)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.3)] hover:-translate-y-0.5 hover:bg-secondary-600",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-primary-500 hover:text-primary-500 bg-transparent hover:shadow-[0_4px_15px_rgba(99,102,241,0.08)]",
    ghost: "text-slate-600 hover:text-primary-600 hover:bg-primary-50/80",
    light: "bg-white text-primary-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-slate-50",
    danger: "bg-error text-white shadow-[0_2px_10px_rgba(239,68,68,0.2)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.3)] hover:-translate-y-0.5 hover:bg-red-600",
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base tracking-tight",
    lg: "px-8 py-4 text-lg tracking-tight",
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <motion.button 
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={classes} 
      {...props}
    >
      {children}
    </motion.button>
  )
}
