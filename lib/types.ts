export type Status='INTAKE'|'RESEARCH'|'DRAFT'|'NEEDS_LOGAN'|'LISTED'|'OFFER'|'SOLD';
export type Lane='HOUSEHOLD'|'CARD'|'FLIP';
export interface PriceGuardrails{marketValue:number;ask:number;target:number;softFloor:number;hardFloor:number}
export interface CardDetails{sport?:string;player?:string;year?:string;set?:string;cardNumber?:string;parallel?:string;rookie?:boolean;insert?:string;gradingCompany?:string;grade?:string}
export interface InventoryItem{id:string;title:string;lane:Lane;category:string;condition:string;description:string;prices:PriceGuardrails;status:Status;photos:string[];primaryPhoto?:string;platforms:string[];listedAt?:string;soldPrice?:number;fees?:number;shipping?:number;acquisitionCost?:number;card?:CardDetails;nextAction:string;createdAt:string;updatedAt:string}
export const canAcceptOffer=(offer:number,item:InventoryItem)=>offer>=item.prices.hardFloor;
export const needsLogan=(offer:number,item:InventoryItem)=>offer<item.prices.softFloor||item.status==='NEEDS_LOGAN';