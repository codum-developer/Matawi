export default class SoundManager {
    constructor() {
        this.sounds = new Map();
        this.audioContext = null;
        this.isMuted = false;
    }

    /**
     * Charge un son
     * @param {string} name - Nom du son
     * @param {string} source - Chemin du fichier audio
     * @param {boolean} loop - Si le son boucle
     */
    async load(name, source, loop = false) {
        try {
            const audio = new Audio(source);
            audio.loop = loop;
            audio.preload = 'auto';
            
            // Attendre que le son soit chargé
            await new Promise((resolve, reject) => {
                audio.addEventListener('canplaythrough', resolve);
                audio.addEventListener('error', reject);
            });
            
            this.sounds.set(name, audio);
            console.log(`Son chargé: ${name}`);
        } catch (error) {
            console.error(`Erreur chargement son ${name}:`, error);
        }
    }

    /**
     * Joue un son
     * @param {string} name - Nom du son à jouer
     */
    play(name) {
        if (this.isMuted || !this.sounds.has(name)) return;
        
        const audio = this.sounds.get(name);
        
        // Pour rejouer depuis le début si déjà en cours
        audio.currentTime = 0;
        
        // Gestion des promesses pour éviter les erreurs
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn(`Erreur lecture audio ${name}:`, error);
            });
        }
    }

    /**
     * Arrête un son
     * @param {string} name - Nom du son à arrêter
     */
    stop(name) {
        if (this.sounds.has(name)) {
            const audio = this.sounds.get(name);
            audio.pause();
            audio.currentTime = 0;
        }
    }

    /**
     * Mute/Unmute tous les sons
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.sounds.forEach(audio => {
            audio.muted = this.isMuted;
        });
        return this.isMuted;
    }

    /**
     * Définit le volume pour tous les sons
     * @param {number} volume - Volume entre 0 et 1
     */
    setVolume(volume) {
        this.sounds.forEach(audio => {
            audio.volume = Math.max(0, Math.min(1, volume));
        });
    }
}