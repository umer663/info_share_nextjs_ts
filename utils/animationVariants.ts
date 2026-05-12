import { Variants } from 'framer-motion';
import { theme } from '@/config/theme';

const { animation } = theme;

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.duration.normal, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: -20, transition: { duration: animation.duration.fast } },
};

export const fadeSlideDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.duration.normal, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: 20, transition: { duration: animation.duration.fast } },
};

export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: animation.duration.normal },
  },
};

export const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: animation.duration.normal },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: animation.duration.normal },
  },
  exit: { opacity: 0, transition: { duration: animation.duration.fast } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: animation.duration.normal, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: animation.duration.fast } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animation.stagger,
      delayChildren: animation.duration.fast,
    },
  },
};

export const slideInDrawer: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 },
  },
  exit: {
    x: '100%',
    transition: { duration: animation.duration.normal, ease: 'easeIn' },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: animation.duration.slow, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, y: -12, transition: { duration: animation.duration.fast } },
};

export const counterAnimation = {
  duration: animation.duration.slower,
  ease: 'easeOut' as const,
};

export const cardHover = {
  rest: { scale: 1, boxShadow: 'var(--shadow-md)' },
  hover: {
    scale: 1.02,
    boxShadow: 'var(--shadow-xl)',
    transition: { duration: animation.duration.fast },
  },
};

export const listItemAnimation: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * animation.stagger,
      duration: animation.duration.normal,
    },
  }),
};
