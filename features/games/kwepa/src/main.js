import SoundManager from './SoundManager.js';
import Game from './Game.js';

class App {
    constructor() {
        this.soundManager = new SoundManager();
        this.game = new Game('game-canvas');
        
        this.init();
    }

    async init() {
        try {
            // Charger les sons
            await this.soundManager.load('background', './assets/sounds/background.mp3', true);
            await this.soundManager.load('shoot', './assets/sounds/shoot.wav');
            
            // Démarrer le son d'ambiance
            this.soundManager.play('background');
            
            // Démarrer le jeu
            this.game.start();
            
            // Écouter les tirs pour jouer le son
            const originalCreateBullet = this.game.createBullet.bind(this.game);
            this.game.createBullet = () => {
                originalCreateBullet();
                this.soundManager.play('shoot');
            };
            
            console.log('Application initialisée avec succès');
            
        } catch (error) {
            console.error('Erreur initialisation:', error);
            alert('Erreur lors du chargement du jeu. Vérifiez la console.');
        }
    }
}

// Démarrer l'application quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new App();
});