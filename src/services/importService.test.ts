import{readFileSync}from'node:fs';
import{beforeEach,describe,expect,it}from'vitest';
import{db,initializeDatabase}from'../database/db';
import{commitImport,parseWorkbook}from'./importService';
const workbook=()=>{const bytes=readFileSync('Gymrats_Planilha_Treino_ABC.xlsx');return Uint8Array.from(bytes).buffer};
describe('importação XLSX',()=>{
 beforeEach(async()=>{await db.delete();await db.open();await initializeDatabase()});
 it('lê a planilha fornecida e identifica duplicatas',async()=>{const rows=await parseWorkbook(workbook());expect(rows).toHaveLength(20);expect(rows.every(r=>r.errors.length===0)).toBe(true);expect(rows.every(r=>r.duplicateId)).toBe(true)});
 it('arquivo inválido não altera os dados',async()=>{const before=await db.exercises.count();await expect(parseWorkbook(new Uint8Array([1,2,3]).buffer)).rejects.toThrow();expect(await db.exercises.count()).toBe(before)});
 it('importação preserva sessões existentes',async()=>{await db.sessions.add({id:'history-1',letter:'A',startedAt:'2026-01-01',completedAt:'2026-01-01',status:'completed',exercises:[]});const rows=await parseWorkbook(workbook());await commitImport(rows,'update');expect(await db.sessions.get('history-1')).toBeDefined()});
});
