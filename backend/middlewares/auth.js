import jwt from 'jsonwebtoken';
import { fail } from '../utils/response.js';
export function requireAuth(req,res,next){ try{ const auth=req.headers.authorization||''; const token=auth.startsWith('Bearer ')?auth.slice(7):null; if(!token) return fail(res,'Token requerido',401); const data=jwt.verify(token, process.env.JWT_SECRET); req.user={id:data.id,email:data.email}; next(); }catch(e){ return fail(res,'Token inválido',401); } }
