"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, DollarSign, TrendingUp, Users, ExternalLink } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import InteractiveWorldMap from "@/components/interactive-world-map"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useState } from "react"

const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
]

const salesData = [
  { name: "Residential", value: 45 },
  { name: "Commercial", value: 30 },
  { name: "Industrial", value: 15 },
  { name: "Land", value: 10 },
]

const recentTransactions = [
  {
    id: "1",
    property: "Luxury Apartment Complex",
    amount: "$2,500",
    type: "Purchase",
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: "2",
    property: "Commercial Plaza",
    amount: "$1,800",
    type: "Sale",
    date: "2024-01-14",
    status: "Pending",
  },
  {
    id: "3",
    property: "Beachfront Villa",
    amount: "$3,200",
    type: "Purchase",
    date: "2024-01-13",
    status: "Completed",
  },
]

const topProperties = [
  {
    id: "1",
    name: "Manhattan Penthouse",
    location: "New York, USA",
    value: "$2.5M",
    owned: "15%",
    return: "+12.5%",
  },
  {
    id: "2",
    name: "Tokyo Office Building",
    location: "Tokyo, Japan",
    value: "$1.8M",
    owned: "8%",
    return: "+8.3%",
  },
  {
    id: "3",
    name: "London Apartment",
    location: "London, UK",
    value: "$1.2M",
    owned: "22%",
    return: "+15.2%",
  },
]

export default function Dashboard() {
  const [showLocalCurrency, setShowLocalCurrency] = useState(false)

  const handlePropertyClick = (propertyId: string) => {
    window.location.href = `/dashboard/property/${propertyId}`
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your portfolio overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+3 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$573,000</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 new this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Analytics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Your earnings over time</CardDescription>
                </div>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive World Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Global Properties</CardTitle>
                  <CardDescription>Your properties around the world</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowLocalCurrency(!showLocalCurrency)}>
                  {showLocalCurrency ? "Show USD" : "Show Local Currency"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <InteractiveWorldMap showLocalCurrency={showLocalCurrency} onPropertyClick={handlePropertyClick} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Data */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Property type distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest property transactions</CardDescription>
                </div>
                <Link href="/dashboard/transactions">
                  <Button variant="outline" size="sm">
                    View More
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{transaction.property}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium text-sm">{transaction.amount}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={transaction.status === "Completed" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Owned Properties */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Owned Properties</CardTitle>
                  <CardDescription>Your highest value investments</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  See More
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topProperties.map((property) => (
                  <div key={property.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{property.name}</h4>
                      <p className="text-sm text-gray-600">{property.location}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">{property.value}</span>
                        <Badge variant="outline">{property.owned}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Return</span>
                        <span className="text-sm font-semibold text-green-600">{property.return}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
