import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Globe, Shield, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Graso</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/dashboard/explore" className="text-gray-700 hover:text-blue-600 font-medium">
                Explore
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Portfolio
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Whitepaper
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                About Us
              </Link>
            </div>

            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Democratize Real Estate Investment with <span className="text-blue-600">Blockchain</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Own fractions of premium properties, earn rental income, and benefit from appreciation. Graso makes
                  real estate investment accessible to everyone through tokenization.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/explore">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                    Explore Properties
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Get Listed
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">$2.5M+</div>
                  <div className="text-gray-600">Total Value Locked</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">150+</div>
                  <div className="text-gray-600">Properties Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">5,000+</div>
                  <div className="text-gray-600">Active Investors</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Real Estate Platform"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Why Choose Graso?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of real estate investment with our blockchain-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Fractional Ownership</h3>
              <p className="text-gray-600">Own portions of premium properties with minimal capital investment</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Blockchain Security</h3>
              <p className="text-gray-600">Transparent, secure, and immutable transactions powered by blockchain</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Passive Income</h3>
              <p className="text-gray-600">Earn rental income and benefit from property appreciation</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Global Access</h3>
              <p className="text-gray-600">Invest in properties worldwide from anywhere, anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Ready to Start Your Real Estate Journey?</h2>
            <p className="text-xl text-blue-100">
              Join thousands of investors who are already building wealth through fractional real estate ownership
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Graso</span>
              </div>
              <p className="text-gray-400">Democratizing real estate investment through blockchain technology</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Platform</h3>
              <div className="space-y-2">
                <Link href="/dashboard/explore" className="block text-gray-400 hover:text-white">
                  Explore
                </Link>
                <Link href="/dashboard" className="block text-gray-400 hover:text-white">
                  Portfolio
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Whitepaper
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white">
                  About Us
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Careers
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Contact
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Risk Disclosure
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Graso. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
