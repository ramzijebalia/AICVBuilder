import Image from "next/image"
import logo from "@/public/assets/logo.png"
import resumePreview from "@/public/assets/resume-preview.jpg"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, FileText, Star, Check, Zap, Crown, Sparkles, ArrowRight, MessageSquare, Award } from "lucide-react"
import TestimonialsCarousel from "@/components/TestimonialsCarousel"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 pt-20">
        {/* Hero Section */}
        <section id="hero" className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="AICVBuilder Logo"
                  width={140}
                  height={140}
                  className="drop-shadow-lg"
                />
              </div>

              <div className="space-y-6">
                <Badge variant="secondary" className="text-sm font-medium px-4 py-1.5">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Resume Builder
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                  Create a{" "}
                  <span className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-400 bg-clip-text text-transparent">
                    Perfect Resume
                  </span>{" "}
                  in Minutes
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  <span className="font-semibold text-gray-900">AICVBuilder</span> uses advanced AI to help you create
                  professional, ATS-friendly resumes that get you hired faster.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl">
                  <Link href="/resumes">
                    <Zap className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl">
                  <Link href="#pricing" className="flex items-center">
                    View Pricing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <Image
                src={resumePreview || "/placeholder.svg"}
                alt="Professional Resume Preview"
                width={600}
                height={800}
                className="relative shadow-2xl rounded-2xl lg:rotate-[2deg] hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="bg-white py-20 border-y">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Professionals Worldwide</h2>
              <p className="text-xl text-gray-600">Join thousands of job seekers who've landed their dream jobs</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-green-600" />
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-3">397</div>
                <div className="text-lg text-gray-600">Active Users</div>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-blue-600" />
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-3">906</div>
                <div className="text-lg text-gray-600">Resumes Created</div>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-3">4.85/5</div>
                <div className="text-lg text-gray-600">User Rating</div>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-orange-600" />
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-3">89%</div>
                <div className="text-lg text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <div className="text-center mb-20">
              <Badge variant="secondary" className="text-sm font-medium px-4 py-1.5 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Powerful Features
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AICVBuilder?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI-powered platform makes resume creation effortless and effective
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
                <CardHeader className="text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-10 h-10 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">AI-Powered Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-lg">
                    Our AI analyzes your experience and suggests optimized content that passes ATS systems.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Professional Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-lg">
                    Choose from dozens of professionally designed templates that make you stand out.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
                <CardHeader className="text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star className="w-10 h-10 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Instant Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-lg">
                    Download your resume in multiple formats (PDF, Word) and start applying immediately.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <div className="text-center mb-20">
              <Badge variant="secondary" className="text-sm font-medium px-4 py-1.5 mb-4">
                <MessageSquare className="w-4 h-4 mr-2" />
                Success Stories
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied users who've landed their dream jobs
              </p>
            </div>

            <TestimonialsCarousel />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
            <div className="text-center mb-20">
              <Badge variant="secondary" className="text-sm font-medium px-4 py-1.5 mb-4">
                <Crown className="w-4 h-4 mr-2" />
                Pricing Plans
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
              <p className="text-xl text-gray-600">Start free, upgrade when you need more features</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl flex flex-col">
                <CardHeader className="text-center p-8">
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <div className="text-5xl font-bold text-gray-900 mt-6">$0</div>
                  <CardDescription className="text-lg mt-2">Perfect to get started</CardDescription>
                </CardHeader>
                <CardContent className="p-8 flex-grow">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-lg">Up to 3 Resume</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-lg">Basic AI suggestions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-lg">PDF download</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-8 pt-0">
                  <Button asChild className="w-full py-6 text-lg rounded-xl" variant="outline">
                    <Link href="/resumes">Get Started Free</Link>
                  </Button>
                </div>
              </Card>

              {/* Premium Plan */}
              <Card className="border-2 border-green-500 relative hover:shadow-xl transition-shadow rounded-2xl flex flex-col">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-6 py-2 text-lg">Most Popular</Badge>
                </div>
                <CardHeader className="text-center p-8">
                  <CardTitle className="text-2xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                    Premium
                  </CardTitle>
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-gray-900 mt-6">$0</div>
                    <div className="text-sm text-gray-500">Limited Time Offer</div>
                    <div className="text-sm text-gray-500">Regular Price: $2.99/mo</div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 flex-grow">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-lg">Up to 6 Resumes</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-lg">Advanced AI optimization</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-lg">PDF download</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-8 pt-0">
                  <Button asChild className="w-full py-6 text-lg rounded-xl bg-green-600 hover:bg-green-700">
                    <Link href="/upgrade">Upgrade to Premium</Link>
                  </Button>
                </div>
              </Card>

              {/* Premium Plus Plan */}
              <Card className="border-2 border-purple-500 hover:shadow-lg transition-shadow rounded-2xl flex flex-col">
                <CardHeader className="text-center p-8">
                  <CardTitle className="text-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-500 mr-2" />
                    Premium Plus
                  </CardTitle>
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-gray-900 mt-6">$0</div>
                    <div className="text-sm text-gray-500">Limited Time Offer</div>
                    <div className="text-sm text-gray-500">Regular Price: $5.99/mo</div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 flex-grow">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-lg">Everything in Premium</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-lg">Unlimited Resumes</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-6 h-6 text-green-600 mr-3" />
                      <span className="text-lg">Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-8 pt-0">
                  <Button asChild className="w-full py-6 text-lg rounded-xl bg-purple-600 hover:bg-purple-700">
                    <Link href="/upgrade-plus">Get Premium Plus</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl text-center">
            <h2 className="text-5xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
            <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join over 50,000 professionals who've successfully created winning resumes with AICVBuilder
            </p>
            <Button asChild size="lg" variant="secondary" className="px-12 py-8 text-xl rounded-xl">
              <Link href="/resumes" className="flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                Start Building Now
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
