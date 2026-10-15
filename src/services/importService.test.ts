import{beforeEach,describe,expect,it}from'vitest';
import{db,initializeDatabase}from'../database/db';
import{commitImport,parseWorkbook,parseWorkbookRows}from'./importService';
const sheet=()=>[
 [],[],[],[],
 ['Treino','Grupo','Exercício','Séries','Repetições','Descanso (s)','RIR','Execução','Alternativa'],
 ['Treino A','Peito','Supino reto com barra',3,'6–10',120,'1-2','Movimento controlado','Supino com halteres'],
 ['Treino B','Costas','Remada de teste',4,'8-12',90,2,'Coluna neutra','Remada baixa'],
];
describe('importação XLSX',()=>{
 beforeEach(async()=>{await db.delete();await db.open();await initializeDatabase()});
 it('interpreta linhas da planilha e identifica duplicatas',async()=>{const rows=await parseWorkbookRows(sheet());expect(rows).toHaveLength(2);expect(rows.every(r=>r.errors.length===0)).toBe(true);expect(rows[0].duplicateId).toBeDefined();expect(rows[1].duplicateId).toBeUndefined();expect(rows[0].exercise.repsMin).toBe(6);expect(rows[0].exercise.repsMax).toBe(10)});
 it('arquivo inválido não altera os dados',async()=>{const before=await db.exercises.count();await expect(parseWorkbook(new Uint8Array([1,2,3]).buffer)).rejects.toThrow();expect(await db.exercises.count()).toBe(before)});
 it('importação preserva sessões existentes',async()=>{await db.sessions.add({id:'history-1',letter:'A',startedAt:'2026-01-01',completedAt:'2026-01-01',status:'completed',exercises:[]});const rows=await parseWorkbookRows(sheet());await commitImport(rows,'update');expect(await db.sessions.get('history-1')).toBeDefined()});
});
