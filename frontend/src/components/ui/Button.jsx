export const Button = ({ 
  children, 
  onClick,
  type,
  variant = 'secondary', 
  size = 'md',
  className = '',
  ...props
}) => {

  // Base styles
  const baseStyles = 'px-5 py-1 w-full flex justify-center mx-auto rounded'

  // Variant styles
  const variants = {
    primary: 'bg-green-700',
    secondary: 'bg-blue-600',
    danger: 'bg-red-700',
    outlined: 'outline outline-pink-700',
    exotic: 'bg-indigo-700',
    transparent: 'bg-transparent border rounded-md border-zinc-500'
  }

  const sizeVariants = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    xxl: 'text-2xl'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizeVariants[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
