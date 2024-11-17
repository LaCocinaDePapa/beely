import { useState, useEffect } from "react"

export const ToggleTheme = () => {
    const savedTheme = localStorage.getItem("theme")

    const [selectedTheme, setSelectedTheme] = useState(savedTheme)

    const handleChange = (e) => {
        const newTheme = e.target.value
        setSelectedTheme(newTheme)

        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        document.body.className = selectedTheme
    }, [selectedTheme])

    return (
        <>

            <form>
                <select onChange={handleChange} value={selectedTheme} className="mx-auto bg-neutral-900">
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                </select>
            </form>

        </>
    )
}
