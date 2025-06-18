"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Wallet, DollarSign, AlertCircle, CheckCircle } from "lucide-react"

interface InvestmentModalProps {
  isOpen: boolean
  onClose: () => void
  property: any
}

export default function InvestmentModal({ isOpen, onClose, property }: InvestmentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("fiat")
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [step, setStep] = useState(1) // 1: Amount, 2: Payment, 3: Confirmation

  if (!property) return null

  const formatCurrency = (amount: number, currency: string, exchangeRate: number) => {
    if (currency !== "USD") {
      const localAmount = amount * exchangeRate
      return `${currency} ${localAmount.toLocaleString()}`
    }
    return `$${amount.toLocaleString()}`
  }

  const convertToLocalCurrency = (usdAmount: number) => {
    if (property.localCurrency !== "USD") {
      return usdAmount * property.exchangeRate
    }
    return usdAmount
  }

  const handleInvest = () => {
    // Here you would integrate with payment processing
    setStep(3)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invest in {property.title}</DialogTitle>
          <DialogDescription>Choose your investment amount and payment method</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            {/* Investment Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Min: $${property.minInvestment}`}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                min={property.minInvestment}
                max={property.maxInvestment}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Min: ${property.minInvestment.toLocaleString()}</span>
                <span>Max: ${property.maxInvestment.toLocaleString()}</span>
              </div>
            </div>

            {/* Local Currency Conversion */}
            {investmentAmount && property.localCurrency !== "USD" && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Currency Conversion</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  Your ${investmentAmount} USD will be converted to{" "}
                  <span className="font-semibold">
                    {formatCurrency(
                      Number.parseFloat(investmentAmount) || 0,
                      property.localCurrency,
                      property.exchangeRate,
                    )}
                  </span>{" "}
                  at the time of purchase to support the local economy.
                </p>
              </div>
            )}

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInvestmentAmount(property.minInvestment.toString())}
              >
                ${property.minInvestment}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setInvestmentAmount(Math.floor((property.minInvestment + property.maxInvestment) / 2).toString())
                }
              >
                ${Math.floor((property.minInvestment + property.maxInvestment) / 2).toLocaleString()}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInvestmentAmount(property.maxInvestment.toString())}
              >
                ${property.maxInvestment.toLocaleString()}
              </Button>
            </div>

            <Button
              className="w-full"
              onClick={() => setStep(2)}
              disabled={
                !investmentAmount ||
                Number.parseFloat(investmentAmount) < property.minInvestment ||
                Number.parseFloat(investmentAmount) > property.maxInvestment
              }
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Investment Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Investment Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Amount (USD):</span>
                  <span className="font-medium">${Number.parseFloat(investmentAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Amount ({property.localCurrency}):</span>
                  <span className="font-medium">
                    {formatCurrency(Number.parseFloat(investmentAmount), property.localCurrency, property.exchangeRate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (2%):</span>
                  <span className="font-medium">${(Number.parseFloat(investmentAmount) * 0.02).toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${(Number.parseFloat(investmentAmount) * 1.02).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <Label>Choose Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="fiat" id="fiat" />
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <Label htmlFor="fiat" className="font-medium">
                      Fiat Payment
                    </Label>
                    <p className="text-sm text-gray-500">Pay with credit card, bank transfer, or PayPal</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Wallet className="h-5 w-5 text-purple-600" />
                  <div className="flex-1">
                    <Label htmlFor="crypto" className="font-medium">
                      Cryptocurrency
                    </Label>
                    <p className="text-sm text-gray-500">Pay with SUI, USDC, or other supported tokens</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Currency Conversion Notice */}
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-900">Automatic Currency Conversion</p>
                  <p className="text-yellow-700">
                    Your payment will be automatically converted to {property.localCurrency} to support the local
                    economy in {property.location.split(",")[1]?.trim()}. Current exchange rate: 1 USD ={" "}
                    {property.exchangeRate} {property.localCurrency}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleInvest} className="flex-1">
                <DollarSign className="h-4 w-4 mr-2" />
                Invest Now
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Investment Successful!</h3>
              <p className="text-gray-600 mt-2">
                Your investment of ${Number.parseFloat(investmentAmount).toLocaleString()} in {property.title} has been
                processed.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-left">
              <h4 className="font-semibold text-green-900 mb-2">Transaction Details</h4>
              <div className="space-y-1 text-sm text-green-700">
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-mono">TXN-{Date.now()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Invested:</span>
                  <span>${Number.parseFloat(investmentAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Currency:</span>
                  <span>
                    {formatCurrency(Number.parseFloat(investmentAmount), property.localCurrency, property.exchangeRate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="capitalize">{paymentMethod}</span>
                </div>
              </div>
            </div>
            <Button onClick={onClose} className="w-full">
              View My Investments
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
