import express from "express";
import passport from "passport";
import { OIDCStrategy } from "passport-azure-ad";
import jwt from "jsonwebtoken";

const router = express.Router();

const config = {
  identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
  clientID: process.env.AZURE_CLIENT_ID,
  clientSecret: process.env.AZURE_CLIENT_SECRET,
  redirectUrl: "http://localhost:5000/auth/microsoft/callback",
  responseType: "code",
  responseMode: "form_post",
  scope: ["openid", "profile", "email"],
};

// Estrategia Microsoft
passport.use(new OIDCStrategy(config,
  (iss, sub, profile, accessToken, refreshToken, done) => {
    if (!profile.oid) {
      return done(new Error("No OID found"), null);
    }
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Rutas
router.get("/microsoft",
  passport.authenticate("azuread-openidconnect", { failureRedirect: "/" })
);

router.post("/microsoft/callback",
  passport.authenticate("azuread-openidconnect", { failureRedirect: "/" }),
  (req, res) => {
    // Generar token JWT para frontend
    const token = jwt.sign(
      { email: req.user._json.email, name: req.user.displayName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

export default router;
