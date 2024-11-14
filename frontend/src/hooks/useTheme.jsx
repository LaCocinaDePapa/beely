import { useState } from 'react'

export const useTheme = () => {
    const [theme, setTheme] = useState('')

    const setItem = localStorage.setItem(theme)
    const getItem = localStorage.getItem(theme)

    return { theme, setTheme }
}

