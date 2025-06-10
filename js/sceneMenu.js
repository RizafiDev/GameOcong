var sceneMenu = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "sceneMenu" });
    this.isBtnClicked = false;
  },

  init() {
    // Get screen dimensions for responsive positioning
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;
  },

  preload() {
    this.load.image("bg_start", "assets/images/bg_start.png");
    this.load.image("btn_play", "assets/images/btn_play.png");
    this.load.image("title_game", "assets/images/title_game.png");
    this.load.image("panel_skor", "assets/images/panel_skor.png");
    this.load.audio("snd_ambience", "assets/audio/ambience.mp3");
    this.load.audio("snd_touch", "assets/audio/touch.mp3");
    this.load.audio("snd_transisi_menu", "assets/audio/transisi_menu.mp3");
  },

  create() {
    // Get current screen dimensions
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    // Setup ambient sound with error handling
    this.setupAmbientSound();

    // Create other sounds
    this.snd_touch = this.sound.add("snd_touch");
    this.snd_transisi = this.sound.add("snd_transisi_menu");

    // Get high score from localStorage with fallback
    var skorTertinggi = this.getHighScore();

    // Create UI elements
    this.createBackground();
    this.createPlayButton();
    this.createGameTitle();
    this.createScorePanel(skorTertinggi);

    // Setup interactions
    this.setupButtonInteractions();

    // Start entrance animations
    this.startEntranceAnimations();
  },

  setupAmbientSound() {
    try {
      if (snd_ambience == null) {
        snd_ambience = this.sound.add("snd_ambience");
        snd_ambience.loop = true;
        snd_ambience.setVolume(0.35);
        snd_ambience.play();
      }
    } catch (error) {
      console.warn("Could not load ambient sound:", error);
    }
  },

  getHighScore() {
    try {
      return localStorage.getItem("highscore") || 0;
    } catch (error) {
      console.warn("Could not access localStorage:", error);
      return 0;
    }
  },

  createBackground() {
    // Create responsive background
    this.background = this.add.image(
      this.screenWidth / 2,
      this.screenHeight / 2,
      "bg_start"
    );

    // Scale background to cover screen
    const scaleX = this.screenWidth / this.background.width;
    const scaleY = this.screenHeight / this.background.height;
    const scale = Math.max(scaleX, scaleY);
    this.background.setScale(scale);
  },

  createPlayButton() {
    this.btnPlay = this.add.image(
      this.screenWidth / 2,
      this.screenHeight / 2 + this.screenHeight * 0.1,
      "btn_play"
    );
    this.btnPlay.setDepth(10);
    this.btnPlay.setScale(0); // Start invisible for animation
    this.btnPlay.setInteractive({ useHandCursor: true });
  },

  createGameTitle() {
    this.titleGame = this.add.image(
      this.screenWidth / 2,
      this.screenHeight * 0.25,
      "title_game"
    );
    this.titleGame.setDepth(10);
    this.titleGame.setScale(0); // Start invisible for animation
    this.titleGame.y -= this.screenHeight * 0.5; // Start position for animation
  },

  createScorePanel(skorTertinggi) {
    // Create score panel
    this.panelSkor = this.add.image(
      this.screenWidth / 2,
      this.screenHeight - this.screenHeight * 0.15,
      "panel_skor"
    );
    this.panelSkor.setOrigin(0.5);
    this.panelSkor.setDepth(10);
    this.panelSkor.setAlpha(0.8);

    // Create score label with responsive font size
    const fontSize = Math.min(this.screenWidth / 40, 25);
    this.lblSkor = this.add.text(
      this.panelSkor.x + 25,
      this.panelSkor.y,
      "High Score : " + skorTertinggi,
      {
        fontSize: fontSize + "px",
        fill: "#ff732e",
        fontFamily: "Arial, sans-serif",
      }
    );
    this.lblSkor.setOrigin(0.5);
    this.lblSkor.setDepth(10);
  },

  setupButtonInteractions() {
    const self = this;

    // Mouse/touch over
    this.input.on(
      "gameobjectover",
      function (pointer, gameObject) {
        if (gameObject === self.btnPlay && !self.isBtnClicked) {
          self.btnPlay.setTint(0x616161);
          self.btnPlay.setScale(1.1); // Slight scale effect
        }
      },
      this
    );

    // Mouse/touch out
    this.input.on(
      "gameobjectout",
      function (pointer, gameObject) {
        if (gameObject === self.btnPlay && !self.isBtnClicked) {
          self.btnPlay.setTint(0xffffff);
          self.btnPlay.setScale(1.0);
        }
      },
      this
    );

    // Mouse/touch down
    this.input.on(
      "gameobjectdown",
      function (pointer, gameObject) {
        if (gameObject === self.btnPlay) {
          self.btnPlay.setTint(0x404040);
          self.btnPlay.setScale(0.95);
          self.isBtnClicked = true;
        }
      },
      this
    );

    // Mouse/touch up (play button clicked)
    this.input.on(
      "gameobjectup",
      function (pointer, gameObject) {
        if (gameObject === self.btnPlay && self.isBtnClicked) {
          self.btnPlay.setTint(0xffffff);
          self.btnPlay.setScale(1.0);
          self.startGame();
        }
      },
      this
    );

    // General pointer up to reset click state
    this.input.on(
      "pointerup",
      function () {
        self.isBtnClicked = false;
      },
      this
    );
  },

  startEntranceAnimations() {
    const self = this;

    // Title animation
    this.tweens.add({
      targets: this.titleGame,
      ease: "Bounce.easeOut",
      duration: 750,
      delay: 250,
      y: this.screenHeight * 0.25,
      onComplete: function () {
        self.snd_transisi.play();
      },
    });

    // Play button scale animation
    this.tweens.add({
      targets: this.btnPlay,
      ease: "Back.easeOut",
      duration: 500,
      delay: 750,
      scaleX: 1,
      scaleY: 1,
    });

    // Title scale animation
    this.tweens.add({
      targets: this.titleGame,
      ease: "Elastic.easeOut",
      duration: 750,
      delay: 1000,
      scaleX: 1,
      scaleY: 1,
    });
  },

  startGame() {
    try {
      this.snd_touch.play();

      // Fade out animation before scene transition
      this.cameras.main.fadeOut(300, 0, 0, 0);

      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.start("scenePlay");
      });
    } catch (error) {
      console.warn("Error starting game:", error);
      // Fallback to direct scene start
      this.scene.start("scenePlay");
    }
  },

  update() {
    // Handle dynamic screen resize if needed
    const newWidth = this.cameras.main.width;
    const newHeight = this.cameras.main.height;

    if (newWidth !== this.screenWidth || newHeight !== this.screenHeight) {
      this.screenWidth = newWidth;
      this.screenHeight = newHeight;
      this.repositionElements();
    }
  },

  repositionElements() {
    // Reposition elements for new screen size
    if (this.background) {
      this.background.setPosition(this.screenWidth / 2, this.screenHeight / 2);
      const scaleX = this.screenWidth / this.background.width;
      const scaleY = this.screenHeight / this.background.height;
      const scale = Math.max(scaleX, scaleY);
      this.background.setScale(scale);
    }

    if (this.btnPlay) {
      this.btnPlay.setPosition(
        this.screenWidth / 2,
        this.screenHeight / 2 + this.screenHeight * 0.1
      );
    }

    if (this.titleGame) {
      this.titleGame.setPosition(
        this.screenWidth / 2,
        this.screenHeight * 0.25
      );
    }

    if (this.panelSkor) {
      this.panelSkor.setPosition(
        this.screenWidth / 2,
        this.screenHeight - this.screenHeight * 0.15
      );
    }

    if (this.lblSkor) {
      this.lblSkor.setPosition(this.panelSkor.x + 25, this.panelSkor.y);
    }
  },
});
