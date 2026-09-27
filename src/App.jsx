import { useState } from 'react'
import { MarketHubLogo } from './MarketHubLogo'

const ICONS = {
  minus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0-1 13a1 1 0 01-1 1H8a1 1 0 01-1-1L6 7"/></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
  truck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8h11v9H2zM13 11h4l3 3v3h-7z"/><circle cx="6.5" cy="19" r="1.7"/><circle cx="16.5" cy="19" r="1.7"/></svg>,
  bolt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>,
  card: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  bank: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M4 21V10M20 21V10M2 10l10-6 10 6M6 10v7M10 10v7M14 10v7M18 10v7"/></svg>,
  pencil: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>,
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
}
const Icon = ({ name, className = 'w-5 h-5' }) => <span className={className}>{ICONS[name]}</span>

const INITIAL_ITEMS = [
  { id: 1, name: 'HP Pavilion Laptop', vendor: 'TechWorld', price: 450000, qty: 1, image: '/images/hpl.jpg' },
  { id: 2, name: 'Nike Air Force 1', vendor: 'Nike Official', price: 65000, qty: 1, image: '/images/naf.jpg' },
  { id: 3, name: 'JBL Headphones', vendor: 'SoundHub', price: 45000, qty: 1, image: '/images/jbl.jpg' },
  { id: 4, name: 'Smart Watch', vendor: 'TechWorld', price: 70000, qty: 1, image: '/images/sw.jpg' },
]
const fmt = (n) => `₦${n.toLocaleString()}`
const DELIVERY_FEE = 5000

function Stepper({ step }) {
  const steps = ['Delivery', 'Payment', 'Review']
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 text-xs font-semibold ${i <= step ? 'text-primary' : 'text-muted'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${i <= step ? 'bg-primary text-white' : 'bg-border text-muted'}`}>
              {i < step ? <Icon name="back" className="w-3 h-3 rotate-90" /> : i + 1}
            </span>
            <span className="hidden sm:inline">{s}</span>
          </div>
          {i < steps.length - 1 && <div className={`w-6 h-px ${i < step ? 'bg-primary' : 'bg-border'}`} />}
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('cart') 
  const [step, setStep] = useState(0) // 0 delivery 1 payment 2 review
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [delivery, setDelivery] = useState({ name: '', phone: '', address: '', state: '', city: '', method: 'standard' })
  const [payment, setPayment] = useState('card')

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal + (subtotal > 0 ? DELIVERY_FEE : 0)

  const changeQty = (id, d) => setItems(items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i))
  const removeItem = (id) => setItems(items.filter(i => i.id !== id))

  const placeOrder = () => {
    setScreen('processing')
    setTimeout(() => setScreen('success'), 1400)
  }

  //  CART side maay touch later rgards size ----------
  if (screen === 'cart') {
    return (
      <div className="min-h-screen bg-bg font-sans pb-40">
        <header className="sticky top-0 bg-white border-b border-border px-4 py-4 z-10">
          <div className="max-w-lg mx-auto flex items-center gap-2">
            <MarketHubLogo className="w-7 h-7 text-primary" />
            <h1 className="font-bold text-text text-lg">Market<span className="text-primary">Hub</span></h1>
            <span className="ml-auto flex items-center gap-4">
              <Icon name="bell" className="w-5 h-5 text-text" />
              <Icon name="chat" className="w-5 h-5 text-text" />
            </span>
          </div>
        </header>

        <div className="max-w-lg mx-auto px-4">
          <h2 className="font-semibold text-text text-lg pt-5 pb-3">
            Your Cart <span className="text-muted font-normal text-sm">({items.length} items)</span>
          </h2>

          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-3 border border-border items-center">
                <span className="text-xs text-muted w-4 pt-1 shrink-0">{idx + 1}</span>
                <div className="w-16 h-16 rounded-xl bg-bg shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text text-sm truncate">{item.name}</p>
                  <p className="font-semibold text-text mt-1">{fmt(item.price)}</p>
                  <div className="flex items-center border border-border rounded-lg overflow-hidden w-fit mt-2">
                    <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-text"><Icon name="minus" className="w-3 h-3" /></button>
                    <span className="text-sm font-medium w-7 text-center">{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-text"><Icon name="plus" className="w-3 h-3" /></button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-muted hover:text-red-500 shrink-0 self-center" style={{ minWidth: '20px', minHeight: '20px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0-1 13a1 1 0 01-1 1H8a1 1 0 01-1-1L6 7"/>
                  </svg>
                </button>
              </div>
            ))}
            {items.length === 0 && <p className="text-center text-muted py-12">Your cart is empty.</p>}
          </div>
        </div>

        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-border p-4 max-w-lg mx-auto left-0 right-0">
          <p className="font-semibold text-text mb-2 text-sm">Order Summary</p>
          <div className="flex justify-between text-sm text-gray-500 mb-1.5"><span>Subtotal</span><span className="font-semibold text-gray-900">{fmt(subtotal)}</span></div>
          <div className="flex justify-between text-sm text-gray-500 mb-2"><span>Delivery Fee</span><span className="font-semibold text-gray-900">{subtotal ? fmt(DELIVERY_FEE) : '—'}</span></div>
          <div className="flex justify-between text-base font-bold text-gray-900 mb-3.5"><span>Total</span><span className="text-[#0A4D34]">{fmt(total)}</span></div>
          <button
            disabled={items.length === 0}
            onClick={() => setScreen('checkout')}
            className="group w-full bg-primary disabled:bg-border disabled:text-muted text-white font-semibold py-3.5 rounded-xl active:scale-[0.98] transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>
    )
  }

  //  CHECKOUT (Delivery side , with Payment and review combo) 
  if (screen === 'checkout') {
    return (
      <div className="min-h-screen bg-bg font-sans pb-32">
        <header className="sticky top-0 bg-white border-b border-border px-4 py-3 z-10">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-3">
              <button onClick={() => step === 0 ? setScreen('cart') : setStep(step - 1)} className="text-text"><Icon name="back" /></button>
              <h1 className="font-semibold text-text text-sm">Secure Checkout</h1>
              <span className="ml-auto flex items-center gap-3">
                <button onClick={() => setScreen('cart')} className="text-xs text-muted hover:text-red-500 font-medium">Cancel</button>
                <Icon name="lock" className="w-4 h-4 text-muted" />
              </span>
            </div>
            <Stepper step={step} />
          </div>
        </header>

        <div className="p-4 max-w-lg mx-auto space-y-4">
          {step === 0 && (
            <div className="bg-white rounded-2xl p-4 space-y-3">
              <h2 className="font-semibold text-text">Delivery Address</h2>
              {['Full Name', 'Phone Number', 'Address'].map((ph) => (
                <input key={ph} placeholder={ph} className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" />
              ))}
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="State" className="border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" />
                <input placeholder="City" className="border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
              <div className="pt-2 space-y-2">
                {[{ id: 'standard', label: 'Standard Delivery', sub: '2–5 business days' }, { id: 'express', label: 'Express Delivery', sub: '1–2 business days' }].map(opt => (
                  <button key={opt.id} onClick={() => setDelivery({ ...delivery, method: opt.id })}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left ${delivery.method === opt.id ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <Icon name="truck" className={`w-5 h-5 ${delivery.method === opt.id ? 'text-primary' : 'text-muted'}`} />
                    <div><p className="text-sm font-medium text-text">{opt.label}</p><p className="text-xs text-muted">{opt.sub}</p></div>
                    <div className={`ml-auto w-4 h-4 rounded-full border-2 ${delivery.method === opt.id ? 'border-primary bg-primary' : 'border-border'}`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="bg-white rounded-2xl p-4 space-y-2">
              <h2 className="font-semibold text-text mb-1">Payment Method</h2>
              {[{ id: 'card', label: 'Card', sub: 'Visa, Mastercard, Verve', icon: 'card' }, { id: 'bank', label: 'Bank Transfer', sub: 'Direct transfer', icon: 'bank' }, { id: 'bolt', label: 'Paystack', sub: 'Pay with Paystack', icon: 'bolt' }].map(opt => (
                <button key={opt.id} onClick={() => setPayment(opt.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left ${payment === opt.id ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <Icon name={opt.icon} className={`w-5 h-5 ${payment === opt.id ? 'text-primary' : 'text-muted'}`} />
                  <div><p className="text-sm font-medium text-text">{opt.label}</p><p className="text-xs text-muted">{opt.sub}</p></div>
                  <div className={`ml-auto w-4 h-4 rounded-full border-2 ${payment === opt.id ? 'border-primary bg-primary' : 'border-border'}`} />
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-text text-sm">Delivery</h3>
                  <button onClick={() => setStep(0)} className="text-primary text-xs flex items-center gap-1"><Icon name="pencil" className="w-3 h-3" />Edit</button>
                </div>
                <p className="text-sm text-muted">Davidson Bute-metta · {delivery.method === 'express' ? 'Express' : 'Standard'} delivery</p>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-text text-sm">Payment</h3>
                  <button onClick={() => setStep(1)} className="text-primary text-xs flex items-center gap-1"><Icon name="pencil" className="w-3 h-3" />Edit</button>
                </div>
                <p className="text-sm text-muted capitalize">{payment}</p>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <h3 className="font-semibold text-text text-sm mb-2">Items ({items.length})</h3>
                {items.map(i => (
                  <div key={i.id} className="flex items-center gap-2 text-sm py-1.5">
                    <img src={i.image} alt={i.name} className="w-8 h-8 rounded-lg object-cover bg-bg shrink-0" onError={(e) => { e.target.style.display = 'none' }} />
                    <span className="text-text flex-1">{i.name} × {i.qty}</span>
                    <span className="text-muted">{fmt(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-border p-4 max-w-lg mx-auto left-0 right-0">
          <div className="flex justify-between text-sm mb-3"><span className="text-muted">Total</span><span className="font-semibold text-primary">{fmt(total)}</span></div>
          <button
            onClick={() => step < 2 ? setStep(step + 1) : placeOrder()}
            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl active:scale-[0.98] transition"
          >
            {step === 0 ? 'Continue to Payment' : step === 1 ? 'Continue to Review' : `Place Order  ${fmt(total)}`}
          </button>
        </div>
      </div>
    )
  }

  // ---------- PROCESSING ----------
  if (screen === 'processing') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center font-sans">
        <svg viewBox="0 0 50 50" className="w-12 h-12 animate-spin text-primary">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="90 60" />
        </svg>
        <p className="text-muted text-sm mt-4">Placing your order…</p>
      </div>
    )
  }

  // ---------- SUCCESS ----------
  if (screen === 'success') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center font-sans p-6 text-center">
        <svg viewBox="0 0 120 120" className="w-28 h-28">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#0F5132" strokeWidth="4"
            strokeDasharray="327" strokeDashoffset="327" strokeLinecap="round"
            style={{ animation: 'drawCircle 0.6s ease-out forwards' }} />
          <path d="M38 62 L54 78 L84 44" fill="none" stroke="#0F5132" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="70" strokeDashoffset="70"
            style={{ animation: 'drawCheck 0.4s ease-out 0.55s forwards' }} />
        </svg>
        <style>{`
          @keyframes drawCircle { to { stroke-dashoffset: 0; } }
          @keyframes drawCheck { to { stroke-dashoffset: 0; } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
          .fade-up { animation: fadeUp 0.5s ease-out 0.9s both; }
        `}</style>
        <h1 className="fade-up text-2xl font-bold text-text mt-6">Good work!</h1>
        <p className="fade-up text-muted mt-1">Your order is confirmed.</p>
        <p className="fade-up text-sm text-muted mt-3">Order #MH-{Math.floor(10000 + Math.random() * 89999)}</p>
        <p className="fade-up text-xs text-muted mt-1">We've sent your order details to your account.</p>
        <div className="fade-up flex flex-col gap-2 w-full max-w-xs mt-8">
          <button className="w-full bg-primary text-white font-semibold py-3 rounded-xl">Track Order</button>
          <button onClick={() => { setItems(INITIAL_ITEMS); setStep(0); setScreen('cart') }} className="w-full text-primary font-medium py-3">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return null
}
