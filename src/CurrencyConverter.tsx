import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowRightLeft, Star, Clock, RefreshCw } from 'lucide-react';

// Types
interface Currency {
  code: string;
  name: string;
  flag: string;
}

interface Rates {
  [key: string]: number;
}

interface HistoricalDataPoint {
  date: string;
  rate: number;
}

interface ConversionHistory {
  id: number;
  amount: number;
  from: string;
  to: string;
  result: number;
  time: string;
}

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  favorites: string[];
  toggleFavorite: (code: string) => void;
}

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<number>(0);
  const [rates, setRates] = useState<Rates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [favorites, setFavorites] = useState<string[]>(['USD', 'EUR', 'GBP', 'JPY']);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);

  // Liste des devises principales
  const currencies: Currency[] = [
    { code: 'USD', name: 'Dollar américain', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'Livre sterling', flag: '🇬🇧' },
    { code: 'JPY', name: 'Yen japonais', flag: '🇯🇵' },
    { code: 'CHF', name: 'Franc suisse', flag: '🇨🇭' },
    { code: 'CAD', name: 'Dollar canadien', flag: '🇨🇦' },
    { code: 'AUD', name: 'Dollar australien', flag: '🇦🇺' },
    { code: 'CNY', name: 'Yuan chinois', flag: '🇨🇳' },
    { code: 'INR', name: 'Roupie indienne', flag: '🇮🇳' },
    { code: 'BRL', name: 'Real brésilien', flag: '🇧🇷' },
    { code: 'MXN', name: 'Peso mexicain', flag: '🇲🇽' },
    { code: 'ZAR', name: 'Rand sud-africain', flag: '🇿🇦' },
    { code: 'SEK', name: 'Couronne suédoise', flag: '🇸🇪' },
    { code: 'NOK', name: 'Couronne norvégienne', flag: '🇳🇴' },
    { code: 'DKK', name: 'Couronne danoise', flag: '🇩🇰' },
    { code: 'MAD', name: 'Dirham marocain', flag: '🇲🇦' }
  ];

  // Simulation des taux de change (dans une vraie app, utiliser une API comme exchangerate-api.com)
  const mockRates: Rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CHF: 0.88,
    CAD: 1.36,
    AUD: 1.53,
    CNY: 7.24,
    INR: 83.12,
    BRL: 4.97,
    MXN: 17.08,
    ZAR: 18.65,
    SEK: 10.58,
    NOK: 10.72,
    DKK: 6.86,
    MAD: 10.15
  };

  // Générer des données historiques simulées
  const generateHistoricalData = (): HistoricalDataPoint[] => {
    const data: HistoricalDataPoint[] = [];
    const baseRate = mockRates[toCurrency] / mockRates[fromCurrency];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variation = (Math.random() - 0.5) * 0.1;
      data.push({
        date: date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
        rate: +(baseRate * (1 + variation)).toFixed(4)
      });
    }
    return data;
  };

  useEffect(() => {
    // Simuler le chargement des taux
    setTimeout(() => {
      setRates(mockRates);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setResult(+(amount * rate).toFixed(2));
      setHistoricalData(generateHistoricalData());
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleConvert = (): void => {
    const newEntry: ConversionHistory = {
      id: Date.now(),
      amount,
      from: fromCurrency,
      to: toCurrency,
      result,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    setHistory([newEntry, ...history.slice(0, 4)]);
  };

  const swapCurrencies = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleFavorite = (code: string): void => {
    if (favorites.includes(code)) {
      setFavorites(favorites.filter(f => f !== code));
    } else {
      setFavorites([...favorites, code]);
    }
  };

  const refreshRates = (): void => {
    setLoading(true);
    setLastUpdate(new Date());
    setTimeout(() => setLoading(false), 800);
  };

  const getCurrentRate = (): string => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return '0';
    return (rates[toCurrency] / rates[fromCurrency]).toFixed(4);
  };

  const getRateChange = (): string => {
    // Simulation d'une variation
    return (Math.random() * 2 - 1).toFixed(2);
  };

  const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange, label, favorites, toggleFavorite }) => (
    <div className="flex-1">
      <label className="block text-gray-300 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {currencies.map(curr => (
            <option key={curr.code} value={curr.code} className="bg-slate-800">
              {curr.flag} {curr.code} - {curr.name}
            </option>
          ))}
        </select>
        <div 
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(value);
          }}
        >
          <Star
            className={`w-5 h-5 transition-all ${
              favorites.includes(value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
            }`}
          />
        </div>
      </div>
    </div>
  );

  const rateChange = getRateChange();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 flex items-center justify-center">
            <ArrowRightLeft className="w-12 h-12 mr-4 text-purple-400" />
            Convertisseur de Devises
          </h1>
          <p className="text-gray-300 text-lg">Taux en temps réel avec graphiques historiques</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonne principale - Convertisseur */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte de conversion */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Montant */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Montant</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="0.00"
                />
              </div>

              {/* Sélecteurs de devises */}
              <div className="flex items-center gap-4 mb-6">
                <CurrencySelect
                  value={fromCurrency}
                  onChange={setFromCurrency}
                  label="De"
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
                
                <button
                  onClick={swapCurrencies}
                  className="mt-7 bg-purple-500 hover:bg-purple-600 p-3 rounded-xl transition-all transform hover:scale-110 hover:rotate-180 duration-300"
                >
                  <ArrowRightLeft className="w-6 h-6 text-white" />
                </button>

                <CurrencySelect
                  value={toCurrency}
                  onChange={setToCurrency}
                  label="Vers"
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </div>

              {/* Résultat */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-6">
                <div className="text-gray-300 text-sm mb-2">Résultat</div>
                <div className="text-5xl font-bold text-white mb-2">
                  {loading ? '...' : result.toLocaleString('fr-FR')}
                </div>
                <div className="text-gray-300">
                  1 {fromCurrency} = {getCurrentRate()} {toCurrency}
                </div>
              </div>

              {/* Bouton convertir */}
              <button
                onClick={handleConvert}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                Convertir
              </button>
            </div>

            {/* Graphique historique */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Historique 30 jours</h3>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center ${parseFloat(rateChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(rateChange) >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    <span className="ml-1 font-semibold">{Math.abs(parseFloat(rateChange))}%</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="date" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #ffffff20',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#a855f7"
                    strokeWidth={3}
                    fill="url(#colorRate)"
                    dot={{ fill: '#a855f7', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Info mise à jour */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="text-sm">
                    Mis à jour: {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <button
                  onClick={refreshRates}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
                  disabled={loading}
                >
                  <RefreshCw className={`w-5 h-5 text-purple-400 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Favoris */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 fill-yellow-400 text-yellow-400" />
                Taux favoris
              </h3>
              <div className="space-y-3">
                {favorites.map(code => {
                  const currency = currencies.find(c => c.code === code);
                  if (!currency) return null;
                  const rate = (rates[code] / rates[fromCurrency]).toFixed(4);
                  return (
                    <div key={code} className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{currency.flag}</span>
                          <div>
                            <div className="text-white font-semibold">{code}</div>
                            <div className="text-gray-400 text-xs">{currency.name}</div>
                          </div>
                        </div>
                        <div className="text-white font-bold">{rate}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Historique des conversions */}
            {history.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Historique récent</h3>
                <div className="space-y-3">
                  {history.map(entry => (
                    <div key={entry.id} className="bg-white/5 rounded-xl p-3 text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white font-semibold">
                          {entry.amount} {entry.from} → {entry.to}
                        </span>
                        <span className="text-gray-400">{entry.time}</span>
                      </div>
                      <div className="text-purple-400 font-bold">{entry.result.toLocaleString('fr-FR')}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;