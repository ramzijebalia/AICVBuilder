'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Plum Inc",
    avatar: "👩‍💻",
    quote: "AICVBuilder helped me create a standout resume that got me interviews at top tech companies. The AI suggestions were incredibly helpful!",
    color: "green"
  },
  {
    name: "Michael Chen",
    role: "Chen Cosmetic",
    company: "Chen Cosmetic",
    avatar: "👨‍💼",
    quote: "The professional templates and AI optimization helped me land my dream job. Worth every penny!",
    color: "blue"
  },
  {
    name: "Emily Rodriguez",
    role: "Product Designer",
    company: "Apy Inc",
    avatar: "👩‍🎨",
    quote: "I was skeptical at first, but the AI suggestions were spot-on. Got multiple job offers within weeks!",
    color: "purple"
  },
  {
    name: "David Kim",
    role: "Data Scientist",
    company: "Stride Inc",
    avatar: "👨‍🔬",
    quote: "The AI-powered content suggestions helped me highlight my achievements in a way I never thought possible.",
    color: "orange"
  },
  {
    name: "Sophia Patel",
    role: "UX Researcher",
    company: "Metakit",
    avatar: "👩‍🔍",
    quote: "The templates are beautiful and the AI suggestions are incredibly smart. Landed my dream job at Meta!",
    color: "pink"
  }
]

export default function TestimonialsCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Switch every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-${testimonial.color}-100 rounded-full flex items-center justify-center text-3xl`}>
                      {testimonial.avatar}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-xl">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <p className="text-gray-500 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentTestimonial === index 
                ? 'bg-green-600 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 