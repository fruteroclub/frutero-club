'use client'

import { motion } from 'framer-motion'
import FrutaCard from '@/components/cards/FrutaCard'
import { Section } from '@/components/layout/section'
import PageWrapper from '@/components/layout/page-wrapper'

const users = [
  {
    name: 'Robin',
    username: 'robinhodl69',
    description:
      'Project Manager y CEO de Psy Labs, equipo especializado en el desarrollo de soluciones web3. Expertise en gestión de productos. Liderando proyectos, como la creación de una aplicación de lending y borrowing en Vara Network, financiada mediante un grant y actualmente en fase de testnet. Seleccionado para la incubadora Polkadot Relayers en Singapur 2023  y ganador del primer lugar en el track de Vara Network durante ETH Global Bruselas 2024. Apasionado por DeFi y la integración de inteligencia artificial en blockchain.',
    socialNetworks: [
      'https://twitter.com/robinhodl69',
      'https://www.linkedin.com/in/jaramillojesuslini/',
    ],
    avatar: '/images/mentores/robinhodl69.jpg',
    calendarUrl: 'https://calendly.com/robinhodl',
    email: 'jaramillo.jesusj@gmail.com',
  },
  {
    name: 'Julio Cruz',
    username: 'JulioMCruz',
    description:
      'Ingeniero de software experto en blockchain y soluciones cloud, con experiencia en proyectos corporativos, gubernamentales y financieros en América Latina y EE. UU. Especialista en sistemas escalables, identidad digital, contratos inteligentes y migración a arquitecturas descentralizadas, impulsando la transformación digital con liderazgo e innovación.',
    socialNetworks: [
      'https://x.com/JulioMCruz',
      'https://warpcast.com/juliomcruz',
      'https://t.me/JulioMCruz',
    ],
    avatar: '/images/mentores/JulioMCruz.png',
    calendarUrl: 'https://calendly.com/juliomcruz/30min',
    email: 'Julio.cruz@eb-ms.net',
  },
  {
    name: 'Germán',
    username: 'ariutokintumi',
    description: 'Logic, Architecture, UX, Product. RollaMate.io Founder.',
    socialNetworks: ['https://x.com/ariutokintumi'],
    avatar: '/images/mentores/ariutokintumi.jpg',
    calendarUrl: '',
    email: 'german@zonalibre.com.uy',
  },
  {
    name: 'Sury Bonfil',
    username: 'SuryBonfil',
    description:
      'Sury Bonfil. Mexicana, especialista en marketing digital y diseño. He participado en cuatro hackathons de ETHGlobal, en México, Colombia y Bangkok, También en varios más como Ethereum Argentina y hackathons online, en roles de diseño, marketing y Project Manager. Fui mentora en los hackathons de OpenWebAcademy y Vara en 2023, enfocándome en el área de pitch. Mi experiencia y especialidad radican en ayudar a los equipos a preparar presentaciones claras y estratégicas, cubriendo los puntos clave para un pitch exitoso en hackathons.',
    socialNetworks: ['https://x.com/holaNFT'],
    avatar: '/images/mentores/SuryBonfil.jpg',
    calendarUrl: 'https://calendly.com/surybonfil',
    email: 'surybonfilmarketing@gmail.com',
  },
  {
    name: 'Víctor',
    username: 'victorxva',
    description:
      'Diseño Multidisciplinar (Visual, Branding, Pitch Decks...) ETHDenver 2024 Finalist, +10 EthGlobal Tracks, +3 years web3 experience',
    socialNetworks: ['https://x.com/victorxva'],
    avatar: '/images/mentores/victorxva.jpg',
    calendarUrl: 'https://calendly.com/victorxva/1-1-meeting',
    email: 'victordelval16@gmail.com',
  },
  {
    name: 'Michael',
    username: 'michsoftster',
    description:
      'Experiencia en desarrollo de videojuegos, profesor del diplomado Diseño y Programación de Videojuegos en FI | UNAM, embajador senior Vara Network.',
    socialNetworks: ['https://x.com/michsoftster'],
    avatar: '/images/mentores/michsoftster.jpg',
    calendarUrl: 'https://calendly.com/michsoftster/mentor-hours',
    email: 'michsoftster@gmail.com',
  },
  {
    name: 'Rafa',
    username: '0xrafacc',
    description:
      'Software developer, previously working at PWN DAO, currently working at OdiseaLabs. Experienced in working with international teams in blockchain startups and programming trading strategies in crypto investment funds between CEXes and DEXes.',
    socialNetworks: ['https://www.youtube.com/@rafacanseco'],
    avatar: '/images/mentores/0xrafacc.jpg',
    calendarUrl: 'https://calendly.com/rafa-canseco/30min',
    email: 'rafa@odisea.xyz',
  },
  {
    name: 'Diana Castillo',
    username: 'dianalaucst',
    description:
      'Diana se ha destacado en el ámbito de la innovación digital. Su trayectoria abarca múltiples roles de liderazgo donde ha demostrado su capacidad para impulsar el crecimiento orgánico y posicionar startups en etapa temprana, desarrollando estrategias multicanal. Además de sus logros en el sector privado, ha dedicado tiempo y esfuerzo a proyectos de impacto social.Fungió como directora de operaciones de una iniciativa centrada en la educación, ha implementado el modelo STEM en varios proyectos, demostrando su compromiso con la educación y el desarrollo comunitario. Su participación en hackathones y su enfoque en el desarrollo tecnológico, demuestran su habilidad para pensar creativamente y resolver problemas de manera efectiva. Con una sólida formación académica en contabilidad, Diana ha combinado su experiencia práctica con un profundo conocimiento teórico, lo que la llevó a cofundar Goblin, la startup que soluciona tus problemas de la vida adulta, empezando con ponerte al día con el SAT.',
    socialNetworks: ['https://x.com/dianalaucst'],
    avatar: '/images/mentores/dianalaucst.jpg',
    calendarUrl: 'https://calendly.com/hola-goblintax/30min',
    email: 'hola@goblintax.com',
  },
  {
    name: 'Emmi',
    username: 'Emmi',
    description:
      'Experiencia en productos DeFi y Tokenización, 4 años de experiencia en web3, colaboraciones con The Graph y Bitcoin Address Services (prev) conocimiento en smart contracts y desarrollo blockchain. Core team de Ethereum Bolivia y Graphtronauts, tengo un podcast :D ',
    socialNetworks: ['https://x.com/emmilili_eth'],
    avatar: '/images/mentores/emmi.jpg',
    calendarUrl: '',
    email: 'emmilili.04@gmail.com',
  },
  {
    name: 'Carlos',
    username: 'haycarlitos',
    description: 'Co-founder, CEO @hichipipay, YC alumni, Shark Tank Mx s.7',
    socialNetworks: ['https://x.com/haycarlitos'],
    avatar: '/images/mentores/haycarlitos.jpg',
    calendarUrl: 'https://calendly.com/chipipay/1-1',
    email: 'carlos@diosplan.com',
  },
  {
    name: 'Robert',
    username: 'RobertoYamanaka',
    description: '⁠⁠Product at ChipiPay | Buildspace Finalist | Full Stack Dev',
    socialNetworks: [],
    avatar: '/images/mentores/RobertoYamanaka.jpg',
    calendarUrl: '',
    email: 'calendly.com/roberto-yamanaka/30min',
  },
  {
    name: 'Tony',
    username: 'toony1908',
    description:
      '2 veces finalista ETHGlobal, 10+ bounties ganados, experiencia en producto principalmente en mobile consumer web3, solidity, react native y en general el mundo js y go, 3x time founder, YC founder and CTO',
    socialNetworks: ['https://x.com/@toony1908'],
    avatar: '/images/mentores/toony1908.jpg',
    calendarUrl: 'https://calendly.com/tony-starkfit/30min',
    email: 'tony@starkfit.club',
  },
  {
    name: 'Alex Soto',
    username: 'alexsotodigital',
    description:
      'Facilitador de equipos colaborativos, consultor en desarrollo organizacional y emprendedor social. Co-founder de Matriz.coop y govNERD en el Optimism Collective. Con enfoque en gobernanza dinámica, gestión ágil de proyectos y redes de mutualismo.',
    socialNetworks: ['https://x.com/alexsotodigital'],
    avatar: '/images/mentores/alexsotodigital.png',
    calendarUrl: 'https://calendly.com/alexsotodigital/llamada',
    email: 'alex.soto.digital@gmail.com',
  },
  {
    name: 'Artur',
    username: 'lil_code',
    description: 'OG Builder Tumbado',
    socialNetworks: ['https://x.com/0xVato'],
    avatar: '/images/mentores/lil_code.jpg',
    calendarUrl: '',
    email: '',
  },
  {
    name: 'Carlos',
    username: 'juminstock',
    description:
      'Developer Relations, technical writer, project & community management, organization and sales.',
    socialNetworks: ['https://linktr.ee/juminstock'],
    avatar: '/images/mentores/juminstock.jpg',
    calendarUrl: '',
    email: 'juminstock@gmail.com',
  },
]

export default function FrutasPage() {
  return (
    <PageWrapper>
      <Section>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-4xl font-bold"
        >
          Nuestros Mentores
        </motion.h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <FrutaCard key={user.username} {...user} />
          ))}
        </div>
      </Section>
    </PageWrapper>
  )
}
