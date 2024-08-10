import { Dictionary } from "@reduxjs/toolkit";

export interface SPiechartModel {
    title:string,
    boxWidth:number,
    piStrokeColor:string,
    colors:Dictionary<string>,
}