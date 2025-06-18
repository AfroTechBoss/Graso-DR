"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  DollarSign,
  ArrowLeft,
  Heart,
  Share,
  Calendar,
  Users,
  TrendingUp,
  Building,
  Phone,
  Mail,
  Globe,
  FileText,
  Shield,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"

// Mock property data - in real app, this would come from API
const getPropertyById = (id: string) => {
  const properties = {
    "5": {
      id: "5",
      title: "Lagos Waterfront Towers",
      description:
        "Premium residential towers in Victoria Island with stunning lagoon views and modern amenities. Located in Lagos' financial district.",
      location: "Lagos, Nigeria",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      exchangeRate: 1650,
      details: {
        propertyType: "Residential Towers",
        units: 120,
        floors: 25,
        yearBuilt: "2024 (Under Construction)",
        totalArea: "15,000 sqm",
        amenities: ["Swimming Pool", "Gym", "24/7 Security", "Parking", "Generator", "Water Treatment"],
        location: {
          address: "Plot 1234, Ahmadu Bello Way, Victoria Island, Lagos",
          coordinates: "6.4281° N, 3.4219° E",
          nearbyLandmarks: ["Lagos Business School", "Eko Hotel", "National Theatre"],
        },
        financials: {
          targetFunding: 850000,
          currentFunding: 289000,
          investors: 156,
          dividendFrequency: "Quarterly",
          occupancyRate: "95%",
          rentalYield: "20%",
        },
        timeline: {
          projectStart: "January 2024",
          expectedCompletion: "December 2025",
          firstDividend: "March 2026",
        },
      },
    },
    // Add other properties here...
  }
  return properties[id]
}

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showLocalCurrency, setShowLocalCurrency] = useState(false)
  const [showInvestModal, setShowInvestModal] = useState(false)

  const property = getPropertyById(params.id)

  if (!property) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Property Not Found</h1>
          <p className="text-gray-600 mt-2">The property you're looking for doesn't exist.</p>
          <Link href="/dashboard/explore">
            <Button className="mt-4">Back to Explore</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const formatCurrency = (amount: number) => {
    if (showLocalCurrency && property.localCurrency !== "USD") {
      const localAmount = amount * property.exchangeRate
      return `${property.localCurrency} ${localAmount.toLocaleString()}`
    }
    return `$${amount.toLocaleString()}`
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/explore">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Explore
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowLocalCurrency(!showLocalCurrency)}>
              {showLocalCurrency ? "Show USD" : `Show ${property.localCurrency}`}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={property.images[selectedImage] || "/placeholder.svg"}
                    alt={property.title}
                    width={800}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600">{property.category}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-blue-600" : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${property.title} ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Property Description</h3>
                      <p className="text-gray-600">{property.description}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Building className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                        <p className="text-sm font-medium">{property.details.units} Units</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 mx-auto mb-1 text-green-600" />
                        <p className="text-sm font-medium">{property.details.floors} Floors</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                        <p className="text-sm font-medium">{property.details.yearBuilt}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Users className="h-6 w-6 mx-auto mb-1 text-orange-600" />
                        <p className="text-sm font-medium">{property.details.totalArea}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {property.details.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="financials" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900">Target Funding</h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(property.details.financials.targetFunding)}
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900">Current Funding</h4>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(property.details.financials.currentFunding)}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900">Total Investors</h4>
                        <p className="text-2xl font-bold text-purple-600">{property.details.financials.investors}</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-900">Rental Yield</h4>
                        <p className="text-2xl font-bold text-orange-600">{property.details.financials.rentalYield}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Project Timeline</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Project Start:</span>
                          <span className="font-medium">{property.details.timeline.projectStart}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Completion:</span>
                          <span className="font-medium">{property.details.timeline.expectedCompletion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>First Dividend:</span>
                          <span className="font-medium">{property.details.timeline.firstDividend}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="location" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Address</h4>
                      <p className="text-gray-600">{property.details.location.address}</p>
                      <p className="text-sm text-gray-500 mt-1">{property.details.location.coordinates}</p>
                    </div>

                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Interactive Map</p>
                        <p className="text-sm text-gray-500">Google Maps integration</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Nearby Landmarks</h4>
                      <ul className="space-y-1">
                        {property.details.location.nearbyLandmarks.map((landmark, index) => (
                          <li key={index} className="text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {landmark}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <p className="font-medium">Property Deed</p>
                            <p className="text-sm text-gray-500">Legal ownership document</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Document
                        </Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-8 w-8 text-green-600" />
                          <div>
                            <p className="font-medium">Valuation Report</p>
                            <p className="text-sm text-gray-500">Professional property assessment</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Document
                        </Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Building className="h-8 w-8 text-purple-600" />
                          <div>
                            <p className="font-medium">Building Permits</p>
                            <p className="text-sm text-gray-500">Construction approvals</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Document
                        </Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Star className="h-8 w-8 text-yellow-600" />
                          <div>
                            <p className="font-medium">Insurance Policy</p>
                            <p className="text-sm text-gray-500">Property insurance coverage</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Document
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Funding Progress</span>
                    <span>{property.progress}% Complete</span>
                  </div>
                  <Progress value={property.progress} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-semibold">{formatCurrency(property.totalValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Investment</span>
                    <span className="font-semibold">{formatCurrency(property.minInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Investment</span>
                    <span className="font-semibold">{formatCurrency(property.maxInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Return</span>
                    <span className="font-semibold text-green-600">{property.expectedReturn}</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setShowInvestModal(true)}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Invest Now
                </Button>
              </CardContent>
            </Card>

            {/* Developer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Developer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">{property.developer}</h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {property.contact}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      +234 (0) 123 456 7890
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="h-4 w-4 mr-2" />
                      www.lagospropertydevelopment.ng
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  <Badge variant="outline">5.0 ★</Badge>
                </div>

                <Button variant="outline" className="w-full">
                  Contact Developer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
