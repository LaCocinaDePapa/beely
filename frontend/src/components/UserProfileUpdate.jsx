import React, { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function UserProfileUpdateWithQR() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [qrValue, setQrValue] = useState('')
  const qrRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos actualizados al servidor
    console.log('Profile updated:', userData)
    alert('Profile update successfully')
  }

  const generateQR = () => {
    const qrData = `${userData.firstName} ${userData.lastName}\n${userData.email}`
    setQrValue(qrData)
  }

  const copyQrCode = () => {
    const svg = qrRef.current
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob
          })
        ]).then(() => {
          alert('Copied QR code to clipboard')
        }).catch((error) => {
          alert('Error copying QR code')
          console.error('Error copying QR code: ', error)
        })
      })
    }
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <div className="mt-8 bg-transparent">
      <div className="px-4 mx-auto space-y-8 max-w-screen-2xl">

        <div className="overflow-hidden border rounded-md shadow border-zinc-300 dark:border-zinc-700 bg-neutral-100 dark:bg-transparent sm:rounded-lg">
          <div className="py-5 sm:px-6">
            <h2 className="text-3xl font-semibold leading-6 text-gray-900 dark:text-white">General</h2>
            <p className="mt-3 text-sm text-gray-400">Generate & copy your personal QR code</p>
          </div>
          <div className="max-w-[16rem] mx-7 border-t py-4 border-zinc-300 sm:p-0">
            <div className="flex flex-col justify-center gap-8 mx-auto my-6">
              <div className='aspect-square'>
                {qrValue ? (
                  <QRCodeSVG value={qrValue} size={200} ref={qrRef} />
                ) : (
                  <div className="text-sm text-gray-400">QR code will appear here!</div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={generateQR}
                  className="inline-flex items-center justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 sm:w-auto"
                >
                  Generate QR
                </button>
                {qrValue && (
                  <button
                    onClick={copyQrCode}
                    className="inline-flex items-center justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-gray-700 rounded-md shadow-sm bg-neutral-200 hover:bg-gray-50 sm:w-auto"
                  >
                    Copy QR
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden shadow bg-neutral-100 dark:bg-transparent sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-3xl font-semibold leading-6 text-gray-900 dark:text-white">Update user profile</h2>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">Modify your personal data</p>
          </div>
          <div className="border-t border-gray-200">
            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-neutral-200">
                    Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    value={userData.lastName}
                    onChange={handleChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
