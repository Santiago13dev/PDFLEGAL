import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ok, fail } from "../utils/response.js";
import { logEvent } from "../services/audit.js";

export async function register(req, res) {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) return fail(res, "Todos los campos son obligatorios", 400);
    email = String(email).trim().toLowerCase();

    const exists = await User.findOne({ email });
    if (exists) return fail(res, "Email ya registrado", 409);

    // 👇 guarda en "password"
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    return ok(res, { user: { id: user._id, name: user.name, email: user.email } }, 201);
  } catch (e) {
    console.error("REGISTER ERROR:", e);
    return fail(res, e.message || "Error registro", 500);
  }
}

export async function login(req, res) {
  try {
    let { email, password } = req.body;
    if (!email || !password) return fail(res, "Email y contraseña son obligatorios", 400);
    email = String(email).trim().toLowerCase();

    // 👇 trae el hash porque es select:false
    const user = await User.findOne({ email }).select("+password");
    if (!user) return fail(res, "Credenciales inválidas", 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return fail(res, "Credenciales inválidas", 401);

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    await logEvent({ userId: user._id, event: "AUTH_LOGIN" });

    return ok(res, { token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return fail(res, e.message || "Error login", 500);
  }
}
