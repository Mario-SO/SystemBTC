/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

//This is a very basic example so this is why the plain api url is here.
//If you plan to use an api with access keys, NEVER keep them within the code.
const url: string = "https://api.coindesk.com/v1/bpi/currentprice.json";

export interface Price {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

export interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface Bpi {
  USD: Usd;
  GBP: Gbp;
  EUR: Eur;
}

export interface Usd {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Gbp {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Eur {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

export const handler: Handlers<Price | null> = {
  async GET(_, ctx) {
    const resp = await fetch(url);
    if (resp.status === 200) {
      const price: Price = await resp.json();
      return ctx.render(price);
    }
    return ctx.render(null);
  },
};

export default function Home({ data }: PageProps<Price | null>) {
  if (!data) {
    return (
      <div>
        <div className="window">
          <head>
            <link rel="stylesheet" href="https://unpkg.com/@sakun/system.css" />
          </head>
        </div>

        <div className="window">
          <div className="title-bar">
            <button aria-label="Close" className="close"></button>
            <h1 className="title">Data Is not available</h1>
            <button aria-label="Resize" disabled className="hidden"></button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="head">
        <head>
          <link rel="stylesheet" href="https://unpkg.com/@sakun/system.css" />
        </head>
      </div>
      <div>
        <div className="window">
          <div className="title-bar">
            <button aria-label="Close" className="close"></button>
            <h1 className="title">BTC Price Checker</h1>
            <button aria-label="Resize" disabled className="hidden"></button>
          </div>
        </div>
        <div style="display: flex">
          <div className="standard-dialog" style="width:50%; text-align:center">
            <h1 className="dialog-text">
              USD: ${data.bpi.USD.rate}
            </h1>
          </div>
          <div className="standard-dialog" style="width:50%; text-align:center">
            <h1 className="dialog-text">
              EUR: {data.bpi.EUR.rate} €
            </h1>
          </div>
        </div>
        <div
          className="standard-dialog"
          style="text-align:center;"
        >
          <h1 className="dialog-text">
            Last time checked: {data.time.updated}
          </h1>
        </div>
      </div>
    </div>
  );
}
