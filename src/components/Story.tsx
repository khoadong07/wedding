import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface StoryCardProps {
  number: string
  title: string
  content: string
  imageSrc: string
  imageAlt: string
  webpSrcSet: string
  reverse?: boolean
  delay?: number
}

const Story: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const stories = [
    {
      number: 'Phase 01',
      title: 'Lần đầu gặp gỡ',
      content: 'Bắt đầu từ những ánh nhìn lạ lẫm, chúng mình đã tìm thấy sự đồng điệu kỳ lạ trong tâm hồn. Những mẩu chuyện không tên đã dệt nên một khởi đầu đầy hy vọng.',
      imageSrc: 'assets/_32A7964%20-%20HC.jpg',
      imageAlt: 'Khởi đầu tình yêu',
      webpSrcSet: 'optimized/_32A7964%20-%20HC-480.webp 480w, optimized/_32A7964%20-%20HC-768.webp 768w, optimized/_32A7964%20-%20HC-1200.webp 1200w',
    },
    {
      number: 'Phase 02',
      title: 'Hành trình vun đắp',
      content: 'Cùng nhau bước qua những ngày nắng gắt và cả những chiều mưa giông, chúng mình hiểu rằng tình yêu không chỉ là cảm xúc, mà là sự thấu hiểu và đồng hành.',
      imageSrc: 'assets/_32A8457%20-%20HC.jpg',
      imageAlt: 'Hành trình tình yêu',
      webpSrcSet: 'optimized/_32A8457%20-%20HC-480.webp 480w, optimized/_32A8457%20-%20HC-768.webp 768w, optimized/_32A8457%20-%20HC-1200.webp 1200w',
      reverse: true,
    },
    {
      number: 'Phase 03',
      title: 'Lời hứa trăm năm',
      content: 'Và giờ đây, chúng mình sẵn sàng nắm tay nhau bước vào một chương hoàn toàn mới. Một lời hứa trân trọng, chăm sóc và yêu thương nhau đến trọn đời.',
      imageSrc: 'assets/25.jpg',
      imageAlt: 'Lời hứa trăm năm',
      webpSrcSet: 'assets/25.jpg',
    },
  ]

  return (
    <section id="story" className="section-padding bg-white relative">
      <div className="container-minimal">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-6xl font-display font-bold mb-6 text-void-900">
            Câu Chuyện Tình Yêu
          </h2>
          <p className="text-void-400 font-serif italic text-lg uppercase tracking-widest">Our Love Story</p>
        </motion.div>

        {/* Story Cards */}
        <div className="space-y-32 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <StoryCard
              key={story.number}
              {...story}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const StoryCard: React.FC<StoryCardProps> = ({
  number,
  title,
  content,
  imageSrc,
  imageAlt,
  webpSrcSet,
  reverse = false,
  delay = 0,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } items-center gap-12 lg:gap-24 group`}
    >
      {/* Image Area */}
      <div className="w-full lg:flex-1 relative">
        <div className="absolute -inset-4 bg-beige-50 rounded-[40px] -z-10 transition-transform duration-700 group-hover:scale-95" />
        <div className="relative overflow-hidden rounded-[32px] shadow-2xl aspect-[4/3]">
          <picture>
            <source type="image/webp" srcSet={webpSrcSet} sizes="(max-width: 768px) 100vw, 50vw" />
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
          </picture>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full lg:flex-1 space-y-6">
        <div className="text-sm font-bold tracking-[0.4em] uppercase text-cosmic-400">
          {number}
        </div>
        <h3 className="text-3xl sm:text-5xl font-display font-bold text-void-900 leading-tight">
          {title}
        </h3>
        <p className="text-lg sm:text-xl leading-relaxed text-void-500 font-serif italic">
          "{content}"
        </p>
        <div className="pt-4">
           <div className="w-12 h-0.5 bg-cosmic-100" />
        </div>
      </div>
    </motion.div>
  )
}

export default Story