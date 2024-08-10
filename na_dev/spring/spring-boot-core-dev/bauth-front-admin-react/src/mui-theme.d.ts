import { themeOptions, PaletteColorOptions, PaletteColor, Palette, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface themeOptions {
    customShadows?: object | undefined;
  }

  interface Palette {
    customShadows?: object | undefined;
  }
  interface Theme {
    customShadows?: {
      z1: string;
      z4: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      primary: string;
      info: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
      card: string;
      dialog: string;
      dropdown: string;
    } | undefined;
  }

  interface PaletteColorOptions {
    lighter?: string;
    darker?: string;
  }

  interface PaletteColor {
    lighter?: string | undefined;
    darker?: string | undefined;
  }
}

declare module 'mapbox-gl' {
  interface mapboxgl {
    workerClass?: any | undefined;
  }
}