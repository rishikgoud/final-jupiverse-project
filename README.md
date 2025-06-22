# 🌐 Coinverse

**Coinverse** is a Web3 portfolio tracker and swap route explorer built on the Solana blockchain using the Jupiter Exchange APIs. It helps users monitor their token holdings, view live token prices, explore swap routes, and visualize their portfolio health — all through a clean, responsive, and beginner-friendly interface.

##🚀 Live Demo

👉 [Visit Coinverse](https://coinverse-fwor.onrender.com/)

🏆 Built for

Coinverse was built as part of a Web3 Hackathon to explore Solana blockchain capabilities and improve crypto portfolio experiences.  

👉 **Team:** Initially started as part of team *CoinMe*, but developed independently as *Coinverse* by [Rishik Goud Talla](#author).

---

## ⚡ Features

✅ **Portfolio Overview**  
- View SOL and token balances  
- Real-time price tracking (via Jupiter API)  
- Risk classification labels (Degen / Normie / Investor)  
- Beautiful pie chart and history chart of your portfolio  

✅ **Swap Route Explorer**  
- Visualize potential swap routes between tokens (via Jupiter API)  

✅ **Advanced Insights (Static)**  
- Example advanced metrics (hardcoded prototype)  

✅ **Market Sentiment (Static)**  
- Displays dummy market sentiment and trends  

✅ **Chat Support (Static)**  
- Example chat window for future support or community interaction  

---

## 🛠 Tech Stack

- **Frontend:** React.js, TailwindCSS, Lucide Icons, Recharts  
- **Backend:** Node.js, Express.js  
- **APIs:** Jupiter Exchange API (price + swap routes), Solana RPC for wallet tokens  
- **Hosting:** Render (for both frontend and backend)

---

## 💻 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/coinverse.git
cd coinverse

# Frontend setup
cd frontend
npm install
npm start

# Backend setup (in a separate terminal)
cd backend
npm install
node server.js
