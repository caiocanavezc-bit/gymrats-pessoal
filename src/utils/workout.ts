import type {PerformedSet,WorkoutLetter,WorkoutSession} from '../types';
const order:WorkoutLetter[]=['A','B','C'];
export function nextLetter(sessions:Pick<WorkoutSession,'letter'|'status'|'completedAt'>[],override?:WorkoutLetter):WorkoutLetter{if(override)return override;const completed=sessions.filter(s=>s.status==='completed'&&s.completedAt).sort((a,b)=>String(a.completedAt).localeCompare(String(b.completedAt)));if(!completed.length)return'A';return order[(order.indexOf(completed.at(-1)!.letter)+1)%3]}
export const followingLetters=(start:WorkoutLetter,count=6)=>Array.from({length:count},(_,i)=>order[(order.indexOf(start)+i)%3]);
export const calculateVolume=(sets:Pick<PerformedSet,'weight'|'reps'|'completed'>[])=>sets.filter(s=>s.completed).reduce((sum,s)=>sum+(s.weight??0)*(s.reps??0),0);
export const completedSetCount=(s:WorkoutSession)=>s.exercises.flatMap(e=>e.sets).filter(x=>x.completed).length;
export const totalVolume=(s:WorkoutSession)=>s.exercises.reduce((sum,e)=>sum+calculateVolume(e.sets),0);
export const uid=()=>crypto.randomUUID();
