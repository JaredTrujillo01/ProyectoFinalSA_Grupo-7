const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 1️⃣ Verificar que exista el header
    if (!authHeader) {
        return res.status(401).json({ message: "No se proporcionó el token" });
    }

    // 2️⃣ Verificar que tenga formato "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Formato de token inválido" });
    }

    const token = parts[1];

    // 3️⃣ Verificar que el token no esté vacío
    if (!token) {
        return res.status(401).json({ message: "Token vacío" });
    }

    try {
        // 4️⃣ Verificar el token con el secreto correcto
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos la información del usuario en req.user
        req.user = decoded;

        console.log("Token validado correctamente:", req.user);

        next();
    } catch (error) {
        console.error("Error al verificar JWT:", error.message);
        return res.status(401).json({ message: "Token inválido", error: error.message });
    }
};
