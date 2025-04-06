import bcrypt from "bcryptjs";

export type UserRole = "student" | "parent" | "admin"

// User Interface
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "student" | "parent" | "admin" | "teacher";
  parentId?: string;
  studentIds?: string[];
  classIds?: string[];
}

// Pre-hashed passwords for demo use
const hashedStudentPassword = "$2a$04$NMnxtKfkgZFLDcReafhcuuz5us5V8pcq17xdY/nGIWpcF3ontNukW"; // student123
const hashedParentPassword = hashedStudentPassword; // parent123
const hashedAdminPassword = hashedStudentPassword; // admin123

// Mock database
const users: User[] = [
  {
    id: "student-1",
    name: "Arjun Singh",
    email: "arjun.s@example.com",
    password: hashedStudentPassword,
    role: "student",
    parentId: "parent-1",
    classIds: ["class-1", "class-2", "class-3"],
  },
  {
    id: "student-2",
    name: "Priya Patel",
    email: "priya.p@example.com",
    password: hashedStudentPassword,
    role: "student",
    parentId: "parent-2",
    classIds: ["class-1", "class-3"],
  },
  {
    id: "parent-1",
    name: "Rajesh Singh",
    email: "rajesh.s@example.com",
    password: hashedParentPassword,
    role: "parent",
    studentIds: ["student-1"],
  },
  {
    id: "parent-2",
    name: "Meena Patel",
    email: "meena.p@example.com",
    password: hashedParentPassword,
    role: "parent",
    studentIds: ["student-2"],
  },
  {
    id: "admin-1",
    name: "Ramesh Kumar",
    email: "ramesh.k@example.com",
    password: hashedAdminPassword,
    role: "admin",
  },
  {
    id: "teacher-1",
    name: "Sunita Sharma",
    email: "sunita.s@example.com",
    password: hashedAdminPassword,
    role: "teacher",
    classIds: ["class-1", "class-2"],
  },
];

// Utility to remove password from user object
const stripPassword = ({ password, ...rest }: User) => rest;

// Authenticate user
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // In a real app, this would verify credentials against a database
  // For demo purposes, we'll just check if the email exists and return the user
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (user) {
    // In a real app, we would verify the password here
    // For demo purposes, any password will work
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    }
  }

  return null
}
// Get user by ID
export function getUserById(id: string) {
  const user = users.find((u) => u.id === id);
  return user ? stripPassword(user) : null;
}

// Get students linked to a parent
export function getStudentsByParentId(parentId: string) {
  return users
    .filter((u) => u.role === "student" && u.parentId === parentId)
    .map(stripPassword);
}

// Register a new user
export async function registerUser(userData: Omit<User, "id" | "password"> & { password: string }) {
  const exists = users.some((u) => u.email === userData.email && u.role === userData.role);
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser: User = {
    id: `${userData.role}-${Date.now()}`, // timestamp-based unique ID
    ...userData,
    password: hashedPassword,
  };

  users.push(newUser);
  return stripPassword(newUser);
}

// Get all students (for admin view)
export function getAllStudents() {
  return users.filter((u) => u.role === "student").map(stripPassword);
}

// Mock class data
export function getAllClasses() {
  return [
    { id: "class-1", name: "Mathematics", teacher: "Sunita Sharma", students: 25 },
    { id: "class-2", name: "Science", teacher: "Sunita Sharma", students: 30 },
    { id: "class-3", name: "English", teacher: "Anand Verma", students: 28 },
    { id: "class-4", name: "History", teacher: "Deepak Gupta", students: 22 },
  ];
}

// Get classes by student ID
export function getClassesByStudentId(studentId: string) {
  const student = users.find((u) => u.id === studentId);
  if (!student?.classIds) return [];

  return getAllClasses().filter((c) => student.classIds?.includes(c.id));
}

// Get classes by teacher ID
export function getClassesByTeacherId(teacherId: string) {
  const teacher = users.find((u) => u.id === teacherId);
  if (!teacher?.classIds) return [];

  return getAllClasses().filter((c) => teacher.classIds?.includes(c.id));
}

// Get demo credentials by role
export function getDemoCredentials(role: string) {
  switch (role) {
    case "student":
      return { email: "arjun.s@example.com", password: "password123" };
    case "parent":
      return { email: "rajesh.s@example.com", password: "password123" };
    case "admin":
      return { email: "ramesh.k@example.com", password: "password123" };
    case "teacher":
      return { email: "sunita.s@example.com", password: "password123" };
    default:
      return { email: "", password: "" };
  }
}
// Get children for a parent
export function getChildrenForParent(parentId: string) {
  const parent = users.find((u) => u.id === parentId && u.role === "parent")

  if (parent && parent.studentIds) {
    return users.filter((u) => (parent.studentIds ?? []).includes(u.id))
  }

  return []
}
