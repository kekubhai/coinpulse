import React from 'react'
import { motion } from "framer-motion"
import { Github } from "lucide-react"

export default function AnimatedFooter() {
  return (
    <footer className="w-full py-4 px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex justify-center items-center"
      >
        <a
          href="https://github.com/kekubhai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="text-sm font-medium"
          >
            Built by Anir.G
          </motion.span>
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Github className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </footer>
  )
}