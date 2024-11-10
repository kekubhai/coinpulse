/* eslint-disable react/prop-types */
'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { LineChart, Line } from 'recharts'
import { RefreshCw, TrendingUp, TrendingDown, DollarSign, Github } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const cryptoConfigs = {
  BTC: { color: 'hsl(var(--chart-1))', name: 'Bitcoin' },
  ETH: { color: 'hsl(var(--chart-2))', name: 'Ethereum' },
  BNB: { color: 'hsl(var(--chart-3))', name: 'Binance Smart Chain' },
  SOL: { color: 'hsl(var(--chart-4))', name: 'Solana' },
  ADA: { color: 'hsl(var(--chart-5))', name: 'Cardano' },
  MATIC: { color: 'hsl(var(--chart-6))', name: 'Polygon' }
}

const fetchCryptoData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: `${i}:00`,
    BTC: 40000 + Math.random() * 2000,
    ETH: 2800 + Math.random() * 200,
    BNB: 300 + Math.random() * 20,
    SOL: 100 + Math.random() * 10,
    ADA: 1.2 + Math.random() * 0.2,
    MATIC: 1.5 + Math.random() * 0.3,
    volume: 100000 + Math.random() * 50000
  }))
}

const getNetworkStats = (symbol, lastPrice) => ({
  price: lastPrice || 0,
  change: (Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2),
  volume: `$${(Math.random() * 10).toFixed(1)}B`,
  transactions: `${(Math.random() * 1000).toFixed(0)}k`,
  gasPrice: `${(Math.random() * 100).toFixed(1)} Gwei`,
  marketCap: `$${(Math.random() * 100).toFixed(1)}B`
})

const CryptoCard = React.memo(({ symbol, data }) => {
  const config = cryptoConfigs[symbol]
  const stats = getNetworkStats(symbol, data[data.length - 1]?.[symbol])
  const isPositiveChange = parseFloat(stats.change) >= 0

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {config.name} ({symbol})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-2xl font-bold">
              ${typeof stats.price === 'number' ? stats.price.toFixed(2) : stats.price}
            </p>
            <p className={`flex items-center gap-1 ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
              {isPositiveChange ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {stats.change}%
            </p>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div>
              <p className="text-sm text-muted-foreground">Volume (24h)</p>
              <p className="font-medium">{stats.volume}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gas Price</p>
              <p className="font-medium">{stats.gasPrice}</p>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            [symbol]: {
              label: config.name,
              color: config.color,
            },
          }}
          className="h-[200px]"
        >
          <LineChart data={data}>
            <Line type="monotone" dataKey={symbol} strokeWidth={2} dot={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="font-medium">{stats.marketCap}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Transactions</p>
            <p className="font-medium">{stats.transactions}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

CryptoCard.displayName = 'CryptoCard'

const Footer = () => (
  <footer className="mt-8 py-4 border-t border-gray-200 dark:border-gray-700">
    <div className="container mx-auto px-4">
      <div className="flex justify-center items-center">
        <a
          href="https://github.com/kekubhai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200"
        >
          <Github className="h-5 w-5 mr-2" />
          <span>Created by kekubhai</span>
        </a>
      </div>
    </div>
  </footer>
)

const CoinPulse = () => {
  const [priceData, setPriceData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshData = () => {
    try {
      const newData = fetchCryptoData()
      setPriceData(newData)
      setLoading(false)
      setError(null)
    } catch (err) {
      setError('Failed to fetch crypto data. Please try again.')
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
    const interval = setInterval(refreshData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const memoizedCryptoCards = useMemo(() => {
    return Object.keys(cryptoConfigs).map((symbol) => (
      <CryptoCard key={symbol} symbol={symbol} data={priceData} />
    ))
  }, [priceData])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-card p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">CoinPulse Dashboard</h1>
          <Button onClick={refreshData} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memoizedCryptoCards}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CoinPulse