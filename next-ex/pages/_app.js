import '@/styles/globals.css'
import Router from "next/router";
import { useEffect, useState } from 'react';
import Spinner from './spinners/spinners';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
      useEffect(() => {
        const start = () => {
          //console.log("start");
          setLoading(true);
        };
        const end = () => {
          //console.log("finished");
          setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
          Router.events.off("routeChangeStart", start);
          Router.events.off("routeChangeComplete", end);
          Router.events.off("routeChangeError", end);
        };
      }, []);
      return (
        <>
          {loading ? (
           <Spinner />
          ) : (
            <Component {...pageProps} />
          )}
        </>
      );
}
