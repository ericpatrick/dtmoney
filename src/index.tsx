import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Model, createServer } from 'miragejs';

const mockModels = {
  transaction: Model.extend({
    id: 1,
    title: ""
  })
}

const mockFactories = {}

createServer<typeof mockModels, typeof mockFactories>({
  models: mockModels,

  seeds: (server) => {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "dev",
          amount: 6000,
          createdAt: new Date("2021-02-12 09:00:00")
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 1100,
          createdAt: new Date("2021-02-14 11:00:00")
        }
      ]
    })
  },

  routes() {
    this.namespace = "api";
    
    this.get("/transactions", (schema) => schema.all("transaction"));

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      data.createdAt = new Date();

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

