export const NAV_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'achievements', label: 'ACHIEVEMENTS' },
  { id: 'feedback', label: 'FEEDBACK' },
  { id: 'contact', label: 'CONTACT' },
] as const

export type NavId = (typeof NAV_ITEMS)[number]['id']

export const CONTACT_LINKS = {
  email: 'ann.joseph94111@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ann-joseph94/',
  github: 'https://github.com/AnnJo94',
}

export type SkillNode = {
  id: string
  label: string
  tier: string
  x: number
  y: number
  status: 'MASTERED' | 'UNLOCKED' | 'TRAINING' | 'RESEARCHING'
  level: number
  description: string
  root?: boolean
}

export const SKILL_NODES: SkillNode[] = [
  { id: 'programming', label: 'Programming', tier: 'CORE', x: 50, y: 8, status: 'MASTERED', level: 5, root: true, description: 'The foundation of every system: logic, problem solving, and clean, structured code.' },
  { id: 'cpp', label: 'C++', tier: 'LANGUAGE', x: 28, y: 30, status: 'UNLOCKED', level: 4, description: 'Memory, performance, and algorithms. Where I learned how games run under the hood.' },
  { id: 'csharp', label: 'C#', tier: 'LANGUAGE', x: 72, y: 30, status: 'TRAINING', level: 3, description: 'The scripting language of Unity. Used to build gameplay logic, components, and tools.' },
  { id: 'gamedev', label: 'Game Development', tier: 'DISCIPLINE', x: 50, y: 50, status: 'TRAINING', level: 3, root: true, description: 'Turning code into play: loops, feedback, game feel, and player experience.' },
  { id: 'unity', label: 'Unity', tier: 'ENGINE', x: 18, y: 71, status: 'TRAINING', level: 3, description: 'Scenes, prefabs, components, and the editor workflow for building 3D worlds.' },
  { id: 'gameplay', label: 'Gameplay Systems', tier: 'SYSTEMS', x: 50, y: 71, status: 'TRAINING', level: 2, description: 'Inventory, health, spawning, and state machines that keep a game running.' },
  { id: 'mechanics', label: 'Game Mechanics', tier: 'DESIGN', x: 82, y: 71, status: 'UNLOCKED', level: 3, description: 'Movement, interaction, and rules: the verbs that make a game fun to play.' },
  { id: 'ai', label: 'AI', tier: 'ADVANCED', x: 12, y: 92, status: 'RESEARCHING', level: 1, description: 'Pathfinding, decision making, and enemies that react to the player.' },
  { id: 'physics', label: 'Physics', tier: 'ADVANCED', x: 37, y: 92, status: 'RESEARCHING', level: 1, description: 'Rigidbodies, collisions, and forces that make worlds feel tangible.' },
  { id: 'optimization', label: 'Optimization', tier: 'ADVANCED', x: 63, y: 92, status: 'RESEARCHING', level: 1, description: 'Profiling and squeezing out frames so every experience runs smoothly.' },
  { id: '3d', label: '3D Development', tier: 'ADVANCED', x: 88, y: 92, status: 'RESEARCHING', level: 1, description: 'Building and lighting 3D spaces, cameras, and environments.' },
]

export const SKILL_EDGES: [string, string][] = [
  ['programming', 'cpp'],
  ['programming', 'csharp'],
  ['cpp', 'gamedev'],
  ['csharp', 'gamedev'],
  ['gamedev', 'unity'],
  ['gamedev', 'gameplay'],
  ['gamedev', 'mechanics'],
  ['unity', 'ai'],
  ['gameplay', 'physics'],
  ['gameplay', 'optimization'],
  ['mechanics', '3d'],
]

export type Project = {
  level: string
  name: string
  type: string
  status: 'COMPLETED' | 'IN DEVELOPMENT' | 'PROTOTYPE' | 'LOCKED'
  difficulty: number
  image: string
  technologies: string[]
  description: string
  role: string
  features: string[]
  link?: string
}

export const PROJECTS: Project[] = [
  {
    level: '01',
    name: 'Maze Explorer',
    type: 'Puzzle / Algorithm Game',
    status: 'COMPLETED',
    difficulty: 2,
    image: '/images/level-maze.png',
    technologies: ['C++', 'Data Structures', 'BFS / DFS', 'Procedural Generation'],
    description:
      'A maze exploration game where every run generates a brand-new labyrinth. Navigate to the exit, or watch the built-in solver visualize the shortest path in real time.',
    role: 'Solo developer — game design, programming, and algorithm implementation.',
    features: ['Procedurally generated mazes', 'Pathfinding solver visualization', 'Multiple difficulty levels', 'Move counter and timer'],
    link: 'https://github.com/AnnJo94',
  },
  {
    level: '02',
    name: 'Unity Survival',
    type: '3D Survival Prototype',
    status: 'IN DEVELOPMENT',
    difficulty: 3,
    image: '/images/level-survival.png',
    technologies: ['Unity', 'C#', 'ScriptableObjects', 'NavMesh'],
    description:
      'A 3D survival prototype built in Unity. Gather resources, manage hunger and health, and survive the night as the world becomes more dangerous.',
    role: 'Gameplay programmer — player systems, survival stats, and enemy behavior.',
    features: ['Resource gathering and crafting', 'Day / night cycle', 'Health and hunger systems', 'Basic enemy AI'],
    link: 'https://github.com/AnnJo94',
  },
  {
    level: '03',
    name: 'Future Project',
    type: 'Open World Adventure',
    status: 'LOCKED',
    difficulty: 5,
    image: '/images/level-future.png',
    technologies: ['Unity', 'C#', '3D', 'AI'],
    description:
      'The next big level. An open world adventure that brings together everything learned so far — exploration, survival, and intelligent creatures.',
    role: 'Creator — currently in the planning and research phase.',
    features: ['Explorable open world', 'Dynamic weather and time', 'Creature AI', 'Story-driven quests'],
  },
]

export const JOURNEY = [
  { level: '01', title: 'Programming Fundamentals', description: 'Variables, loops, functions, and the logic behind every program.', reward: 'Problem Solving' },
  { level: '02', title: 'C++ Development', description: 'Pointers, memory, OOP, and writing performant code.', reward: 'Low-Level Thinking' },
  { level: '03', title: 'Game Algorithms', description: 'Pathfinding, procedural generation, and data structures for games.', reward: 'Maze Explorer' },
  { level: '04', title: 'Unity + C#', description: 'Components, prefabs, and scripting gameplay in a real engine.', reward: 'Engine Access' },
  { level: '05', title: 'Game Development', description: 'Combining code, design, and feel into complete, playable experiences.', reward: 'In Progress', current: true },
]
