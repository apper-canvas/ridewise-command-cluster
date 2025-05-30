import { useState } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="MapPin" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">RideWise</h1>
                <p className="text-xs sm:text-sm text-surface-600 hidden sm:block">Smart Transportation</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors duration-300"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-5 h-5 text-surface-700" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors duration-300"
              >
                <ApperIcon name="User" className="w-4 h-4" />
                <span className="text-sm font-medium">Account</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-8 sm:py-12 lg:py-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 mb-4 sm:mb-6"
          >
            Your Journey,
            <span className="gradient-text block sm:inline"> Simplified</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-surface-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Book buses and cabs seamlessly. Compare prices, select seats, and travel with confidence.
          </motion.p>

          {/* Quick Stats */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12"
          >
            {[
              { icon: "Bus", label: "Bus Routes", value: "2500+" },
              { icon: "Car", label: "Cab Partners", value: "1000+" },
              { icon: "Users", label: "Happy Customers", value: "50K+" },
              { icon: "Clock", label: "Avg. Booking Time", value: "2 Min" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-white/30"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <ApperIcon name={stat.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-surface-900">{stat.value}</div>
                <div className="text-sm sm:text-base text-surface-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Feature */}
      <MainFeature />

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 sm:py-16 lg:py-20 bg-surface-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 mb-4">
              Why Choose <span className="gradient-text">RideWise?</span>
            </h3>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Experience the future of transportation booking with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: "Zap",
                title: "Instant Booking",
                description: "Book your ride in seconds with our lightning-fast platform",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: "Shield",
                title: "Secure Payments",
                description: "Multiple payment options with bank-level security",
                color: "from-green-400 to-blue-500"
              },
              {
                icon: "Clock",
                title: "Real-time Tracking",
                description: "Track your booking status and vehicle location live",
                color: "from-purple-400 to-pink-500"
              },
              {
                icon: "DollarSign",
                title: "Best Prices",
                description: "Compare and get the best deals across all operators",
                color: "from-blue-400 to-green-500"
              },
              {
                icon: "Star",
                title: "Quality Service",
                description: "Verified operators and rated drivers for your safety",
                color: "from-red-400 to-yellow-500"
              },
              {
                icon: "Headphones",
                title: "24/7 Support",
                description: "Round-the-clock customer support for all your needs",
                color: "from-indigo-400 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft hover:shadow-xl transition-all duration-500 border border-surface-100 h-full">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <ApperIcon name={feature.icon} className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-surface-900 mb-4">{feature.title}</h4>
                  <p className="text-surface-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="MapPin" className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold">RideWise</h4>
            </div>
            <p className="text-surface-400 mb-6 max-w-md mx-auto">
              Making transportation booking simple, secure, and reliable for everyone.
            </p>
            <div className="flex justify-center space-x-6 text-surface-400">
              <span>© 2024 RideWise</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home