"use client"

import { motion } from "framer-motion"
import Interior from "./main/interior/Interior"
import Location from "./main/location/Location"
import News_on_image_main from "./main/news/news_on_image/News_on_image_main"
import News_text from "./main/news/news_text/News_text"

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
}

export default function Main() {
  return (
    <>
      <div className="lg:block hidden">
        <News_on_image_main />
      </div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
      >
        <News_text />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.08 }}
      >
        <Location />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.14 }}
      >
        <Interior />
      </motion.div>
      {/* <Footer /> */}
    </>
  )
}
