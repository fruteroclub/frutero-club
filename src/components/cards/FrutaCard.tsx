import { motion } from 'framer-motion'
import Image from 'next/image'
import { Globe, ExternalLink, Mail } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { selectSocial } from '../socials'

interface FrutaCardProps {
  name: string
  username: string
  description: string
  socialNetworks: string[]
  avatar: string
  calendarUrl: string
  email: string
}

export default function FrutaCard({
  name,
  username,
  description,
  socialNetworks,
  avatar,
  calendarUrl,
  email,
}: FrutaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="relative h-64 w-full md:h-48">
        <Image
          src={avatar}
          alt={`${name}'s avatar`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="left-4 text-white">
          <h2 className="text-2xl font-bold text-primary">{name}</h2>
          <p className="text-sm text-secondary">@{username}</p>
        </div>
        <p className="mb-4 line-clamp-2 text-gray-600">{description}</p>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex space-x-2">
            {socialNetworks.map((network, index) => {
              const social = selectSocial({ url: network })

              return (
                <Link
                  key={index}
                  href={network}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-gray-600"
                >
                  <span className="sr-only">{social?.name ?? 'Website'}</span>
                  {social ? (
                    <social.icon
                      className={`${
                        social.name === 'Telegram' || social.name === 'X'
                          ? '-mt-0.5 h-6 w-6'
                          : social.name === 'LinkedIn'
                            ? '-mt-1 h-6 w-6'
                            : 'h-5 w-5'
                      } text-secondary hover:text-primary`}
                      aria-hidden="true"
                    />
                  ) : (
                    <Globe size={20} />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex w-full justify-center"
        >
          <Link
            href={Boolean(calendarUrl) ? calendarUrl : `mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary">
              Programar Mentoría{' '}
              {calendarUrl ? <ExternalLink size={16} /> : <Mail size={16} />}
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
