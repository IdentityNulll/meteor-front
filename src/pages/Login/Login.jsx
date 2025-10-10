import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import api from "../../api/axios"; // ✅ import your axios instance

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [activeForm, setActiveForm] = useState("login");
  const [showPassword, setShowPassword] = useState({
    loginPassword: false,
    regPassword: false,
    confirmPassword: false,
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const canvasRef = useRef(null);

  // 🎨 Canvas animation (unchanged)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getThemeColors = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      return theme === "light"
        ? { particle: "rgba(0,0,0,0.6)", line: "rgba(0,0,0," }
        : { particle: "rgba(255,255,255,0.8)", line: "rgba(255,255,255," };
    };

    let colors = getThemeColors();
    const observer = new MutationObserver(() => {
      colors = getThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let mouse = { x: null, y: null, radius: 250 };
    const handleMouseMove = (e) => (mouse = { x: e.x, y: e.y, radius: 250 });
    const handleMouseOut = () => (mouse = { x: null, y: null });
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = () => (mouse = { x: null, y: null });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= 0 || this.x >= canvas.width) this.speedX = -this.speedX;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY = -this.speedY;
      }
      draw() {
        ctx.fillStyle = colors.particle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = [];
    const adjustParticleCount = () =>
      window.innerWidth < 480 ? 15 : window.innerWidth < 768 ? 20 : 30;

    const createParticles = () => {
      particles.length = 0;
      const count = adjustParticleCount();
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };
    createParticles();
    window.addEventListener("resize", createParticles);

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.hypot(
            particles[a].x - particles[b].x,
            particles[a].y - particles[b].y
          );
          if (distance < 200) {
            const opacityValue = 1 - distance / 200;
            ctx.strokeStyle = `${colors.line}${opacityValue})`;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
    };
  }, []);

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", {
        email: loginEmail,
        password: loginPass,
      });

      console.log("✅ Login response:", data); // 👈 log backend response

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.isAdmin) navigate("/admin");
        else navigate("/");
      }
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  // ✅ REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPass || !regConfirm) {
      alert("Fill all fields");
      return;
    }
    if (regPass !== regConfirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { data } = await api.post("/users/register", {
        username: regName,
        email: regEmail,
        password: regPass,
      });

      console.log("✅ Register response:", data); // 👈 log backend response

      alert("Registered successfully. You can now login.");
      setActiveForm("login");
      setRegName("");
      setRegEmail("");
      setRegPass("");
      setRegConfirm("");
    } catch (err) {
      console.error("❌ Register error:", err.response?.data || err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-page">
      <canvas ref={canvasRef} className="login-canvas" />
      <div className="container-login">
        <div className="form-box">
          {/* LOGIN FORM */}
          <div
            className={`form login-form ${
              activeForm === "login" ? "active" : ""
            }`}
          >
            <h2>{t("login.login")}</h2>
            <form onSubmit={handleLogin}>
              <div className="input-box">
                <input
                  type="email"
                  required
                  placeholder=" "
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <label>{t("login.email")}</label>
              </div>
              <div className="input-box">
                <input
                  type={showPassword.loginPassword ? "text" : "password"}
                  required
                  placeholder=" "
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                />
                <label>{t("login.password")}</label>
                <FontAwesomeIcon
                  icon={faEye}
                  className="toggle-password"
                  onClick={() => togglePassword("loginPassword")}
                />
              </div>
              <button type="submit" className="btn">
                {t("login.kirish")}
              </button>
              <p className="switch">
                {t("login.noAccount")}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("register");
                  }}
                >
                  {t("login.register")}
                </a>
              </p>
            </form>
          </div>

          {/* REGISTER FORM */}
          <div
            className={`form register-form ${
              activeForm === "register" ? "active" : ""
            }`}
          >
            <h2>{t("register.register")}</h2>
            <form onSubmit={handleRegister}>
              <div className="input-box">
                <input
                  type="text"
                  required
                  placeholder=" "
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
                <label>{t("register.name")}</label>
              </div>
              <div className="input-box">
                <input
                  type="email"
                  required
                  placeholder=" "
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
                <label>{t("register.email")}</label>
              </div>
              <div className="input-box">
                <input
                  type={showPassword.regPassword ? "text" : "password"}
                  required
                  placeholder=" "
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                />
                <label>{t("register.password")}</label>
                <FontAwesomeIcon
                  icon={faEye}
                  className="toggle-password"
                  onClick={() => togglePassword("regPassword")}
                />
              </div>
              <div className="input-box">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  required
                  placeholder=" "
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                />
                <label>{t("register.repeatPassword")}</label>
                <FontAwesomeIcon
                  icon={faEye}
                  className="toggle-password"
                  onClick={() => togglePassword("confirmPassword")}
                />
              </div>
              <button type="submit" className="btn">
                {t("register.registerBtn")}
              </button>
              <p className="switch">
                {t("register.haveAccount")}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveForm("login");
                  }}
                >
                  {t("register.login")}
                </a>
              </p>
            </form>
          </div>
        </div>

        <div className="img-box" />
      </div>
    </div>
  );
};

export default Login;
