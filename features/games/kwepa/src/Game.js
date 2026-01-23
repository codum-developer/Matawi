export default class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Initialisation des propriétés
        this.gameObjects = {};
        this.bullets = [];
        this.animationId = null;
        this.isGameOver = false;
        this.isRunning = false;
        this.lastTime = 0;
        this.bulletCounter = 0;
        this.bulletInterval = 20; // Toutes les 20 frames
        this.bulletSpeed = 5;
        
        // Configuration
        this.setupCanvas();
        this.createGameObjects();
        this.setupEventListeners();
        
        console.log('Jeu initialisé');
    }

    setupCanvas() {
        const updateCanvasSize = () => {
            const container = this.canvas.parentElement;
            this.canvas.width = container.clientWidth;
            this.canvas.height = container.clientHeight;
            
            // Recentre le robot si le canvas change de taille
            if (this.gameObjects.robot) {
                this.gameObjects.robot.x = this.canvas.width / 2;
            }
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
    }

    createGameObjects() {
        // Robot
        this.gameObjects.robot = {
            x: this.canvas.width / 2,
            y: 50,
            width: 50,
            height: 50,
            isMoving: false,
            angle: 0
        };

        // Cible (touch point)
        this.gameObjects.target = {
            x: this.canvas.width - 25,
            y: this.canvas.height / 2,
            radius: 30,
            color: '#52EF52',
            health: 20,
            score: 0
        };
    }

    setupEventListeners() {
        // Événements tactiles
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.updateTargetPosition(e.touches[0]);
            this.canShoot = true;
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.updateTargetPosition(e.touches[0]);
        }, { passive: false });

        this.canvas.addEventListener('touchend', () => {
            this.gameObjects.target.color = '#52EF52';
        });

        // Événements souris (pour le desktop)
        this.canvas.addEventListener('mousedown', (e) => {
            this.updateTargetPosition(e);
            this.canShoot = true;
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) { // Bouton gauche enfoncé
                this.updateTargetPosition(e);
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.gameObjects.target.color = '#52EF52';
        });

        // Boutons de contrôle
        document.getElementById('btn-avancer').addEventListener('click', () => {
            this.gameObjects.robot.isMoving = true;
        });

        document.getElementById('btn-arreter').addEventListener('click', () => {
            this.gameObjects.robot.isMoving = false;
        });
    }

    updateTargetPosition(touch) {
        const rect = this.canvas.getBoundingClientRect();
        this.gameObjects.target.x = touch.clientX - rect.left;
        this.gameObjects.target.y = touch.clientY - rect.top;
    }

    update(deltaTime) {
        if (this.isGameOver) return;

        const robot = this.gameObjects.robot;
        const target = this.gameObjects.target;

        // Calcul de l'angle robot → cible
        const dx = target.x - robot.x;
        const dy = target.y - robot.y;
        robot.angle = Math.atan2(dy, dx);

        // Déplacement du robot
        if (robot.isMoving) {
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = 2;
            
            if (distance > robot.width / 2 + 20) {
                robot.x += Math.cos(robot.angle) * speed;
                robot.y += Math.sin(robot.angle) * speed;
            }
        }

        // Tir de balles
        if (this.canShoot) {
            this.bulletCounter++;
            
            if (this.bulletCounter >= this.bulletInterval) {
                this.createBullet();
                this.bulletCounter = 0;
                
                // Augmentation progressive de la difficulté
                if (target.score % 10 === 0 && this.bulletInterval > 10) {
                    this.bulletInterval -= 0.5;
                    this.bulletSpeed += 0.2;
                }
            }
        }

        // Mise à jour des balles
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            
            bullet.x += Math.cos(bullet.angle) * bullet.speed;
            bullet.y += Math.sin(bullet.angle) * bullet.speed;
            
            // Vérifier collision avec la cible
            if (this.checkCollision(bullet, target)) {
                this.bullets.splice(i, 1);
                target.color = 'red';
                target.health--;
                
                if (target.health <= 0) {
                    this.gameOver();
                }
                continue;
            }
            
            // Vérifier si la balle sort de l'écran
            if (bullet.x < 0 || bullet.x > this.canvas.width || 
                bullet.y < 0 || bullet.y > this.canvas.height) {
                this.bullets.splice(i, 1);
                target.score++;
                target.color = '#52EF52';
            }
            
            // Décrémenter la durée de vie
            bullet.lifeTime -= deltaTime;
            if (bullet.lifeTime <= 0) {
                this.bullets.splice(i, 1);
            }
        }
    }

    createBullet() {
        const robot = this.gameObjects.robot;
        const distanceFromCenter = robot.width / 2 + 25;
        
        this.bullets.push({
            x: robot.x + Math.cos(robot.angle) * distanceFromCenter,
            y: robot.y + Math.sin(robot.angle) * distanceFromCenter,
            angle: robot.angle,
            radius: 5,
            speed: this.bulletSpeed,
            lifeTime: 2000 // 2 secondes
        });
    }

    checkCollision(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < circle1.radius + circle2.radius;
    }

    draw() {
        const ctx = this.ctx;
        const robot = this.gameObjects.robot;
        const target = this.gameObjects.target;
        
        // Effacer l'écran
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // UI - Vie et Score
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left';
        
        const lifeText = `Vie : ${target.health}`;
        const scoreText = `Score : ${target.score}`;
        
        ctx.fillText(lifeText, 20, 30);
        const lifeTextWidth = ctx.measureText(lifeText).width;
        ctx.fillText(scoreText, lifeTextWidth + 40, 30);
        
        // Dessiner la cible
        ctx.fillStyle = target.color;
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        
        // Dessiner le robot
        ctx.save();
        ctx.translate(robot.x, robot.y);
        ctx.rotate(robot.angle);
        
        // Corps du robot
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-robot.width / 2, -robot.height / 2, robot.width, robot.height);
        
        // Avant du robot (nez)
        ctx.fillStyle = '#3498db';
        ctx.fillRect(robot.width / 2 - 10, -5, 20, 10);
        
        ctx.restore();
        
        // Dessiner les balles
        ctx.fillStyle = '#FFDC03';
        this.bullets.forEach(bullet => {
            ctx.beginPath();
            ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Écran de Game Over
        if (this.isGameOver) {
            ctx.fillStyle = 'rgba(231, 76, 60, 0.9)';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 40px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 30);
            
            ctx.font = '24px Arial';
            ctx.fillText(`Score final: ${target.score}`, this.canvas.width / 2, this.canvas.height / 2 + 30);
        }
    }

    gameLoop(currentTime) {
        const deltaTime = currentTime - (this.lastTime || currentTime);
        this.lastTime = currentTime;
        this.update(deltaTime);
        this.draw();
        
        if (!this.isGameOver) {
            this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
        }
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isGameOver = false;
        console.log('Jeu démarré');
        this.gameLoop(0);
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.isRunning = false;
    }

    gameOver() {
        this.isGameOver = true;
        this.stop();
        console.log('Game Over - Score:', this.gameObjects.target.score);
    }

    reset() {
        this.stop();
        this.bullets = [];
        this.isGameOver = false;
        this.isRunning = false;
        this.bulletCounter = 0;
        this.bulletInterval = 20;
        this.bulletSpeed = 5;
        this.createGameObjects();
        console.log('Jeu réinitialisé');
    }
}