import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaGlobe, FaBolt, FaComments, FaShieldAlt } from 'react-icons/fa';

export default function FloatingBadges() {
  const badges = [
    {
      id: 1,
      icon: <img src="/Design sem nome (7).png" alt="Atlas" style={{ width: '22px', height: '22px', borderRadius: '4px', objectFit: 'contain' }} />,
      title: "Agentes de IA (Atlas)",
      sub: "Automação no WhatsApp",
      posClass: "badge-pos-1",
      delay: 0,
      duration: 5
    },
    {
      id: 2,
      icon: <FaGlobe style={{ color: '#00BEAD', fontSize: '18px' }} />,
      title: "Websites High-Perf",
      sub: "Design & SEO Pro",
      posClass: "badge-pos-2",
      delay: 1,
      duration: 6
    },
    {
      id: 3,
      icon: <FaBolt style={{ color: '#00BE82', fontSize: '18px' }} />,
      title: "Atendimento 24/7",
      sub: "Zero fila de espera",
      posClass: "badge-pos-3",
      delay: 2,
      duration: 5.5
    },
    {
      id: 4,
      icon: <FaComments style={{ color: '#019494', fontSize: '18px' }} />,
      title: "CRM & Funis",
      sub: "Leads qualificados",
      posClass: "badge-pos-4",
      delay: 0.5,
      duration: 6.5
    },
    {
      id: 5,
      icon: <FaShieldAlt style={{ color: '#00BEAD', fontSize: '18px' }} />,
      title: "Tecnologia NeuroFlow",
      sub: "Ecossistema Inteligente",
      posClass: "badge-pos-5",
      delay: 1.5,
      duration: 5.2
    }
  ];

  return (
    <div className="floating-badges-wrapper" aria-hidden="true">
      {badges.map((badge) => (
        <motion.div
          key={badge.id}
          className={`floating-badge ${badge.posClass}`}
          initial={{ y: 0, opacity: 0, scale: 0.9 }}
          animate={{
            y: [-8, 8, -8],
            opacity: 1,
            scale: 1
          }}
          transition={{
            y: {
              duration: badge.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            opacity: { duration: 0.8, delay: badge.delay },
            scale: { duration: 0.8, delay: badge.delay }
          }}
        >
          <div className="badge-icon-box">{badge.icon}</div>
          <div className="badge-text-box">
            <span className="badge-title">{badge.title}</span>
            <span className="badge-sub">{badge.sub}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
