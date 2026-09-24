import {InventoryItem} from './types';

const now='2026-09-16T00:00:00Z';

type SeedRow=[string,string,string,number,number,number,number];

const rows:SeedRow[]=[
  ['EMG-001','Jeep 4.7L V8','Vehicle',1200,1200,1000,900],
  ['EMG-002','Fujikura CT50 Cleaver #1','Fiber Equipment',350,350,300,250],
  ['EMG-003','Fujikura CT50 Cleaver #2','Fiber Equipment',350,350,300,250],
  ['EMG-004','Home Gym Setup','Fitness',350,350,300,250],
  ['EMG-005','Bowflex Home Gym','Fitness',175,175,150,100],
  ['EMG-006','Mycology Bundle','Mycology',350,350,300,225],
  ['EMG-007','Contractor Tool Bundle','Tools',525,525,450,350],
  ['EMG-008','Small Home Office Bundle','Office',300,300,250,175],
  ['EMG-009','Bedroom Furniture Bundle','Furniture',350,350,300,200],
  ['EMG-010','Entertainment Setup + 50in TV','Electronics',300,300,275,200],
  ['EMG-011','Terrarium Bundle','Terrarium',200,200,175,125],
];

export const seed:InventoryItem[]=rows.map(([displayId,title,category,marketValue,ask,target,hardFloor],index)=>({
  id:`seed-${index+1}`,
  displayId,
  title,
  lane:'HOUSEHOLD',
  category,
  condition:'Used',
  description:'Seed inventory — verify details and pricing before publication.',
  prices:{marketValue,ask,target,softFloor:target,hardFloor},
  status:'INTAKE',
  photos:[],
  platforms:[],
  nextAction:'Verify item details and add photos',
  createdAt:now,
  updatedAt:now,
  version:1,
}));
