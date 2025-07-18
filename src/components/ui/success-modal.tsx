'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './button'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-[#FFFAF3] rounded-2xl p-12 max-w-2xl w-full mx-4 shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Card Illustration */}
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-52">
            <Image
              src="/images/cards/carta_mandarina.svg"
              alt="Frutero Club Card"
              width={160}
              height={208}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-[#FF9500] text-center mb-4">
          ¡Estás dentro!
        </h2>

        {/* Message */}
        <p className="text-gray-700 text-center mb-10 leading-relaxed text-lg max-w-md mx-auto">
          Ahora eres parte del Club. Tu camino como Hacker inicia hoy. 
          Nos vemos del otro lado.
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <Link href="/">
            <Button 
              className="bg-[#FA646B] hover:bg-[#FA646B]/90 text-white text-lg font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Volver Al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 