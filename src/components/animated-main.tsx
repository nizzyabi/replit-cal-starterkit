'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedMainProps {
  children: React.ReactNode;
}

const AnimatedMain: React.FC<AnimatedMainProps> = ({ children }) => {
  return (
    <motion.header
      
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }} 
    >
      <div>
        {children}
      </div>
    </motion.header>
  );
};

export default AnimatedMain;