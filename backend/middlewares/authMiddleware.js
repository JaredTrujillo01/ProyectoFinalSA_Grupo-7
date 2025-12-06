const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "No se proporcionó el token" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guarda el id y rol del usuario en req.user
        req.user = decoded;
        
        console.log('Token validado:', req.user);
        
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido", error: error.message });
    }
};
