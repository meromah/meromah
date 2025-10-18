// Mock data for explore items
export const exploreData = {
  posts: [
    { id: 'p1', type: 'post', author: { name: 'Alice', username: 'alice', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=alice' }, text: 'Greedy vs DP?', board: 'algorithms-101', comments: 1, likes: 4, shares: 0, date: '1d' },
  ],
  boards: [
    { id: 'p2', type: 'post', author: { name: 'Board Bot', username: 'boards', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=board' }, text: 'Welcome to Algorithms 101 board', board: 'algorithms-101', comments: 0, likes: 1, shares: 0, date: '2d' },
  ],
  libraries: [
    { id: 'p3', type: 'library', author: { name: 'Kate', username: 'kate', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=kate' }, text: 'Sorting Cheatsheet', description: 'Quick reference for sorting', file: { name: 'sorting.pdf' }, board: 'algorithms-101', comments: 0, likes: 2, shares: 0, date: '2d' },
  ],
  quizzes: [
    { id: 'p4', type: 'quiz', author: { name: 'Quiz Bot', username: 'quiz', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=quiz' }, text: 'Greedy vs DP MCQ', description: '5 questions', board: 'algorithms-101', comments: 0, likes: 3, shares: 0, date: '3d' },
  ],
}

// Mock data for posts
export const mockPosts = [
  {
    id: "p1",
    type: "post",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Loved the lecture on greedy algorithms today! Any good resources?",
    board: "algorithms-101",
    comments: 3,
    likes: 12,
    shares: 1,
    date: "2h",
  },
  {
    id: "p2",
    type: "quiz",
    author: {
      name: "Quiz Bot",
      username: "quizbot",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=quiz",
    },
    text: "Dynamic Programming Basics",
    description: "10 MCQs to test your fundamentals",
    board: "algorithms-101",
    comments: 0,
    likes: 5,
    shares: 0,
    date: "5h",
  },
  {
    id: "p3",
    type: "library",
    author: {
      name: "Bob Lee",
      username: "bob",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=bob",
    },
    text: "Graph Notes",
    description: "Concise notes on graphs with examples",
    file: { name: "graphs-notes.pdf" },
    board: "discrete-math",
    comments: 2,
    likes: 8,
    shares: 2,
    date: "1d",
  },
];

// Mock comment data
export const mockComments = {
  p1: [
    {
      id: "c1",
      author: {
        name: "Charlie Chen",
        username: "charlie",
        avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=charlie",
      },
      text: "Check out the MIT lectures on YouTube! They have great examples.",
      date: "1h",
      likes: 3,
    },
    {
      id: "c2",
      author: {
        name: "Diana Park",
        username: "diana",
        avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=diana",
      },
      text: "I found this book really helpful: 'Introduction to Algorithms' by Cormen.",
      date: "45m",
      likes: 1,
    },
    {
      id: "c3",
      author: {
        name: "Eve Wilson",
        username: "eve",
        avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=eve",
      },
      text: "The GeeksforGeeks articles are also pretty good for quick reference!",
      date: "30m",
      likes: 2,
    },
  ],
  p2: [],
  p3: [
    {
      id: "c4",
      author: {
        name: "Frank Miller",
        username: "frank",
        avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=frank",
      },
      text: "Thanks for sharing! These notes are really well organized.",
      date: "2h",
      likes: 1,
    },
    {
      id: "c5",
      author: {
        name: "Grace Liu",
        username: "grace",
        avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=grace",
      },
      text: "The examples in section 3.2 helped me understand DFS better. Great work!",
      date: "1h",
      likes: 4,
    },
  ],
};

// Mock user profile data
export const mockUserProfile = {
  id: "u1",
  username: "alice",
  name: "Alice Johnson",
  userImage: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
  bio: "Computer Science student passionate about algorithms and data structures. Love sharing knowledge and learning from the community!",
  education: "Computer Science, MIT",
  joinDate: "2023-09-15",
  stats: {
    posts: 12,
    quizzes: 5,
    libraryItems: 8
  }
};

// Mock user posts data
export const mockUserPosts = [
  {
    id: "up1",
    type: "post",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Just finished implementing a new sorting algorithm! The merge sort visualization really helped me understand the divide and conquer approach.",
    board: "algorithms-101",
    comments: 5,
    likes: 15,
    shares: 2,
    date: "2h",
  },
  {
    id: "up2",
    type: "post",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Working on dynamic programming problems. The key insight is recognizing overlapping subproblems!",
    board: "algorithms-101",
    comments: 3,
    likes: 8,
    shares: 1,
    date: "1d",
  },
  {
    id: "up3",
    type: "post",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Graph theory is fascinating! Just learned about Dijkstra's algorithm and its applications.",
    board: "discrete-math",
    comments: 7,
    likes: 12,
    shares: 3,
    date: "3d",
  },
];

// Mock user quizzes data
export const mockUserQuizzes = [
  {
    id: "uq1",
    type: "quiz",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Sorting Algorithms Quiz",
    description: "Test your knowledge of sorting algorithms with 15 questions",
    board: "algorithms-101",
    questions: 15,
    category: "Algorithms",
    comments: 2,
    likes: 8,
    shares: 1,
    date: "1w",
  },
  {
    id: "uq2",
    type: "quiz",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Dynamic Programming Basics",
    description: "10 MCQs covering DP fundamentals and patterns",
    board: "algorithms-101",
    questions: 10,
    category: "Algorithms",
    comments: 1,
    likes: 5,
    shares: 0,
    date: "2w",
  },
  {
    id: "uq3",
    type: "quiz",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Graph Theory Fundamentals",
    description: "Understanding graphs, trees, and traversal algorithms",
    board: "discrete-math",
    questions: 12,
    category: "Discrete Math",
    comments: 4,
    likes: 10,
    shares: 2,
    date: "3w",
  },
];

// Mock user library data
export const mockUserLibrary = [
  {
    id: "ul1",
    type: "library",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Algorithm Cheat Sheet",
    description: "Quick reference for common algorithms and their complexities",
    file: { name: "algorithm-cheatsheet.pdf", type: "PDF", size: "2.1MB" },
    board: "algorithms-101",
    comments: 3,
    likes: 12,
    shares: 4,
    date: "5d",
  },
  {
    id: "ul2",
    type: "library",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Data Structures Notes",
    description: "Comprehensive notes on arrays, linked lists, stacks, and queues",
    file: { name: "data-structures-notes.pdf", type: "PDF", size: "3.8MB" },
    board: "algorithms-101",
    comments: 1,
    likes: 7,
    shares: 2,
    date: "1w",
  },
  {
    id: "ul3",
    type: "library",
    author: {
      name: "Alice Johnson",
      username: "alice",
      avatar: "https://api.dicebear.com/8.x/identicon/svg?seed=alice",
    },
    text: "Graph Algorithms Examples",
    description: "Python implementations of BFS, DFS, and shortest path algorithms",
    file: { name: "graph-algorithms.py", type: "Python", size: "1.2MB" },
    board: "discrete-math",
    comments: 2,
    likes: 9,
    shares: 3,
    date: "2w",
  },
];

// Default placeholders
export const DEFAULT_PLACEHOLDERS = {
  bio: "No bio available",
  education: "Education not specified",
  joinDate: "Unknown",
  noPosts: "No posts yet",
  noQuizzes: "No quizzes created yet",
  noLibrary: "No library items yet"
};