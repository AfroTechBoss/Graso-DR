"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, TrendingUp, Eye } from "lucide-react"

interface Property {
  id: string
  title: string
  location: string
  country: string
  totalValue: number
  expectedReturn: string
  progress: number
  category: string
  coordinates: { x: number; y: number }
  localCurrency: string
  exchangeRate: number
}

const properties: Property[] = [
  {
    id: "5",
    title: "Lagos Waterfront Towers",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    totalValue: 850000,
    expectedReturn: "18-22%",
    progress: 34,
    category: "Residential",
    coordinates: { x: 52, y: 48 }, // Approximate position for Nigeria
    localCurrency: "NGN",
    exchangeRate: 1650,
  },
  {
    id: "6",
    title: "Abuja Commercial Hub",
    location: "Abuja, Nigeria",
    country: "Nigeria",
    totalValue: 1200000,
    expectedReturn: "15-18%",
    progress: 56,
    category: "Commercial",
    coordinates: { x: 52.5, y: 47 }, // Slightly offset from Lagos
    localCurrency: "NGN",
    exchangeRate: 1650,
  },
  {
    id: "7",
    title: "Port Harcourt Industrial Park",
    location: "Port Harcourt, Nigeria",
    country: "Nigeria",
    totalValue: 950000,
    expectedReturn: "20-25%",
    progress: 67,
    category: "Industrial",
    coordinates: { x: 53, y: 49 }, // Slightly offset
    localCurrency: "NGN",
    exchangeRate: 1650,
  },
  {
    id: "1",
    title: "Luxury Manhattan Penthouse",
    location: "New York, USA",
    country: "USA",
    totalValue: 2500000,
    expectedReturn: "12-15%",
    progress: 65,
    category: "Residential",
    coordinates: { x: 25, y: 35 }, // Approximate position for New York
    localCurrency: "USD",
    exchangeRate: 1,
  },
  {
    id: "2",
    title: "Tokyo Commercial Complex",
    location: "Tokyo, Japan",
    country: "Japan",
    totalValue: 1800000,
    expectedReturn: "8-12%",
    progress: 42,
    category: "Commercial",
    coordinates: { x: 85, y: 32 }, // Approximate position for Tokyo
    localCurrency: "JPY",
    exchangeRate: 150,
  },
  {
    id: "3",
    title: "London Residential Development",
    location: "London, UK",
    country: "UK",
    totalValue: 1200000,
    expectedReturn: "10-14%",
    progress: 78,
    category: "Residential",
    coordinates: { x: 48, y: 28 }, // Approximate position for London
    localCurrency: "GBP",
    exchangeRate: 0.79,
  },
  {
    id: "4",
    title: "Dubai Marina Tower",
    location: "Dubai, UAE",
    country: "UAE",
    totalValue: 3200000,
    expectedReturn: "15-20%",
    progress: 23,
    category: "Luxury",
    coordinates: { x: 58, y: 42 }, // Approximate position for Dubai
    localCurrency: "AED",
    exchangeRate: 3.67,
  },
]

interface InteractiveWorldMapProps {
  showLocalCurrency?: boolean
  onPropertyClick?: (propertyId: string) => void
}

export default function InteractiveWorldMap({ showLocalCurrency = false, onPropertyClick }: InteractiveWorldMapProps) {
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null)
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null)

  const formatCurrency = (amount: number, currency: string, exchangeRate: number) => {
    if (showLocalCurrency && currency !== "USD") {
      const localAmount = amount * exchangeRate
      return `${currency} ${localAmount.toLocaleString()}`
    }
    return `$${amount.toLocaleString()}`
  }

  const getContinentProperties = (continent: string) => {
    const continentMap = {
      "North America": ["USA"],
      Europe: ["UK"],
      Asia: ["Japan", "UAE"],
      Africa: ["Nigeria"],
    }
    return properties.filter((p) => continentMap[continent]?.includes(p.country))
  }

  const continents = [
    { name: "North America", x: 20, y: 30, properties: getContinentProperties("North America") },
    { name: "Europe", x: 50, y: 25, properties: getContinentProperties("Europe") },
    { name: "Asia", x: 75, y: 35, properties: getContinentProperties("Asia") },
    { name: "Africa", x: 52, y: 50, properties: getContinentProperties("Africa") },
  ]

  return (
    <div className="relative">
      {/* World Map SVG */}
      <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden">
        <svg
          viewBox="0 0 100 60"
          className="w-full h-64 md:h-80"
          style={{ background: "linear-gradient(to bottom, #dbeafe 0%, #bfdbfe 100%)" }}
        >
          {/* Simplified World Map Continents */}

          {/* North America */}
          <path
            d="M5,15 L30,15 L35,25 L30,35 L25,40 L15,38 L10,30 L5,25 Z"
            fill="#10b981"
            fillOpacity="0.3"
            stroke="#10b981"
            strokeWidth="0.5"
            className="cursor-pointer hover:fill-opacity-50 transition-all"
            onClick={() => setSelectedContinent(selectedContinent === "North America" ? null : "North America")}
          />

          {/* Europe */}
          <path
            d="M45,20 L55,18 L58,25 L55,30 L50,32 L45,28 Z"
            fill="#8b5cf6"
            fillOpacity="0.3"
            stroke="#8b5cf6"
            strokeWidth="0.5"
            className="cursor-pointer hover:fill-opacity-50 transition-all"
            onClick={() => setSelectedContinent(selectedContinent === "Europe" ? null : "Europe")}
          />

          {/* Asia */}
          <path
            d="M60,18 L90,20 L92,35 L85,40 L75,38 L65,35 L60,25 Z"
            fill="#f59e0b"
            fillOpacity="0.3"
            stroke="#f59e0b"
            strokeWidth="0.5"
            className="cursor-pointer hover:fill-opacity-50 transition-all"
            onClick={() => setSelectedContinent(selectedContinent === "Asia" ? null : "Asia")}
          />

          {/* Africa */}
          <path
            d="M45,35 L60,33 L62,50 L55,55 L45,52 L42,45 Z"
            fill="#ef4444"
            fillOpacity="0.3"
            stroke="#ef4444"
            strokeWidth="0.5"
            className="cursor-pointer hover:fill-opacity-50 transition-all"
            onClick={() => setSelectedContinent(selectedContinent === "Africa" ? null : "Africa")}
          />

          {/* South America */}
          <path
            d="M25,42 L35,40 L38,55 L30,58 L25,55 L22,48 Z"
            fill="#06b6d4"
            fillOpacity="0.3"
            stroke="#06b6d4"
            strokeWidth="0.5"
            className="cursor-pointer hover:fill-opacity-50 transition-all"
          />

          {/* Australia */}
          <path
            d="M75,45 L85,43 L88,50 L82,52 L75,50 Z"
            fill="#84cc16"
            fillOpacity="0.3"
            stroke="#84cc16"
            strokeWidth="0.5"
            className="cursor-pointer hover:fill-opacity-50 transition-all"
          />

          {/* Property Pins */}
          {properties.map((property) => (
            <g key={property.id}>
              {/* Pin Shadow */}
              <circle
                cx={property.coordinates.x + 0.2}
                cy={property.coordinates.y + 0.2}
                r="1"
                fill="rgba(0,0,0,0.2)"
              />

              {/* Pin */}
              <circle
                cx={property.coordinates.x}
                cy={property.coordinates.y}
                r="1.2"
                fill="#2563eb"
                stroke="white"
                strokeWidth="0.3"
                className="cursor-pointer hover:r-2 transition-all animate-pulse"
                onMouseEnter={() => setHoveredProperty(property)}
                onMouseLeave={() => setHoveredProperty(null)}
                onClick={() => onPropertyClick?.(property.id)}
              />

              {/* Pin Center */}
              <circle
                cx={property.coordinates.x}
                cy={property.coordinates.y}
                r="0.4"
                fill="white"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredProperty(property)}
                onMouseLeave={() => setHoveredProperty(null)}
                onClick={() => onPropertyClick?.(property.id)}
              />
            </g>
          ))}

          {/* Continent Labels */}
          {continents.map((continent) => (
            <text
              key={continent.name}
              x={continent.x}
              y={continent.y - 3}
              textAnchor="middle"
              className="text-xs font-semibold fill-gray-700"
              style={{ fontSize: "2px" }}
            >
              {continent.name}
            </text>
          ))}
        </svg>

        {/* Property Hover Tooltip */}
        {hoveredProperty && (
          <div className="absolute top-4 left-4 z-10">
            <Card className="w-80 shadow-lg border-2 border-blue-200">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold">{hoveredProperty.title}</CardTitle>
                    <p className="text-xs text-gray-600 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {hoveredProperty.location}
                    </p>
                  </div>
                  <Badge className="text-xs">{hoveredProperty.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500">Total Value</p>
                    <p className="font-semibold">
                      {formatCurrency(
                        hoveredProperty.totalValue,
                        hoveredProperty.localCurrency,
                        hoveredProperty.exchangeRate,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expected Return</p>
                    <p className="font-semibold text-green-600">{hoveredProperty.expectedReturn}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Funding Progress</span>
                    <span>{hoveredProperty.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${hoveredProperty.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2 mt-3">
                  <Button
                    size="sm"
                    className="flex-1 text-xs h-7"
                    onClick={() => onPropertyClick?.(hoveredProperty.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs h-7">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Invest
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Continent Properties Panel */}
      {selectedContinent && (
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Properties in {selectedContinent}</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedContinent(null)}>
                  Close
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getContinentProperties(selectedContinent).map((property) => (
                  <div
                    key={property.id}
                    className="p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onPropertyClick?.(property.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm">{property.title}</h4>
                        <p className="text-xs text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {property.category}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div>
                        <p className="text-gray-500">Value</p>
                        <p className="font-semibold">
                          {formatCurrency(property.totalValue, property.localCurrency, property.exchangeRate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Return</p>
                        <p className="font-semibold text-green-600">{property.expectedReturn}</p>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{property.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${property.progress}%` }}></div>
                      </div>
                    </div>

                    <Button size="sm" className="w-full text-xs">
                      View Property
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Legend */}
      <div className="mt-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-xs text-gray-600">Property Location</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 bg-opacity-30 border border-green-500"></div>
                  <span className="text-xs text-gray-600">North America</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 bg-opacity-30 border border-purple-500"></div>
                  <span className="text-xs text-gray-600">Europe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 bg-opacity-30 border border-yellow-500"></div>
                  <span className="text-xs text-gray-600">Asia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 bg-opacity-30 border border-red-500"></div>
                  <span className="text-xs text-gray-600">Africa</span>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <TrendingUp className="h-4 w-4 inline mr-1" />
                {properties.length} Properties • Total Value: $
                {properties.reduce((sum, p) => sum + p.totalValue, 0).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
