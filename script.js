
      // Loading Screen
      window.addEventListener("load", () => {
        const loadingScreen = document.getElementById("loadingScreen");
        setTimeout(() => {
          loadingScreen.classList.add("hidden");
        }, 1200);
      });

      // Custom Cursor (Desktop Only)
      if (window.innerWidth > 768) {
        const cursor = document.getElementById("cursor");
        const cursorFollower = document.getElementById("cursorFollower");

        let mouseX = 0,
          mouseY = 0;
        let cursorX = 0,
          cursorY = 0;
        let followerX = 0,
          followerY = 0;

        document.addEventListener("mousemove", (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        function animateCursor() {
          const speed = 0.2;
          const followerSpeed = 0.1;

          cursorX += (mouseX - cursorX) * speed;
          cursorY += (mouseY - cursorY) * speed;

          followerX += (mouseX - followerX) * followerSpeed;
          followerY += (mouseY - followerY) * followerSpeed;

          cursor.style.transform = `translate(${cursorX - 5}px, ${
            cursorY - 5
          }px)`;
          cursorFollower.style.transform = `translate(${followerX - 15}px, ${
            followerY - 15
          }px)`;

          requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll(
          "a, button, .skill-category, .project-card, .contact-item, .tech-icon, .certification-card, .experience-card"
        );

        interactiveElements.forEach((el) => {
          el.addEventListener("mouseenter", () => {
            cursor.style.transform += " scale(2)";
            cursorFollower.style.width = "50px";
            cursorFollower.style.height = "50px";
          });

          el.addEventListener("mouseleave", () => {
            cursor.style.transform = cursor.style.transform.replace(
              " scale(2)",
              ""
            );
            cursorFollower.style.width = "30px";
            cursorFollower.style.height = "30px";
          });
        });
      }

      // Particles System
      function createParticle() {
        const particle = document.createElement("div");
        particle.className = "particle";

        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.5 + 0.2;
        const duration = Math.random() * 15 + 10;

        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.opacity = opacity;
        particle.style.animation = `particleFloat ${duration}s linear infinite`;

        document.getElementById("particles").appendChild(particle);

        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
        }, duration * 1000);
      }

      // Add particle float animation
      const style = document.createElement("style");
      style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${
                      Math.random() * 200 - 100
                    }px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
      document.head.appendChild(style);

      // Create particles
      setInterval(createParticle, 500);

      // Scroll Progress Bar
      function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.getElementById("scrollProgress").style.width =
          scrollPercent + "%";
      }

      window.addEventListener("scroll", updateScrollProgress);

      // Navbar scroll effect
      const navbar = document.getElementById("navbar");
      let lastScrollY = window.scrollY;

      window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        lastScrollY = currentScrollY;
      });

      // Active navigation link
      function updateActiveNavLink() {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-link");

        let current = "";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 150;
          if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      }

      window.addEventListener("scroll", updateActiveNavLink);

      // Smooth scrolling for navigation
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        });
      });

      // Intersection Observer for fade-in animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      // Observe all fade-in elements
      document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
      });

      // Project cards 3D tilt effect
      document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(-12px)";
        });
      });

      // Contact form submission
      document.getElementById("contactForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button[type="submit"]');
        const originalContent = button.innerHTML;

        // Loading state
        button.innerHTML = "<span>⏳</span> Sending...";
        button.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          button.innerHTML = "<span>✅</span> Message Sent!";
          button.style.background = "var(--accent)";

          setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = "";
            button.disabled = false;
            e.target.reset();
          }, 2000);
        }, 1500);
      });

      // Tech icons hover animation
      document.querySelectorAll(".tech-icon").forEach((icon, index) => {
        icon.addEventListener("mouseenter", () => {
          icon.style.animationDelay = index * 0.1 + "s";
        });
      });

      // Initialize animations
      setTimeout(() => {
        document.body.style.opacity = "1";
      }, 100);

      // Performance optimization: Throttle scroll events
      function throttle(func, limit) {
        let inThrottle;
        return function () {
          const args = arguments;
          const context = this;
          if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
          }
        };
      }

      // Apply throttling to scroll events
      window.addEventListener(
        "scroll",
        throttle(() => {
          updateScrollProgress();
          updateActiveNavLink();
        }, 16)
      ); // ~60fps
