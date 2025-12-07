# 📘 Currency Converter — React App

Un convertisseur de devises moderne développé avec **React**, **TypeScript**, **TailwindCSS**, et une API gratuite pour obtenir les taux de change en temps réel.

---

## 🚀 Fonctionnalités

* 🔄 Conversion en temps réel entre plus de 30 devises
* 🌍 Taux obtenus à partir d'une **API gratuite**
* 🎨 Interface moderne grâce à **TailwindCSS**
* ⚡ Rapidité et performance avec **Vite + React + TS**
* 📱 Design responsive (mobile / desktop)

---

## 🛠️ Technologies utilisées

* **React 18**
* **TypeScript**
* **Vite**
* **TailwindCSS**
* **API Exchangerate.host** (gratuite & sans clé)

---

## 📦 Installation

Clone le projet :

```bash
git clone https://github.com/your-username/currency-converter.git
cd currency-converter
```

Installe les dépendances :

```bash
npm install
```

---

## 🎨 Configuration de TailwindCSS

Si tu veux vérifier que Tailwind fonctionne, les fichiers nécessaires sont :

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🌐 API utilisée

Ce projet utilise :

```
https://api.exchangerate.host/latest?base=USD&symbols=EUR
```

Exemple de réponse :

```json
{
  "success": true,
  "base": "USD",
  "rates": {
    "EUR": 0.92
  }
}
```

➡️ Avantage : **API gratuite, fiable et sans clé API**

---

## ▶️ Lancer le projet

```bash
npm run dev
```

Le projet sera lancé ici :

```
http://localhost:5173
```

---

## 📁 Structure du projet

```
currency-converter/
│── public/
│── src/
│   ├── components/
│   │   ├── CurrencySelector.tsx
│   │   ├── ConverterCard.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│── package.json
│── tailwind.config.js
│── tsconfig.json
│── README.md
```

---

## 🧮 Exemple d'utilisation

1. Choisir la devise source :
   🇺🇸 USD

2. Choisir la devise cible :
   🇪🇺 EUR

3. Entrer un montant :
   `100`

4. Résultat affiché automatiquement :
   `100 USD = 92.00 EUR`

---

## 🎯 Objectifs pédagogiques

Ce projet permet de pratiquer :

* Hooks React (`useState`, `useEffect`)
* Appels API avec `fetch`
* Gestion de formulaires
* Styling Tailwind
* Architecture propre en React
* Types TypeScript

---

## 📜 Licence

Libre d'utilisation pour projets personnels, étudiants ou apprentissage.

---

