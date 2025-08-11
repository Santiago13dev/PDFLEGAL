//registrar usuario, login, devolver perfil.
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ok, fail } from "../utils/response.js";
import { logEvent } from '../services/audit.js'

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return fail(res, "Todos los campos son obligatorios");
    const exists = await User.findOne({ email });
    if (exists) return fail(res, "Email ya registrado");
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    return ok(res, { user: { id: user._id, name, email } }, 201);
  } catch (e) {
    return fail(res, e.message || "Error registro", 500);
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return fail(res, "Credenciales inválidas", 401);
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return fail(res, "Credenciales inválidas", 401);
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    await logEvent({ userId: user._id, event: 'AUTH_LOGIN' })
    return ok(res, { token, user: { id: user._id, name: user.name, email } });
  } catch (e) {
    return fail(res, e.message || "Error login", 500);
  }
}
