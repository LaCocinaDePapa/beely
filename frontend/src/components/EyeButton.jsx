import {Eye, EyeOff} from 'lucide-react'


export const EyeButton = ({ showPassword, setShowPassword }) => {
    return (
        <button
            type='button'
            className='absolute inset-y-0 right-0 pr-3 pt-6 flex items-center'
            onClick={() => {
                setShowPassword(!showPassword)
            }}
        >
            {
            showPassword ? (
                <EyeOff className='h-5 w-5 text-gray-400' />
                ) : (
                <Eye className='h-5 w-5 text-gray-400' />
                )
            }
      </button>
    )
}
