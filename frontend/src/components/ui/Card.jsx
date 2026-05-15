import { motion } from 'framer-motion'

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) {
  const baseStyles = "bg-white rounded-[1.5rem] shadow-soft border border-slate-200/60 p-6 sm:p-8"
  const hoverStyles = hover ? "transition-all duration-400 ease-out hover:shadow-soft-hover hover:-translate-y-1.5" : ""

  return (
    <motion.div 
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
