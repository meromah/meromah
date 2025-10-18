// Mock data for explore items
export const exploreData = {
  posts: [
    { id: 'p1', type: 'post', author: { name: 'Alice', username: 'alice', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=alice' }, text: 'Greedy vs DP?', board: 'Algorithms 101', comments: 1, likes: 4, shares: 0, date: '1d' },
  ],
  boards: [
    { id: 'p2', type: 'post', author: { name: 'Board Bot', username: 'boards', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=board' }, text: 'Welcome to Algorithms 101 board', board: 'Algorithms 101', comments: 0, likes: 1, shares: 0, date: '2d' },
  ],
  libraries: [
    { id: 'p3', type: 'library', author: { name: 'Kate', username: 'kate', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=kate' }, text: 'Sorting Cheatsheet', description: 'Quick reference for sorting', file: { name: 'sorting.pdf' }, board: 'Algorithms 101', comments: 0, likes: 2, shares: 0, date: '2d' },
  ],
  quizzes: [
    { id: 'p4', type: 'quiz', author: { name: 'Quiz Bot', username: 'quiz', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=quiz' }, text: 'Greedy vs DP MCQ', description: '5 questions', board: 'Algorithms 101', comments: 0, likes: 3, shares: 0, date: '3d' },
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
    board: "Algorithms 101",
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
    board: "Algorithms 101",
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
    board: "Discrete Math",
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