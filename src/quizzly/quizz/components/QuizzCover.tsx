import React from 'react'
import { useTheme } from '../../../shared/hooks'
import { IconButton } from '../../../shared/components/IconButton'

interface Props {
    quizId: string
    quizImage: string
    quizzTitle: string,
    quizzColor: string,
}

export const QuizzCover: React.FC<Props> = ({ quizId, quizImage, quizzColor, quizzTitle }) => {

    const { isDarkTheme } = useTheme()
    const hasImage = quizImage && quizImage.trim() !== ''

    return (
        <div className="relative w-full h-40 overflow-hidden rounded-b-lg">
            {hasImage ? (
                <>
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{backgroundImage: `url(${quizImage})`}}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />
                </>
            ) : (
                <div 
                    className="absolute inset-0 bg-linear-to-br"
                    style={{
                        backgroundImage: `linear-gradient(135deg, ${quizzColor} 0%, ${quizzColor}CC 50%, ${quizzColor}99 100%)`
                    }}
                />
            )}
            
            {isDarkTheme && (<div className="absolute inset-0 bg-black opacity-20" />)}

            <div className="absolute bottom-10 left-5 flex flex-col items-center px-4">
                <div>                    
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{quizzTitle}</h1>
                    <p className="text-white/80 text-sm sm:text-base">
                        Quiz ID: <span className="font-mono font-semibold text-white/90">{quizId}</span>
                    </p>
                </div>
            </div>

            <div className='absolute bottom-5 right-5'>
                <IconButton>
                    <i className='bxr bx-camera-alt text-2xl'></i> 
                </IconButton>
            </div>

            <div className='absolute top-5 right-5'>
                <IconButton>
                    <i className='bxr bx-pencil text-2xl'></i> 
                </IconButton>
            </div>
            
            <div className='absolute top-5 right-20'>
                <IconButton>
                    <i className='bxr bx-trash text-2xl'></i> 
                </IconButton>
            </div>

            <div 
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: quizzColor }}
            />
        </div>
    )
}