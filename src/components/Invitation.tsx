import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Sparkles, Users, MessageCircle, CheckCircle } from 'lucide-react'

// Thay YOUR_SCRIPT_ID bằng ID từ Google Apps Script sau khi deploy
const SHEET_URL = import.meta.env.VITE_SHEET_URL

const Invitation: React.FC = () => {
  const [titleRef, titleInView] = useInView({ threshold: 0.5, triggerOnce: true })

  const [formData, setFormData] = useState({
    attendance: 'yes',
    name: '',
    phone: '',
    guestOf: 'groom',
    numberOfGuests: '1',
    pickupLocation: '',
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
    <section id="invitation" className="section-padding relative overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cosmic-100/40 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-nebula-100/30 rounded-full blur-[100px] animate-float-delay-2" />
      </div>

      <div className="container-minimal relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Save the Date Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: [0, 1, -1, 0], scale: [1, 1.01, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-80 h-80 lg:w-[450px] lg:h-[450px] mx-auto mb-10"
              >
                <div className="absolute inset-0 border-[10px] border-white shadow-2xl rounded-2xl overflow-hidden">
                  <img src="assets/5.jpg" alt="Save the Date" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                {/* Floating Sparles - Bronze/Gold */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div key={i} className="absolute text-cosmic-400"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ y: [0, -30, 0], opacity: [0.1, 0.6, 0.1], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl lg:text-5xl font-display font-bold text-gradient-gold pb-2"
            >
              Đăng Khoa  &  Thanh Hằng
            </motion.h3>
          </motion.div>

          {/* Right Side - Invitation Details */}
          <div className="space-y-10">
            {/* Family Info */}
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, x: 50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center"
            >
              
              <div className="p-6 rounded-2xl bg-beige-50 border border-cosmic-100/50 shadow-sm">
                <h4 className="text-lg font-bold text-cosmic-700 mb-4 uppercase tracking-[0.2em]">Nhà Trai</h4>
                <div className="space-y-2 text-void-700">
                  <p className="font-medium">Ông: Phaolô Đồng Đắc Tám</p>
                  <p className="font-medium">Bà: Matta Lê Thị Hoa</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-beige-50 border border-cosmic-100/50 shadow-sm">
                <h4 className="text-lg font-bold text-cosmic-700 mb-4 uppercase tracking-[0.2em]">Nhà Gái</h4>
                <div className="space-y-2 text-void-700">
                  <p className="font-medium">Ông: Lý Văn Vân</p>
                  <p className="font-medium">Bà: Lê Thị Ngọc Thanh</p>
                </div>
              </div>
            </motion.div>

            {/* Main Invitation */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-void-900 tracking-widest uppercase">Trân trọng kính mời</h3>
              <p className="text-xl lg:text-2xl font-serif text-cosmic-600 italic">Bạn cùng gia đình</p>
              <p className="text-void-500 italic">(Tới dự Lễ Tân Hôn của hai con chúng tôi)</p>
            </div>

            {/* Couple Names */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 py-4"
            >
              <h4 className="text-2xl lg:text-2xl font-display font-bold text-void-900">Phêrô Đăng Khoa</h4>
              
              <Heart className="w-10 h-10 text-nebula-400 fill-current animate-pulse-slow" />
              
              <h4 className="text-2xl lg:text-2xl font-display font-bold text-void-900">Maria Thanh Hằng</h4>
            </motion.div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white rounded-2xl p-6 border border-cosmic-100 shadow-sm text-center">
                <p className="text-cosmic-500 text-sm uppercase tracking-widest mb-2 font-medium">Tổ chức vào lúc</p>
                <h4 className="text-3xl font-bold text-void-900">11 giờ 30</h4>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-cosmic-100 shadow-sm text-center">
                <h4 className="text-lg font-bold text-void-900 mb-1 leading-tight">Thứ bảy, ngày 18 tháng 04 năm 2026</h4>
                <p className="text-void-500 italic text-[11px]">(Nhằm ngày 02 tháng 03 năm Bính Ngọ)</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={titleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white rounded-3xl p-8 border border-cosmic-200/50 shadow-soft"
            >
              <div className="text-center space-y-4">
                <p className="text-void-600 uppercase tracking-widest text-xs font-semibold">Tổ chức tại:</p>
                <h4 className="text-xl font-bold text-void-1000">Bãi tiệc cưới Sông Quê - Trần Quý Cáp - Xã Tuyên Quang - Tỉnh Lâm Đồng</h4>
                <div className="divider opacity-30" />
                <p className="text-cosmic-600 italic text-sm">Sự hiện diện của Quý khách là niềm vinh hạnh của gia đình chúng tôi!</p>
                
                <motion.a
                  href="https://maps.app.goo.gl/StmS1twNEkrfym1F8"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center space-x-2 bg-void-900 text-white px-10 py-3 rounded-full text-sm font-medium transition-all hover:bg-void-800 shadow-lg"
                >
                  <span>Chỉ đường trên Google Maps</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-28 max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-[40px] p-8 lg:p-16 border border-cosmic-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cosmic-400 via-nebula-300 to-cosmic-400" />
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <CheckCircle className="w-20 h-20 text-aurora-500 mx-auto mb-6" />
                <h3 className="text-3xl font-display font-bold text-void-900 mb-4">Cảm ơn bạn!</h3>
                <p className="text-void-600 text-lg">Tụi mình đã nhận được phản hồi của bạn. Hẹn gặp lại trong ngày vui!</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cosmic-50 text-cosmic-500 mb-8">
                    <Users className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-display font-bold text-void-900 mb-4">Xác nhận tham dự</h3>
                  <p className="text-void-500">Hãy cho tụi mình biết để chuẩn bị đón tiếp chu đáo nhé!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <label className={`flex items-center justify-center space-x-3 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.attendance === 'yes' ? 'border-cosmic-400 bg-cosmic-50/50 text-cosmic-700' : 'border-void-100 text-void-400 hover:border-cosmic-200'}`}>
                      <input type="radio" name="attendance" value="yes" checked={formData.attendance === 'yes'} onChange={handleInputChange} className="hidden" />
                      <span className="font-bold text-lg">Sẽ tham dự</span>
                    </label>
                    <label className={`flex items-center justify-center space-x-3 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.attendance === 'no' ? 'border-nebula-400 bg-nebula-50/50 text-nebula-700' : 'border-void-100 text-void-400 hover:border-nebula-200'}`}>
                      <input type="radio" name="attendance" value="no" checked={formData.attendance === 'no'} onChange={handleInputChange} className="hidden" />
                      <span className="font-bold text-lg">Không thể đi</span>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <p className="text-void-900 font-bold ml-1 text-sm uppercase tracking-wider">Họ và tên</p>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Tên của bạn là..." required
                      className="w-full p-5 rounded-2xl bg-void-50 border border-void-100 text-void-900 placeholder-void-300 focus:outline-none focus:ring-2 focus:ring-cosmic-400/20 focus:border-cosmic-400 transition-all font-medium" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-void-900 font-bold ml-1 text-sm uppercase tracking-wider">Số điện thoại</p>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Số điện thoại của bạn..." required pattern="[0-9]{10,11}"
                      className="w-full p-5 rounded-2xl bg-void-50 border border-void-100 text-void-900 placeholder-void-300 focus:outline-none focus:ring-2 focus:ring-cosmic-400/20 focus:border-cosmic-400 transition-all font-medium" />
                  </div>

                  <div className="space-y-4">
                    <p className="text-void-900 font-bold ml-1 text-sm uppercase tracking-wider">Bạn là khách của?</p>
                    <div className="grid grid-cols-2 gap-6">
                      <label className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all ${formData.guestOf === 'bride' ? 'border-nebula-300 bg-nebula-50 text-nebula-700 shadow-sm' : 'border-void-100 text-void-400'}`}>
                        <input type="radio" name="guestOf" value="bride" checked={formData.guestOf === 'bride'} onChange={handleInputChange} className="hidden" />
                        <span className="font-medium text-sm">Cô dâu</span>
                      </label>
                      <label className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all ${formData.guestOf === 'groom' ? 'border-cosmic-300 bg-cosmic-50 text-cosmic-700 shadow-sm' : 'border-void-100 text-void-400'}`}>
                        <input type="radio" name="guestOf" value="groom" checked={formData.guestOf === 'groom'} onChange={handleInputChange} className="hidden" />
                        <span className="font-medium text-sm">Chú rể</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-void-900 font-bold ml-1 text-sm uppercase tracking-wider">Số lượng khách</p>
                    <div className="custom-select">
                      <select name="numberOfGuests" value={formData.numberOfGuests} onChange={handleInputChange}
                        className="w-full p-5 rounded-2xl bg-void-50 border border-void-100 text-void-900 focus:outline-none focus:ring-2 focus:ring-cosmic-400/20 transition-all font-medium cursor-pointer">
                        <option value="1">Tham dự 1 người</option>
                        <option value="2">Tham dự 2 người</option>
                        <option value="3">Tham dự 3 người</option>
                        <option value="4">Tham dự 4 người</option>
                        <option value="5">Tham dự 5 người</option>
                      </select>
                    </div>
                  </div>

                  {formData.attendance === 'yes' && (
                    <div className="space-y-4">
                      <p className="text-void-900 font-bold ml-1 text-sm uppercase tracking-wider">Chọn điểm đón (18/04/2026)</p>
                      <div className="grid grid-cols-1 gap-4">
                        <label className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all ${formData.pickupLocation === 'thu_duc' ? 'border-cosmic-300 bg-cosmic-50 text-cosmic-700 shadow-sm' : 'border-void-100 text-void-400 hover:border-cosmic-200'}`}>
                          <input type="radio" name="pickupLocation" value="thu_duc" checked={formData.pickupLocation === 'thu_duc'} onChange={handleInputChange} className="hidden" />
                          <span className="font-medium text-sm">7h00 - Ngã tư Thủ Đức - P. Tăng Nhơn Phú - Tp. HCM</span>
                        </label>
                        <label className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all ${formData.pickupLocation === 'viettel' ? 'border-cosmic-300 bg-cosmic-50 text-cosmic-700 shadow-sm' : 'border-void-100 text-void-400 hover:border-cosmic-200'}`}>
                          <input type="radio" name="pickupLocation" value="viettel" checked={formData.pickupLocation === 'viettel'} onChange={handleInputChange} className="hidden" />
                          <span className="font-medium text-sm">8h00 - Toà nhà Viettel - 285 CMT8 - P. Hoà Hưng - TP. HCM</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-void-900 font-bold ml-1 text-sm uppercase tracking-wider">Lời nhắn gửi</p>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Lời chúc của bạn..." rows={4}
                      className="w-full p-5 rounded-2xl bg-void-50 border border-void-100 text-void-900 placeholder-void-300 focus:outline-none focus:ring-2 focus:ring-cosmic-400/20 transition-all resize-none font-medium" />
                  </div>

                  <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    disabled={submitting}
                    className="w-full btn-primary text-xl py-5 rounded-2xl disabled:opacity-60 shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-bold">{submitting ? 'Đang gửi...' : 'Gửi xác nhận'}</span>
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
