import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageDropzoneProps {
  onImagesSelected: (files: File[]) => void
  maxFiles?: number
  maxSize?: number 
  isDarkTheme?: boolean
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onImagesSelected,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024,
  isDarkTheme = false
}) => {
  const [preview, setPreview] = useState<string[]>([])
  const [error, setError] = useState<string>('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError('')    
    if (preview.length + acceptedFiles.length > maxFiles) {
      setError(`Máximo ${maxFiles} imágenes permitidas`)
      return
    }
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file))
    setPreview(prev => [...prev, ...newPreviews])
    
    onImagesSelected(acceptedFiles)
  }, [preview.length, maxFiles, onImagesSelected])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.avif', '.webp']
    },
    maxSize,
    multiple: maxFiles > 1
  })

  const handleRemoveImage = (index: number) => {
    setPreview(prev => {
      const newPreviews = [...prev]
      URL.revokeObjectURL(newPreviews[index])
      newPreviews.splice(index, 1)
      return newPreviews
    })
  }

  const handleClearAll = () => {
    preview.forEach(url => URL.revokeObjectURL(url))
    setPreview([])
    setError('')
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative rounded-lg border-2 border-dashed transition-all p-8 cursor-pointer ${
          isDragActive
            ? isDarkTheme
              ? 'border-blue-500 bg-blue-950'
              : 'border-blue-500 bg-blue-50'
            : isDarkTheme
            ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center">
          <svg
            className={`w-12 h-12 mb-3 ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          
          <p className={`text-base font-semibold mb-1 ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {isDragActive ? 'Suelta las imágenes aquí' : 'Arrastra imágenes aquí'}
          </p>
          
          <p className={`text-sm ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
          }`}>
            o haz clic para seleccionar (máx. {maxFiles})
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-lg bg-red-100 border border-red-400">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {preview.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-semibold ${
              isDarkTheme ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Imágenes seleccionadas ({preview.length}/{maxFiles})
            </h3>
            {preview.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                Limpiar todo
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {preview.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className={`w-full h-24 object-cover rounded-lg ${
                    isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                />
                
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity truncate">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}