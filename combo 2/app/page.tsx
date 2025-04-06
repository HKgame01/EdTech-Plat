import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, BarChart, Video, Calendar, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tailed Education Platform
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            A comprehensive learning management system for students, parents, and educators.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/login/student">
              <Button size="lg" className="font-medium">
                Student Login
              </Button>
            </Link>
            <Link href="/login/parent">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Parent Login
              </Button>
            </Link>
            <Link href="/login/admin">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Platform Features</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
              Our comprehensive education platform provides tools for students, parents, and educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Interactive Classes</CardTitle>
                <CardDescription className="text-slate-400">
                  Engage with interactive learning materials and live classes.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-300">
                Access a wide range of subjects with interactive content designed to enhance learning and retention.
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Video className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Video Classes</CardTitle>
                <CardDescription className="text-slate-400">
                  Join live video classes with teachers and classmates.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-300">
                Participate in real-time video classes with screen sharing, chat, and interactive features.
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <FileText className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Tests & Assessments</CardTitle>
                <CardDescription className="text-slate-400">
                  Take tests and get immediate feedback on your performance.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-300">
                Complete assessments online and receive detailed feedback to improve your understanding.
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Calendar className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Schedule Management</CardTitle>
                <CardDescription className="text-slate-400">
                  Keep track of classes, assignments, and important dates.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-300">
                Never miss a class or assignment with our comprehensive scheduling system.
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <BarChart className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Performance Analytics</CardTitle>
                <CardDescription className="text-slate-400">
                  Track progress and identify areas for improvement.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-300">
                Detailed analytics help students and parents understand performance trends over time.
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Users className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-white">Parent Involvement</CardTitle>
                <CardDescription className="text-slate-400">
                  Keep parents informed about their child's education.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-300">
                Parents can monitor progress, communicate with teachers, and support their child's learning journey.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto">
            Join our platform today and experience a new way of learning.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="font-medium">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-400">© 2023 Tailed Education Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

