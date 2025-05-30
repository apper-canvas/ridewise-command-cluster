import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 to-surface-100 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center"
        >
          <ApperIcon name="MapPin" className="w-16 h-16 text-white" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-surface-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-700 mb-4">Route Not Found</h2>
        <p className="text-surface-600 mb-8 leading-relaxed">
          Looks like this destination doesn't exist. Let's get you back on track!
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Home" className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound