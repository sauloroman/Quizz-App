import React from 'react'
import { useTheme } from '../shared/hooks'

interface Props {
    children: React.ReactNode
    title: string
    onClose?: () => void
    isOpen: boolean
}

export const ModalLayout: React.FC<Props> = ({ title, children, onClose, isOpen }) => {
    const { isDarkTheme } = useTheme()

    if (!isOpen) return null

    return (
        <>
            <div 
                className={`fixed inset-0 ${isDarkTheme ? 'bg-gray-50/40' : 'bg-black/80'} bg-opacity-50 z-40 transition-opacity duration-200`}
                onClick={onClose}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div 
                    className={`
                        relative w-full max-w-md
                        rounded-lg shadow-xl
                        transition-colors duration-200
                        ${isDarkTheme 
                            ? 'bg-[#3d4f5c]' 
                            : 'bg-white'
                        }
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`
                        flex items-center justify-between
                        px-6 py-4 border-b
                        ${isDarkTheme 
                            ? 'border-gray-600' 
                            : 'border-gray-200'
                        }
                    `}>
                        <h3 className={`
                            text-xl font-semibold
                            ${isDarkTheme 
                                ? 'text-white' 
                                : 'text-gray-900'
                            }
                        `}>
                            {title}
                        </h3>
                        
                        {onClose && (
                            <button
                                onClick={onClose}
                                className={`
                                    p-1 rounded-lg
                                    transition-colors duration-200
                                    ${isDarkTheme 
                                        ? 'text-gray-400 hover:bg-gray-600 hover:text-white' 
                                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                    }
                                `}
                            >
                                <svg 
                                    className="w-6 h-6" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M6 18L18 6M6 6l12 12" 
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="px-6 py-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}