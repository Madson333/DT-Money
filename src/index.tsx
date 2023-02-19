import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { GlobalStyle } from './styles/global';
import { createServer, Model } from "miragejs"

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createdAt: new Date("2023-02-18 17:46:00"),
        },
        {
          id: 2,
          title: "Alugel",
          type: "withdraw",
          category: "casa",
          amount: 1100,
          createdAt: new Date("2023-02-14 16:46:00"),
        }
      ]
    })
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return [
        this.schema.all("transaction")
      ]
    })
    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);