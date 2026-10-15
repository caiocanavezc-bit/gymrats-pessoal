import type{ReactNode}from'react';import{ChevronRight}from'lucide-react';
export const Card=({children,className=''}:{children:ReactNode,className?:string})=><section className={`card ${className}`}>{children}</section>;
export const Empty=({title,text}:{title:string,text:string})=><Card className="empty"><div className="empty-icon">+</div><h3>{title}</h3><p>{text}</p></Card>;
export const PageTitle=({eyebrow,title,action}:{eyebrow:string,title:string,action?:ReactNode})=><div className="page-title"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div>{action}</div>;
export const Stat=({label,value,unit}:{label:string,value:string|number,unit?:string})=><div className="stat"><span>{label}</span><strong>{value}<small>{unit}</small></strong></div>;
export const Progress=({value,label}:{value:number,label?:string})=><div className="progress-wrap">{label&&<div className="progress-label"><span>{label}</span><b>{Math.round(value)}%</b></div>}<div className="progress"><i style={{transform:`scaleX(${Math.max(0,Math.min(100,value))/100})`}}/></div></div>;
export const ListRow=({title,meta,onClick}:{title:string;meta:string;onClick?:()=>void})=><button className="list-row" onClick={onClick}><span><b>{title}</b><small>{meta}</small></span><ChevronRight size={18}/></button>;
