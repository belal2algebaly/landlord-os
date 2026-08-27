LOS.seed = {
  properties:[
    {id:'p1',name:'Maple Residence',address:'12 Maple Ave, Austin',rent:1250,image:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'},
    {id:'p2',name:'Oak Loft',address:'48 Oak Street, Austin',rent:1200,image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'},
    {id:'p3',name:'Brick House',address:'93 Pine Road, Dallas',rent:1200,image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'},
    {id:'p4',name:'Sunset Apartment',address:'7 Sunset Blvd, Dallas',rent:1150,image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'},
    {id:'p5',name:'Cedar Studio',address:'22 Cedar Lane, Austin',rent:980,image:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'},
    {id:'p6',name:'North View',address:'81 North Ave, Houston',rent:1320,image:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'}
  ],
  tenants:[
    {id:'t1',name:'Ahmed Hassan',propertyId:'p1',email:'ahmed@example.com',phone:'+1 555 1200',leaseStart:'2026-02-01',leaseEnd:'2027-01-31'},
    {id:'t2',name:'Sarah Ali',propertyId:'p2',email:'sarah@example.com',phone:'+1 555 2200',leaseStart:'2025-10-15',leaseEnd:'2026-10-15'},
    {id:'t3',name:'Omar Khaled',propertyId:'p3',email:'omar@example.com',phone:'+1 555 3200',leaseStart:'2025-12-01',leaseEnd:'2026-12-01'},
    {id:'t4',name:'Laila Mostafa',propertyId:'p5',email:'laila@example.com',phone:'+1 555 5200',leaseStart:'2026-03-20',leaseEnd:'2027-03-20'},
    {id:'t5',name:'Mina Adel',propertyId:'p6',email:'mina@example.com',phone:'+1 555 6200',leaseStart:'2026-05-10',leaseEnd:'2027-05-10'}
  ],
  payments:[
    {id:'pay1',propertyId:'p1',month:'2026-08',amount:1250,date:'2026-08-01'},
    {id:'pay2',propertyId:'p5',month:'2026-08',amount:980,date:'2026-08-02'},
    {id:'pay3',propertyId:'p6',month:'2026-08',amount:1320,date:'2026-08-01'}
  ],
  expenses:[
    {id:'e1',propertyId:'p1',category:'Maintenance',amount:240,date:'2026-08-04',note:'AC service'},
    {id:'e2',propertyId:'p2',category:'Repairs',amount:180,date:'2026-08-09',note:'Door lock'},
    {id:'e3',propertyId:'p3',category:'Utilities',amount:120,date:'2026-08-12',note:'Common utilities'},
    {id:'e4',propertyId:'p5',category:'Cleaning',amount:80,date:'2026-08-18',note:'Turnover clean'}
  ],
  dismissedAlerts:[]
};
LOS.state = LOS.read(LOS.seed);
LOS.persist = () => LOS.write(LOS.state);
LOS.property = id => LOS.state.properties.find(p=>p.id===id);
LOS.tenantFor = propertyId => LOS.state.tenants.find(t=>t.propertyId===propertyId);
LOS.paymentFor = (propertyId,month=LOS.monthKey()) => LOS.state.payments.find(p=>p.propertyId===propertyId&&p.month===month);
LOS.statusFor = (propertyId,month=LOS.monthKey()) => {
  const tenant=LOS.tenantFor(propertyId); if(!tenant) return 'Vacant';
  if(LOS.paymentFor(propertyId,month)) return 'Paid';
  const today=LOS.today().getDate(); return today>7 ? 'Overdue' : today>=1 ? 'Due soon' : 'Upcoming';
};
LOS.derived = () => {
  const month=LOS.monthKey();
  const occupied=LOS.state.properties.filter(p=>LOS.tenantFor(p.id));
  const expected=occupied.reduce((s,p)=>s+LOS.safeNumber(p.rent),0);
  const collected=LOS.state.payments.filter(p=>p.month===month).reduce((s,p)=>s+LOS.safeNumber(p.amount),0);
  const overdue=occupied.filter(p=>LOS.statusFor(p.id,month)==='Overdue').reduce((s,p)=>s+LOS.safeNumber(p.rent),0);
  const occupancy=LOS.state.properties.length?Math.round(occupied.length/LOS.state.properties.length*100):0;
  return {month,expected,collected,overdue,occupancy,occupiedCount:occupied.length,total:LOS.state.properties.length};
};
LOS.alerts = () => {
  const items=[]; const month=LOS.monthKey();
  LOS.state.properties.forEach(p=>{
    const tenant=LOS.tenantFor(p.id); const st=LOS.statusFor(p.id,month);
    if(st==='Overdue') items.push({id:`rent-${p.id}-${month}`,severity:'high',title:'Rent overdue',detail:`${p.name} · ${LOS.money(p.rent)} still unpaid`,propertyId:p.id});
    if(!tenant) items.push({id:`vacant-${p.id}`,severity:'low',title:'Vacant unit',detail:`${p.name} currently has no tenant`,propertyId:p.id});
    if(tenant){ const days=LOS.daysUntil(tenant.leaseEnd); if(days!==null&&days>=0&&days<=60) items.push({id:`lease-${tenant.id}`,severity:days<=30?'high':'medium',title:'Lease ending soon',detail:`${p.name} lease ends in ${days} day${days===1?'':'s'}`,propertyId:p.id}); }
  });
  return items.filter(a=>!LOS.state.dismissedAlerts.includes(a.id));
};
