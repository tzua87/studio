import type { LucideIcon } from 'lucide-react';
import { Atom, FlaskConical, Sigma } from 'lucide-react';

export interface Subject {
  name: string;
  slug: 'physics' | 'chemistry' | 'math';
  icon: LucideIcon;
  description: string;
  lessons: { title: string; content: string }[];
}

export const SUBJECTS: Subject[] = [
  {
    name: 'Physics',
    slug: 'physics',
    icon: Atom,
    description: 'Explore the laws of motion, energy, and the universe.',
    lessons: [
      { title: 'Introduction to Kinematics', content: 'Learn about displacement, velocity, and acceleration.' },
      { title: 'Newton\'s Laws of Motion', content: 'Understand the fundamental principles governing the motion of objects.' },
      { title: 'Work, Energy, and Power', content: 'Explore concepts of energy conservation and transformation.' },
    ],
  },
  {
    name: 'Chemistry',
    slug: 'chemistry',
    icon: FlaskConical,
    description: 'Dive into the world of atoms, molecules, and chemical reactions.',
    lessons: [
      { title: 'Atomic Structure', content: 'Discover the components of an atom and their properties.' },
      { title: 'The Periodic Table', content: 'Learn how elements are organized and the trends in their properties.' },
      { title: 'Chemical Bonding', content: 'Understand how atoms join to form molecules and compounds.' },
    ],
  },
  {
    name: 'Math',
    slug: 'math',
    icon: Sigma,
    description: 'Sharpen your skills in algebra, geometry, and calculus.',
    lessons: [
        { title: 'Linear Equations', content: 'Master solving equations with one or more variables.' },
        { title: 'Quadratic Functions', content: 'Explore parabolas and their properties.' },
        { title: 'Introduction to Geometry', content: 'Learn about points, lines, angles, and shapes.' },
    ]
  },
];

export const QUIZZES: Record<string, { title: string; questions: any[] }> = {
  physics: {
    title: 'Physics Quiz',
    questions: [
      {
        question: 'What is the SI unit of force?',
        options: ['Joule', 'Watt', 'Newton', 'Pascal'],
        answer: 'Newton',
      },
      {
        question: 'Which of Newton\'s laws is also known as the law of inertia?',
        options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'],
        answer: 'First Law',
      },
      {
        question: 'What is the formula for kinetic energy?',
        options: ['mgh', '1/2 mv^2', 'ma', 'F*d'],
        answer: '1/2 mv^2',
      },
    ],
  },
  chemistry: {
    title: 'Chemistry Quiz',
    questions: [
      {
        question: 'What is the chemical symbol for Gold?',
        options: ['Ag', 'Au', 'G', 'Go'],
        answer: 'Au',
      },
      {
        question: 'Which element has the atomic number 1?',
        options: ['Helium', 'Oxygen', 'Hydrogen', 'Carbon'],
        answer: 'Hydrogen',
      },
       {
        question: 'What type of bond is formed by the transfer of electrons?',
        options: ['Ionic Bond', 'Covalent Bond', 'Metallic Bond', 'Hydrogen Bond'],
        answer: 'Ionic Bond',
      },
    ],
  },
  math: {
    title: 'Math Quiz',
    questions: [
      {
        question: 'What is the value of x in the equation 2x + 3 = 7?',
        options: ['1', '2', '3', '4'],
        answer: '2',
      },
      {
        question: 'What is the area of a circle with a radius of 5 units?',
        options: ['10π', '25π', '5π', '100π'],
        answer: '25π',
      },
      {
        question: 'What is the next prime number after 7?',
        options: ['9', '10', '11', '12'],
        answer: '11',
      },
    ],
  },
};
