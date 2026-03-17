import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Sparkles, Star, Users, MessageCircle, CheckCircle } from 'lucide-react'

// Thay YOUR_SCRIPT_ID bằng ID từ Google Apps Script sau khi deploy
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxLEs9La_ZWqRC4YDkIOtvyyihYkVhOOA5iR-JdlegkntRwksVXngSZctUTNawXAoukYA/exec'

const Invitation: React.FC = () => {
  const [titleRef, titleInView] = useInView({ threshold: 0.5, triggerOnce: true })

  const [formData, setFormData] = useState({
    attendance: 'yes',
    name: '',
    guestOf: 'bride',
    numberOfGuests: '1',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Submit error:', error)
      alert('Có lỗi xảy ra, vui lòng thử lại!')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="invitation" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cosmic-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-nebula-500/5 rounded-full blur-3xl animate-float-delay-2" />
      </div>

      <div className="container-cosmic relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Save the Date Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto mb-8"
              >
                <div className="absolute inset-0 cosmic-border rounded-full overflow-hidden">
                  <img src="assets/5.jpg" alt="Save the Date" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-900/60 via-transparent to-cosmic-900/30" />
                </div>
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div key={i} className="absolute"
                    style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }}
                    animate={{ y: [0, -15, 0], rotate: [0, 180, 360], scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                  >
                    {i % 2 === 0 ? <Star className="w-4 h-4 text-cosmic-400 fill-current" /> : <Sparkles className="w-3 h-3 text-nebula-400" />}
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 bg-clip-text text-transparent"
            >
              Thanh Hằng & Đăng Khoa
            </motion.h3>
          </motion.div>

          {/* Right Side - Invitation Details */}
          <div className="space-y-8">
            {/* Family Info */}
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, x: 50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center"
            >
              <div>
                <h4 className="text-xl font-bold text-cosmic-400 mb-4 uppercase tracking-wider">Nhà Gái</h4>
                <div className="space-y-2 text-white/80">
                  <p className="font-medium">Ông: Lý Văn Vân</p>
                  <p className="font-medium">Bà: Lê Thị Ngọc Thanh</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-cosmic-400 mb-4 uppercase tracking-wider">Nhà Trai</h4>
                <div className="space-y-2 text-white/80">
                  <p className="font-medium">Ông: Phaolô Đồng Đắc Tám</p>
                  <p className="font-medium">Bà: Matta Lê Thị Hoa</p>
                </div>
              </div>
            </motion.div>

            {/* Main Invitation - No Animation */}
            <div className="text-center space-y-6">
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-white">TRÂN TRỌNG KÍNH MỜI</h3>
              <p className="text-xl lg:text-2xl font-semibold text-cosmic-300">Bạn cùng gia đình</p>
              <p className="text-white/70 italic">(Tới dự Lễ Vu Quy của hai con chúng tôi)</p>
            </div>

            {/* Couple Names */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8"
            >
              <h4 className="text-2xl lg:text-2xl font-display font-bold text-white">Maria Thanh Hằng</h4>
              <Heart className="w-8 h-8 text-nebula-400 fill-current" />
              <h4 className="text-2xl lg:text-2xl font-display font-bold text-white">Phêrô Đăng Khoa</h4>
            </motion.div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="glass-cosmic rounded-2xl p-6 space-y-4">
                <p className="text-cosmic-300 text-center">Tổ chức vào lúc</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-white text-center">11 giờ 30</h4>
              </div>
              <div className="glass-cosmic rounded-2xl p-6 space-y-4">
                <h4 className="text-xl lg:text-2xl font-bold text-white text-center">Chủ nhật, ngày 29 tháng 03 năm 2026</h4>
                <p className="text-white/70 italic text-center text-sm">(Nhằm ngày 11 tháng 02 năm Bính Ngọ)</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass-cosmic rounded-2xl p-6 space-y-4"
            >
              <div className="text-center space-y-2">
                <p className="text-white/80">Tại:</p>
                <p className="text-lg font-bold text-white">Tư Gia Nhà Gái, Xã Đồng Sơn, Tỉnh Đồng Tháp</p>
              </div>
              <p className="text-cosmic-300 italic text-center text-sm">Sự hiện diện của Quý khách là niềm vinh hạnh của gia đình chúng tôi!</p>
              
              {/* Google Maps Button */}
              <motion.a
                href="https://maps.app.goo.gl/LKR3dELQ8X1xqQRT9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block w-full btn-cosmic text-center py-3 mt-4"
              >
                <span className="relative z-10">Chỉ đường trên Google Maps</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 max-w-2xl mx-auto"
        >
          <div className="glass-cosmic rounded-3xl p-8 lg:p-12">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-aurora-400 mx-auto mb-4" />
                <h3 className="text-2xl font-display font-bold text-white mb-2">Cảm ơn bạn!</h3>
                <p className="text-white/70">Tụi mình đã nhận được phản hồi của bạn. Hẹn gặp lại trong ngày vui!</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white mb-6"
                  >
                    <Users className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">Bạn sẽ đến chứ?</h3>
                  <p className="text-white/70">Hãy dành chút thời gian để nói cho tụi mình biết nhé!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3 p-4 rounded-xl glass-cosmic cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="radio" name="attendance" value="yes" checked={formData.attendance === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-cosmic-500" />
                      <span className="text-white font-medium">Có</span>
                    </label>
                    <label className="flex items-center space-x-3 p-4 rounded-xl glass-cosmic cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="radio" name="attendance" value="no" checked={formData.attendance === 'no'} onChange={handleInputChange} className="w-4 h-4 text-cosmic-500" />
                      <span className="text-white font-medium">Không</span>
                    </label>
                  </div>

                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Tên của bạn" required
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cosmic-400 transition-colors" />

                  <div>
                    <h6 className="text-white font-medium mb-3">Bạn là khách của?</h6>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 p-4 rounded-xl glass-cosmic cursor-pointer hover:bg-white/10 transition-colors">
                        <input type="radio" name="guestOf" value="bride" checked={formData.guestOf === 'bride'} onChange={handleInputChange} className="w-4 h-4 text-cosmic-500" />
                        <span className="text-white font-medium">Cô dâu</span>
                      </label>
                      <label className="flex items-center space-x-3 p-4 rounded-xl glass-cosmic cursor-pointer hover:bg-white/10 transition-colors">
                        <input type="radio" name="guestOf" value="groom" checked={formData.guestOf === 'groom'} onChange={handleInputChange} className="w-4 h-4 text-cosmic-500" />
                        <span className="text-white font-medium">Chú rể</span>
                      </label>
                    </div>
                  </div>

                  <select name="numberOfGuests" value={formData.numberOfGuests} onChange={handleInputChange}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cosmic-400 transition-colors">
                    <option value="1">01 khách</option>
                    <option value="2">02 khách</option>
                    <option value="3">03 khách</option>
                    <option value="4">04 khách</option>
                    <option value="5">05 khách</option>
                  </select>

                  <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Lời chúc" rows={4} required
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-cosmic-400 transition-colors resize-none" />

                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    disabled={submitting}
                    className="w-full btn-cosmic text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>{submitting ? 'Đang gửi...' : 'Gửi'}</span>
                    </span>
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Invitation
