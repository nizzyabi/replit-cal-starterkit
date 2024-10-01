'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedNavbarProps {
  children: React.ReactNode;
}

const AnimatedNavbarHeader: React.FC<AnimatedNavbarProps> = ({ children }) => {
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-border/40 bg-muted/90 backdrop-blur"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }} 
    >
      <div className="flex h-14 items-center px-4 py-2 lg:h-[60px] lg:px-6">
        {children}
      </div>
    </motion.header>
  );
};

export default AnimatedNavbarHeader;