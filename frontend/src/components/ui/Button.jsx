export const Button = ({ 
  children, 
  onClick,
  type,
  variant = 'secondary', 
  size = 'md',
  className = '',
}) => {

  const baseStyles = 'px-5 py-1 rounded-md transition ease-in-out'

  const variants = {
    primary: 'bg-green-700',
    secondary: 'bg-blue-600',
    danger: 'bg-red-700 hover:bg-red-800',
    outlined: 'outline outline-pink-700',
    exotic: 'bg-indigo-700',
    transparent: 'bg-transparent border rounded-md border-zinc-500 hover:bg-neutral-800'
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
    >
      {children}
    </button>
  )
}
