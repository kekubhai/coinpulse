/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RefreshCw, TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react';
import { Card ,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from './components/ui/card';
import { Alert,AlertDescription,AlertTitle } from './components/ui/alert';
import StarrySky from './components/shinestar';
import Component from './footer';
import AnimatedFooter from './footer';
const CryptoDashboard = () => {
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  
  const cryptoConfigs = {
    BTC: { color: '#F7931A', name: 'Bitcoin' },
    ETH: { color: '#627EEA', name: 'Ethereum' },
    BNB: { color: '#F3BA2F', name: 'Binance Smart Chain' },
    SOL: { color: '#00FFA3', name: 'Solana' },
    ADA: { color: '#0033AD', name: 'Cardano' },
    MATIC: { color: '#8247E5', name: 'Polygon' }
  };

  
  const fetchCryptoData = () => {
    
    const mockData = Array.from({ length: 24 }, (_, i) => ({
      timestamp: `${i}:00`,
      BTC: 40000 + Math.random() * 2000,
      ETH: 2800 + Math.random() * 200,
      BNB: 300 + Math.random() * 20,
      SOL: 100 + Math.random() * 10,
      ADA: 1.2 + Math.random() * 0.2,
      MATIC: 1.5 + Math.random() * 0.3,
      volume: 100000 + Math.random() * 50000
    }));
    setPriceData(mockData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  
  const getNetworkStats = (symbol) => {
    return {
      price: priceData[priceData.length - 1]?.[symbol] || 0,
      change: (Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2),
      volume: `$${(Math.random() * 10).toFixed(1)}B`,
      transactions: `${(Math.random() * 1000).toFixed(0)}k`,
      gasPrice: `${(Math.random() * 100).toFixed(1)} Gwei`,
      marketCap: `$${(Math.random() * 100).toFixed(1)}B`
    };
  };

  const CryptoCard = ({ symbol }) => {
    const stats = getNetworkStats(symbol);
    const config = cryptoConfigs[symbol];
    const isPositiveChange = parseFloat(stats.change) >= 0;

    return (
      <><div className="absolute border-black    top-0 left-0 w-full h-full  bg-opacity-50">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 100 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: 0,
                
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `3s`,
              }} />
          ))}
        </div>
      </div><style>{`
        @keyframes twinkle {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1); }
        }
        .animate-twinkle {
          animation: twinkle infinite;
        }
        `} </style><Card className="p-10 m-5">

          <CardHeader>
            <CardTitle className="grid  text-whiteitems-center gap-10">
              <DollarSign className="w-5 h-5 text-white" />
              
              {config.name} ({symbol})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid border-black grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-2xl font-bold">
                  ${typeof stats.price === 'number' ? stats.price.toFixed(2) : stats.price}
                </p>
                <p className={`flex items-center gap-1 ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositiveChange ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stats.change}%
                </p>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <div>
                  <p className="text-sm text-gray-500">Volume (24h)</p>
                  <p className="font-medium">{stats.volume}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gas Price</p>
                  <p className="font-medium">{stats.gasPrice}</p>
                </div>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                  <XAxis
                    dataKey="timestamp"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd" />
                  <YAxis
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey={symbol}
                    stroke={config.color}
                    strokeWidth={2}
                    dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Market Cap</p>
                <p className="font-medium">{stats.marketCap}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">24h Transactions</p>
                <p className="font-medium">{stats.transactions}</p>
              </div>
            </div>
          </CardContent>
        </Card></>
       
              
    );
  };

  return (
    
    <div className="p-6 pl-7 max-w-8xl  border-black mx-auto space-x-6">
    <div className="flex items-center justify-between bg-gray-900 p-6 rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold text-white">Crypto Networks Dashboard</h1>
  <button 
    onClick={fetchCryptoData}
    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
  >
    <RefreshCw className="w-4 h-4" />
    Refresh
  </button>
</div>


      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 text-white border-black bg-black md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(cryptoConfigs).map((symbol) => (
          <CryptoCard key={symbol} symbol={symbol} />
        ))}
      </div>
      <AnimatedFooter/>
    </div>
  );
};

export default CryptoDashboard;