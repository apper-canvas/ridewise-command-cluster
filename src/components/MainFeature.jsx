import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { format, addDays } from 'date-fns'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('bus')
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    passengers: 1,
    cabType: 'economy'
  })
  const [showResults, setShowResults] = useState(false)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [currentStep, setCurrentStep] = useState('search') // search, results, booking, payment

  // Mock data
  const busResults = [
    {
      id: 1,
      operator: 'MegaBus Express',
      from: searchData.from,
      to: searchData.to,
      departureTime: '06:30',
      arrivalTime: '14:45',
      duration: '8h 15m',
      price: 850,
      availableSeats: 23,
      amenities: ['WiFi', 'AC', 'Charging Port', 'Snacks'],
      rating: 4.5,
      busType: 'Sleeper'
    },
    {
      id: 2,
      operator: 'ComfortRide',
      from: searchData.from,
      to: searchData.to,
      departureTime: '09:15',
      arrivalTime: '17:30',
      duration: '8h 15m',
      price: 720,
      availableSeats: 15,
      amenities: ['AC', 'Recliner Seats', 'Entertainment'],
      rating: 4.2,
      busType: 'Semi-Sleeper'
    },
    {
      id: 3,
      operator: 'RoyalCoach',
      from: searchData.from,
      to: searchData.to,
      departureTime: '22:00',
      arrivalTime: '06:15',
      duration: '8h 15m',
      price: 950,
      availableSeats: 8,
      amenities: ['WiFi', 'AC', 'Blanket', 'Meal', 'Premium Seats'],
      rating: 4.8,
      busType: 'Luxury Sleeper'
    }
  ]

  const cabTypes = [
    { id: 'economy', name: 'Economy', price: 15, icon: 'Car', description: 'Budget-friendly rides' },
    { id: 'comfort', name: 'Comfort', price: 22, icon: 'Truck', description: 'More space & comfort' },
    { id: 'premium', name: 'Premium', price: 35, icon: 'Crown', description: 'Luxury experience' }
  ]

  const generateSeats = () => {
    const seats = []
    for (let i = 1; i <= 40; i++) {
      const isOccupied = Math.random() < 0.3
      const isSelected = selectedSeats.includes(i)
      seats.push({
        number: i,
        status: isOccupied ? 'occupied' : isSelected ? 'selected' : 'available'
      })
    }
    return seats
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchData.from || !searchData.to) {
      toast.error('Please fill in departure and destination locations')
      return
    }
    if (searchData.from === searchData.to) {
      toast.error('Departure and destination cannot be the same')
      return
    }
    
    setShowResults(true)
    setCurrentStep('results')
    toast.success('Search completed! Found available options.')
  }

  const handleSeatSelect = (seatNumber) => {
    const seat = generateSeats().find(s => s.number === seatNumber)
    if (seat.status === 'occupied') return

    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(s => s !== seatNumber)
      } else if (prev.length < searchData.passengers) {
        return [...prev, seatNumber]
      } else {
        toast.warning(`You can only select ${searchData.passengers} seat(s)`)
        return prev
      }
    })
  }

  const handleBooking = (item) => {
    if (activeTab === 'bus' && selectedSeats.length !== searchData.passengers) {
      toast.error(`Please select ${searchData.passengers} seat(s)`)
      return
    }
    
    setCurrentStep('payment')
    toast.success('Proceeding to payment...')
  }

  const handlePayment = () => {
    // Simulate payment processing
    toast.success('Booking confirmed! Your ticket has been generated.')
    setCurrentStep('confirmed')
    
    // Reset after 3 seconds
    setTimeout(() => {
      setCurrentStep('search')
      setShowResults(false)
      setSelectedSeats([])
      setSearchData({
        from: '',
        to: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        passengers: 1,
        cabType: 'economy'
      })
    }, 3000)
  }

  const SearchForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glass p-6 sm:p-8"
    >
      {/* Tab Selector */}
      <div className="flex space-x-4 mb-6 sm:mb-8">
        {[
          { id: 'bus', label: 'Bus', icon: 'Bus' },
          { id: 'cab', label: 'Cab', icon: 'Car' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            <ApperIcon name={tab.icon} className="w-5 h-5" />
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-surface-700">
              {activeTab === 'bus' ? 'From City' : 'Pickup Location'}
            </label>
            <div className="relative">
              <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                type="text"
                value={searchData.from}
                onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                placeholder={activeTab === 'bus' ? 'Enter departure city' : 'Enter pickup address'}
                className="input-field pl-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-surface-700">
              {activeTab === 'bus' ? 'To City' : 'Drop Location'}
            </label>
            <div className="relative">
              <ApperIcon name="Navigation" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                type="text"
                value={searchData.to}
                onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                placeholder={activeTab === 'bus' ? 'Enter destination city' : 'Enter drop address'}
                className="input-field pl-11"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-surface-700">
              {activeTab === 'bus' ? 'Travel Date' : 'Pickup Date'}
            </label>
            <div className="relative">
              <ApperIcon name="Calendar" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
              <input
                type="date"
                value={searchData.date}
                min={format(new Date(), 'yyyy-MM-dd')}
                max={format(addDays(new Date(), 90), 'yyyy-MM-dd')}
                onChange={(e) => setSearchData(prev => ({ ...prev, date: e.target.value }))}
                className="input-field pl-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-surface-700">Passengers</label>
            <div className="relative">
              <ApperIcon name="Users" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
              <select
                value={searchData.passengers}
                onChange={(e) => setSearchData(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
                className="input-field pl-11"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          {activeTab === 'cab' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-surface-700">Cab Type</label>
              <div className="relative">
                <ApperIcon name="Car" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <select
                  value={searchData.cabType}
                  onChange={(e) => setSearchData(prev => ({ ...prev, cabType: e.target.value }))}
                  className="input-field pl-11"
                >
                  {cabTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name} - ₹{type.price}/km</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full btn-primary text-lg py-4"
        >
          <div className="flex items-center justify-center space-x-2">
            <ApperIcon name="Search" className="w-5 h-5" />
            <span>Search {activeTab === 'bus' ? 'Buses' : 'Cabs'}</span>
          </div>
        </motion.button>
      </form>
    </motion.div>
  )

  const ResultsList = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-surface-900">
          Available {activeTab === 'bus' ? 'Buses' : 'Cabs'}
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setCurrentStep('search')
            setShowResults(false)
          }}
          className="flex items-center space-x-2 text-primary hover:text-primary-dark"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          <span>Modify Search</span>
        </motion.button>
      </div>

      {activeTab === 'bus' ? (
        <div className="space-y-4">
          {busResults.map((bus, index) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-glass p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg sm:text-xl font-bold text-surface-900">{bus.operator}</h4>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Star" className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{bus.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Clock" className="w-4 h-4 text-surface-500" />
                      <div>
                        <div className="font-medium text-surface-900">{bus.departureTime} → {bus.arrivalTime}</div>
                        <div className="text-sm text-surface-600">{bus.duration}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Users" className="w-4 h-4 text-surface-500" />
                      <div>
                        <div className="font-medium text-surface-900">{bus.availableSeats} seats available</div>
                        <div className="text-sm text-surface-600">{bus.busType}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="IndianRupee" className="w-4 h-4 text-surface-500" />
                      <div>
                        <div className="font-bold text-lg text-surface-900">₹{bus.price}</div>
                        <div className="text-sm text-surface-600">per person</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {bus.amenities.map((amenity, idx) => (
                      <span key={idx} className="transportation-badge bg-secondary/10 text-secondary-dark">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentStep('booking')}
                    className="btn-primary"
                  >
                    Select Seats
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cabTypes.map((cab, index) => (
            <motion.div
              key={cab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card-glass p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <ApperIcon name={cab.icon} className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-surface-900 mb-2">{cab.name}</h4>
              <p className="text-surface-600 mb-4">{cab.description}</p>
              <div className="text-2xl font-bold text-primary mb-1">₹{cab.price}/km</div>
              <div className="text-sm text-surface-600 mb-6">Estimated: ₹{cab.price * 25}</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleBooking(cab)}
                className="btn-primary w-full"
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )

  const SeatSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glass p-6 sm:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-surface-900">Select Seats</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setCurrentStep('results')}
          className="flex items-center space-x-2 text-primary hover:text-primary-dark"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          <span>Back</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-surface-50 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-surface-300 rounded-lg px-4 py-2 text-sm font-medium text-surface-700">
                Driver
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
              {generateSeats().map((seat) => (
                <motion.button
                  key={seat.number}
                  whileHover={seat.status === 'available' ? { scale: 1.1 } : {}}
                  whileTap={seat.status === 'available' ? { scale: 0.95 } : {}}
                  onClick={() => handleSeatSelect(seat.number)}
                  className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200
                    ${seat.status === 'available' ? 'seat-available' : ''}
                    ${seat.status === 'occupied' ? 'seat-occupied' : ''}
                    ${seat.status === 'selected' ? 'seat-selected' : ''}
                  `}
                  disabled={seat.status === 'occupied'}
                >
                  {seat.number}
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center space-x-4 sm:space-x-6 mt-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-secondary rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-surface-400 rounded"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-50 rounded-2xl p-4 sm:p-6">
            <h4 className="font-bold text-surface-900 mb-4">Booking Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-surface-600">Selected Seats:</span>
                <span className="font-medium">{selectedSeats.join(', ') || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600">Passengers:</span>
                <span className="font-medium">{searchData.passengers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600">Price per seat:</span>
                <span className="font-medium">₹850</span>
              </div>
              <hr className="border-surface-300" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-primary">₹{850 * selectedSeats.length}</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => handleBooking()}
            disabled={selectedSeats.length !== searchData.passengers}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Payment
          </motion.button>
        </div>
      </div>
    </motion.div>
  )

  const PaymentForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glass p-6 sm:p-8"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-surface-900 mb-6">Payment Details</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-surface-900">Payment Method</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'card', label: 'Credit/Debit Card', icon: 'CreditCard' },
                { id: 'upi', label: 'UPI', icon: 'Smartphone' },
                { id: 'wallet', label: 'Wallet', icon: 'Wallet' },
                { id: 'netbanking', label: 'Net Banking', icon: 'Building' }
              ].map((method) => (
                <motion.div
                  key={method.id}
                  whileHover={{ scale: 1.02 }}
                  className="border-2 border-surface-200 rounded-xl p-4 cursor-pointer hover:border-primary transition-colors duration-300"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <ApperIcon name={method.icon} className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium text-center">{method.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Expiry</label>
                <input type="text" placeholder="MM/YY" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">CVV</label>
                <input type="text" placeholder="123" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Name on Card</label>
                <input type="text" placeholder="John Doe" className="input-field" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-50 rounded-2xl p-6">
            <h4 className="font-bold text-surface-900 mb-4">Order Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-surface-600">Route:</span>
                <span className="font-medium">{searchData.from} → {searchData.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600">Date:</span>
                <span className="font-medium">{format(new Date(searchData.date), 'MMM dd, yyyy')}</span>
              </div>
              {activeTab === 'bus' && (
                <div className="flex justify-between">
                  <span className="text-surface-600">Seats:</span>
                  <span className="font-medium">{selectedSeats.join(', ')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-surface-600">Base Fare:</span>
                <span className="font-medium">₹{activeTab === 'bus' ? 850 * selectedSeats.length : 750}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-600">Taxes & Fees:</span>
                <span className="font-medium">₹{activeTab === 'bus' ? Math.round(850 * selectedSeats.length * 0.18) : 135}</span>
              </div>
              <hr className="border-surface-300" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-primary">₹{activeTab === 'bus' ? Math.round(850 * selectedSeats.length * 1.18) : 885}</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handlePayment}
            className="btn-primary w-full text-lg py-4"
          >
            Pay Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )

  const BookingConfirmed = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-glass p-8 text-center"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 1 }}
        className="w-20 h-20 bg-secondary rounded-full mx-auto mb-6 flex items-center justify-center"
      >
        <ApperIcon name="Check" className="w-10 h-10 text-white" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-surface-900 mb-4">Booking Confirmed!</h3>
      <p className="text-surface-600 mb-6">Your ticket has been generated and sent to your email.</p>
      
      <div className="bg-surface-50 rounded-xl p-6 mb-6 text-left">
        <h4 className="font-bold mb-3">Booking Details</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>Booking ID: <span className="font-medium">RW{Math.random().toString(36).substr(2, 8).toUpperCase()}</span></div>
          <div>Status: <span className="font-medium text-secondary">Confirmed</span></div>
          <div>Route: <span className="font-medium">{searchData.from} → {searchData.to}</span></div>
          <div>Date: <span className="font-medium">{format(new Date(searchData.date), 'MMM dd, yyyy')}</span></div>
        </div>
      </div>
      
      <div className="text-sm text-surface-600">
        Redirecting to search in 3 seconds...
      </div>
    </motion.div>
  )

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 'search' && !showResults && (
              <motion.div key="search">
                <SearchForm />
              </motion.div>
            )}
            
            {currentStep === 'results' && showResults && (
              <motion.div key="results">
                <ResultsList />
              </motion.div>
            )}
            
            {currentStep === 'booking' && (
              <motion.div key="booking">
                <SeatSelection />
              </motion.div>
            )}
            
            {currentStep === 'payment' && (
              <motion.div key="payment">
                <PaymentForm />
              </motion.div>
            )}
            
            {currentStep === 'confirmed' && (
              <motion.div key="confirmed">
                <BookingConfirmed />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default MainFeature