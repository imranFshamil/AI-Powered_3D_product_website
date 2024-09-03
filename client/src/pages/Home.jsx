import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

// Bounce animation with pause
const bounceAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0], // Bounce effect: move up, then down
    transition: {
      duration: 0.6, // Duration of one bounce cycle
      ease: "easeInOut",
      repeat: Infinity, // Infinite loop
      repeatType: "loop", // Loop type
      repeatDelay: 2 // Pause for 2 seconds between bounces
    }
  }
};

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <img 
              src='./threejs.png'
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <motion.h1 
                className="head-text"
                variants={bounceAnimation}
                initial="initial"
                animate="animate"
              >
                LET'S <br className="xl:block hidden" /> Bounce.
              </motion.h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
              Ready to rock a shirt so unique, even your laundry will do a double-take? <strong>Use our 3D tool</strong>{" "} to design a style that's 100% you!"
              </p>

              <CustomButton 
                type="filled"
                title="Customize It"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home;
