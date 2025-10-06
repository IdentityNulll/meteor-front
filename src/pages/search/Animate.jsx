import React, { useEffect, useRef, useState } from "react";

const Animate = () => {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const body = document.body;

    // Body theme qo‘llash
    if (theme === "light") {
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
    } else {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
    }

    // Canvas o‘lchami
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse pozitsiyasi
    let mouse = { x: null, y: null, radius: 250 };
    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    // Touch eventlar
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Particle klass
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color =
          theme === "light"
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.8)";
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= 0 || this.x >= canvas.width) {
          this.speedX = -this.speedX;
        }
        if (this.y <= 0 || this.y >= canvas.height) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Zarralar
    const particles = [];
    const adjustParticleCount = () => {
      const width = window.innerWidth;
      if (width < 480) return 15;
      if (width < 768) return 20;
      return 30;
    };
    const createParticles = () => {
      particles.length = 0;
      const count = adjustParticleCount();
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    createParticles();
    window.addEventListener("resize", createParticles);

    // Connect particles
    const connectParticles = () => {
      let opacityValue = 1;
      const isLightTheme = theme === "light";
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = Math.sqrt(
            Math.pow(particles[a].x - particles[b].x, 2) +
              Math.pow(particles[a].y - particles[b].y, 2)
          );
          if (distance < 200) {
            opacityValue = 1 - distance / 200;
            const color = isLightTheme
              ? `rgba(0, 0, 0, ${opacityValue})`
              : `rgba(255, 255, 255, ${opacityValue})`;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
          if (mouse.x != null && mouse.y != null) {
            let mouseDistance = Math.sqrt(
              Math.pow(particles[a].x - mouse.x, 2) +
                Math.pow(particles[a].y - mouse.y, 2)
            );
            if (mouseDistance < mouse.radius) {
              opacityValue = 1 - mouseDistance / mouse.radius;
              const color = isLightTheme
                ? `rgba(0, 0, 0, ${opacityValue})`
                : `rgba(255, 255, 255, ${opacityValue})`;
              ctx.strokeStyle = color;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    // Animate
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

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </>
  );
};

export default Animate;
