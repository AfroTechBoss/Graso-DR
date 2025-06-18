"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, DollarSign, Search, Filter, Eye, Heart, Share } from "lucide-react"
import Image from "next/image"
import DashboardLayout from "@/components/dashboard-layout"
import { useState } from "react"
import InvestmentModal from "@/components/investment-modal"

const properties = [
  {
    id: "5",
    title: "Lagos Waterfront Towers",
    description:
      "Premium residential towers in Victoria Island with stunning lagoon views and modern amenities. Located in Lagos' financial district.",
    location: "Lagos, Nigeria",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    totalValue: 850000,
    minInvestment: 300,
    maxInvestment: 15000,
    progress: 34,
    expectedReturn: "18-22%",
    developer: "Lagos Property Development Ltd",
    contact: "invest@lagospropertydevelopment.ng",
    category: "Residential",
    localCurrency: "NGN",
    exchangeRate: 1650, // 1 USD = 1650 NGN
  },
  {
    id: "6",
    title: "Abuja Commercial Hub",
    description:
      "Modern office complex in the Central Business District of Abuja with government and corporate tenants.",
    location: "Abuja, Nigeria",
    images: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    totalValue: 1200000,
    minInvestment: 500,
    maxInvestment: 20000,
    progress: 56,
    expectedReturn: "15-18%",
    developer: "Capital City Developments",
    contact: "hello@capitalcitydev.com.ng",
    category: "Commercial",
    localCurrency: "NGN",
    exchangeRate: 1650,
  },
  {
    id: "7",
    title: "Port Harcourt Industrial Park",
    description:
      "Strategic industrial development in Port Harcourt with oil & gas industry tenants and logistics facilities.",
    location: "Port Harcourt, Nigeria",
    images: [
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    totalValue: 950000,
    minInvestment: 400,
    maxInvestment: 18000,
    progress: 67,
    expectedReturn: "20-25%",
    developer: "Niger Delta Properties",
    contact: "info@nigerdeltaproperties.ng",
    category: "Industrial",
    localCurrency: "NGN",
    exchangeRate: 1650,
  },
  {
    id: "8",
    title: "Kano Agricultural Estate",
    description:
      "Large-scale agricultural development with modern farming facilities and processing plants in Northern Nigeria.",
    location: "Kano, Nigeria",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    totalValue: 650000,
    minInvestment: 250,
    maxInvestment: 12000,
    progress: 89,
    expectedReturn: "16-20%",
    developer: "Northern Agriculture Holdings",
    contact: "contact@northernagri.ng",
    category: "Agricultural",
    localCurrency: "NGN",
    exchangeRate: 1650,
  },
  {
    id: "1",
    title: "Luxury Manhattan Penthouse",
    description:
      "Premium penthouse with stunning city views in the heart of Manhattan. Features modern amenities and prime location.",
    location: "New York, USA",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    totalValue: 2500000,
    minInvestment: 1000,
    maxInvestment: 50000,
    progress: 65,
    expectedReturn: "12-15%",
    developer: "Premium Developments LLC",
    contact: "contact@premiumdev.com",
    category: "Residential",
    localCurrency: "USD",
    exchangeRate: 1,
  },
  {
    id: "2",
    title: "Tokyo Commercial Complex",
    description: "Modern office building in Tokyo business district with high-end tenants and stable rental income.",
    location: "Tokyo, Japan",
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    totalValue: 1800000,
    minInvestment: 500,
    maxInvestment: 25000,
    progress: 42,
    expectedReturn: "8-12%",
    developer: "Asia Properties Group",
    contact: "info@asiaproperties.com",
    category: "Commercial",
    localCurrency: "JPY",
    exchangeRate: 150,
  },
  {
    id: "3",
    title: "London Residential Development",
    description:
      "New residential development in prime London location with modern apartments and excellent transport links.",
    location: "London, UK",
    images: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    totalValue: 1200000,
    minInvestment: 750,
    maxInvestment: 30000,
    progress: 78,
    expectedReturn: "10-14%",
    developer: "UK Development Partners",
    contact: "hello@ukdevpartners.co.uk",
    category: "Residential",
    localCurrency: "GBP",
    exchangeRate: 0.79,
  },
  {
    id: "4",
    title: "Dubai Marina Tower",
    description: "Luxury tower in Dubai Marina with waterfront views and world-class amenities.",
    location: "Dubai, UAE",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    totalValue: 3200000,
    minInvestment: 2000,
    maxInvestment: 75000,
    progress: 23,
    expectedReturn: "15-20%",
    developer: "Emirates Real Estate",
    contact: "invest@emiratesre.ae",
    category: "Luxury",
    localCurrency: "AED",
    exchangeRate: 3.67,
  },
]

export default function ExplorePage() {
  const [showLocalCurrency, setShowLocalCurrency] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showInvestModal, setShowInvestModal] = useState(false)

  const formatCurrency = (amount, currency, exchangeRate) => {
    if (showLocalCurrency && currency !== "USD") {
      const localAmount = amount * exchangeRate
      return `${currency} ${localAmount.toLocaleString()}`
    }
    return `$${amount.toLocaleString()}`
  }

  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: "$",
      NGN: "₦",
      GBP: "£",
      JPY: "¥",
      AED: "د.إ",
    }
    return symbols[currency] || "$"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Properties</h1>
          <p className="text-gray-600">Discover and invest in premium real estate opportunities worldwide</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search properties..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="agricultural">Agricultural</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="uae">UAE</SelectItem>
              <SelectItem value="nigeria">Nigeria</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing {properties.length} properties</p>
          <Button variant="outline" size="sm" onClick={() => setShowLocalCurrency(!showLocalCurrency)}>
            {showLocalCurrency ? "Show USD" : "Show Local Currency"}
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => (window.location.href = `/dashboard/property/${property.id}`)}
            >
              <div className="relative">
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600">{property.category}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View on Map
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{property.description}</p>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Funding Progress</span>
                    <span>{property.progress}% Complete</span>
                  </div>
                  <Progress value={property.progress} className="h-2" />
                </div>

                {/* Investment Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total Value</p>
                    <p className="font-semibold">
                      {formatCurrency(property.totalValue, property.localCurrency, property.exchangeRate)}
                    </p>
                    {showLocalCurrency && property.localCurrency !== "USD" && (
                      <p className="text-xs text-gray-400">${property.totalValue.toLocaleString()} USD</p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500">Expected Return</p>
                    <p className="font-semibold text-green-600">{property.expectedReturn}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Min Investment</p>
                    <p className="font-semibold">
                      {formatCurrency(property.minInvestment, property.localCurrency, property.exchangeRate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Max Investment</p>
                    <p className="font-semibold">
                      {formatCurrency(property.maxInvestment, property.localCurrency, property.exchangeRate)}
                    </p>
                  </div>
                </div>

                {/* Developer Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{property.developer}</p>
                      <p className="text-xs text-gray-500">{property.contact}</p>
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedProperty(property)
                        setShowInvestModal(true)
                      }}
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      Invest Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Properties
          </Button>
        </div>
        {showInvestModal && (
          <InvestmentModal
            isOpen={showInvestModal}
            onClose={() => {
              setShowInvestModal(false)
              setSelectedProperty(null)
            }}
            property={selectedProperty}
          />
        )}
      </div>
    </DashboardLayout>
  )
}
