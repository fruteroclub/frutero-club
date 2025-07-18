'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import SuccessModal from '@/components/ui/success-modal'

export default function PulpaPage() {
  const [email, setEmail] = useState('')
  const [selectedChain, setSelectedChain] = useState('')
  const [selectedToken, setSelectedToken] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FFFAF3]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 md:px-12 lg:px-16">
        {/* Logo */}
        <Link className="flex w-36 items-center" href="/">
          <Image
            src="/images/logos/frutero.svg"
            alt="Frutero logo"
            width={128}
            height={128}
            className="-mt-1 w-full transition duration-300 ease-in-out hover:scale-105"
          />
          <span className="sr-only">Frutero Club</span>
        </Link>
        
        {/* Wallet Connect Button */}
        <Button 
          className="bg-[#FA646B] hover:bg-[#FA646B]/90 text-white px-6 py-2 rounded-full"
        >
          Conecta tu wallet
        </Button>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-8"
          >
            ← Volver al inicio
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                Tu entrada al{' '}
                <span className="text-[#FF9500]">camino del Hacker</span>
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
                Frutero Club convierte tu talento en impacto. Con nuestra membresía, 
                podrás acceder a un programa que te entrena para hackear sistemas, 
                dominar tecnología y reconfigurar el mercado a tu favor.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6 max-w-md">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E.g. tangerine@frutero.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9500] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Chain Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Chain to Mint on
                  </label>
                  <div className="relative">
                    <select
                      value={selectedChain}
                      onChange={(e) => setSelectedChain(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9500] focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="">Select chain</option>
                      <option value="ethereum">Ethereum</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                {/* Token Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Token
                  </label>
                  <div className="relative">
                    <select
                      value={selectedToken}
                      onChange={(e) => setSelectedToken(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9500] focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="">Choose token</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>
              </div>

              {/* Mint Button */}
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#FF9500] hover:bg-[#FF9500]/90 text-white text-lg font-semibold py-4 px-8 rounded-full transition-colors"
              >
                Mint Membership
              </Button>
            </div>
          </div>

          {/* Right Content - Card */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div className="relative w-96 h-[500px] lg:w-[450px] lg:h-[500px]">
              <Image
                src="/images/cards/carta_mandarina.svg"
                alt="Frutero Club Card"
                width={350}
                height={450}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
} 