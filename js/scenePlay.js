var scenePlay = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function ScenePlay() {
    Phaser.Scene.call(this, { key: "scenePlay" });
  },

  init: function () {
    // Initialize game variables
    this.timerHalangan = 0;
    this.halangan = [];
    this.background = [];
    this.isGameRunning = false;
    this.score = 0;
    this.gameSpeed = 1;
    this.difficultyTimer = 0;

    // Character movement variables
    this.isInputPressed = false;
    this.characterVelocityY = 0;
    this.upwardForce = -5; // Force yang menarik karakter ke atas
    this.downwardForce = 4; // Force yang menarik karakter ke bawah saat input ditekan

    // Get screen dimensions
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;
  },

  preload: function () {
    this.load.image("chara", "assets/images/chara.png");
    this.load.image("fg_loop_back", "assets/images/fg_loop_back.png");
    this.load.image("fg_loop", "assets/images/fg_loop.png");
    this.load.image("obstc", "assets/images/obstc.png");
    this.load.image("panel_skor", "assets/images/panel_skor.png");
    this.load.audio("snd_dead", "assets/audio/dead.mp3");
    this.load.audio("snd_klik_1", "assets/audio/klik_1.mp3");
    this.load.audio("snd_klik_2", "assets/audio/klik_2.mp3");
    this.load.audio("snd_klik_3", "assets/audio/klik_3.mp3");
  },

  create: function () {
    // Get current screen dimensions
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    // Camera fade in
    this.cameras.main.fadeIn(300, 0, 0, 0);

    // Create character
    this.createCharacter();

    // Create UI
    this.createScorePanel();

    // Create sounds
    this.createSounds();

    // Create scrolling background
    this.createScrollingBackground();

    // Setup input controls
    this.setupControls();

    // Start game entrance animation
    this.startEntranceAnimation();
  },

  createCharacter() {
    // Position character relative to screen size
    const charX = this.screenWidth * 0.15;
    const charY = this.screenHeight / 2;

    this.chara = this.add.image(charX, charY, "chara");
    this.chara.setDepth(3);
    this.chara.setScale(0); // Start invisible

    // Scale character appropriately for screen size
    const characterScale = Math.min(
      this.screenWidth / 1024,
      this.screenHeight / 768
    );
    this.targetCharacterScale = characterScale;
  },

  createScorePanel() {
    // Create score panel with responsive positioning
    this.panel_score = this.add.image(
      this.screenWidth / 2,
      this.screenHeight * 0.08,
      "panel_skor"
    );
    this.panel_score.setOrigin(0.5);
    this.panel_score.setDepth(10);
    this.panel_score.setAlpha(0.8);

    // Scale panel for screen size
    const panelScale = Math.min(this.screenWidth / 1024, 1);
    this.panel_score.setScale(panelScale);

    // Create score label with responsive font size
    const fontSize = Math.min(this.screenWidth / 34, 30);
    this.label_score = this.add.text(
      this.panel_score.x + 25 * panelScale,
      this.panel_score.y,
      this.score,
      {
        fontSize: fontSize + "px",
        fill: "#ff732e",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
      }
    );
    this.label_score.setOrigin(0.5);
    this.label_score.setDepth(10);
  },

  createSounds() {
    // Create sounds with error handling
    try {
      this.snd_dead = this.sound.add("snd_dead");
      this.snd_click = [
        this.sound.add("snd_klik_1"),
        this.sound.add("snd_klik_2"),
        this.sound.add("snd_klik_3"),
      ];

      // Set volume for click sounds
      this.snd_click.forEach((sound) => {
        sound.setVolume(0.5);
      });
    } catch (error) {
      console.warn("Could not load game sounds:", error);
      this.snd_dead = null;
      this.snd_click = [];
    }
  },

  createScrollingBackground() {
    // Create responsive background width
    const bgWidth = Math.max(this.screenWidth, 1366);
    let bg_x = bgWidth / 2;

    // Create multiple background layers for seamless scrolling
    for (let i = 0; i < 3; i++) {
      const bg_awal = [];

      // Background layer
      const BG = this.add.image(bg_x, this.screenHeight / 2, "fg_loop_back");
      BG.setData("kecepatan", 2);
      BG.setDepth(0);

      // Foreground layer
      const FG = this.add.image(bg_x, this.screenHeight / 2, "fg_loop");
      FG.setData("kecepatan", 4);
      FG.setDepth(2);

      // Scale backgrounds to fit screen
      const bgScale = Math.max(
        this.screenWidth / 1366,
        this.screenHeight / 768
      );
      BG.setScale(bgScale);
      FG.setScale(bgScale);

      bg_awal.push(BG);
      bg_awal.push(FG);
      this.background.push(bg_awal);

      bg_x += bgWidth;
    }
  },

  setupControls() {
    const self = this;

    // Touch/click controls - untuk mendeteksi saat tombol ditekan
    this.input.on(
      "pointerdown",
      function (pointer) {
        self.handleInputStart();
      },
      this
    );

    // Touch/click controls - untuk mendeteksi saat tombol dilepas
    this.input.on(
      "pointerup",
      function (pointer) {
        self.handleInputEnd();
      },
      this
    );

    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  },

  handleInputStart() {
    if (!this.isGameRunning) return;

    this.isInputPressed = true;

    // Play random click sound only once when starting to press
    if (this.snd_click.length > 0) {
      const randomSound =
        this.snd_click[Math.floor(Math.random() * this.snd_click.length)];
      randomSound.play();
    }
  },

  handleInputEnd() {
    if (!this.isGameRunning) return;

    this.isInputPressed = false;
  },

  startEntranceAnimation() {
    const self = this;

    // Character entrance animation
    this.tweens.add({
      delay: 250,
      targets: this.chara,
      ease: "Back.easeOut",
      duration: 500,
      scaleX: this.targetCharacterScale,
      scaleY: this.targetCharacterScale,
      onComplete: function () {
        self.isGameRunning = true;
      },
    });
  },

  update: function () {
    // Handle screen resize
    this.handleResize();

    if (!this.isGameRunning) return;

    // Handle keyboard input
    this.handleKeyboardInput();

    // Update character physics
    this.updateCharacter();

    // Update background scrolling
    this.updateBackground();

    // Update obstacles
    this.updateObstacles();

    // Update difficulty
    this.updateDifficulty();

    // Check collisions
    this.checkCollisions();
  },

  handleResize() {
    const newWidth = this.cameras.main.width;
    const newHeight = this.cameras.main.height;

    if (newWidth !== this.screenWidth || newHeight !== this.screenHeight) {
      this.screenWidth = newWidth;
      this.screenHeight = newHeight;
      this.repositionElements();
    }
  },

  repositionElements() {
    // Reposition UI elements for new screen size
    if (this.panel_score) {
      this.panel_score.setPosition(
        this.screenWidth / 2,
        this.screenHeight * 0.08
      );
      const panelScale = Math.min(this.screenWidth / 1024, 1);
      this.panel_score.setScale(panelScale);
    }

    if (this.label_score) {
      this.label_score.setPosition(
        this.panel_score.x + 25 * this.panel_score.scaleX,
        this.panel_score.y
      );
    }
  },

  updateCharacter() {
    // Logika pergerakan karakter berdasarkan input
    if (this.isInputPressed) {
      // Saat tombol ditekan, karakter turun
      this.characterVelocityY = this.downwardForce * this.gameSpeed;
    } else {
      // Saat tombol tidak ditekan, karakter naik
      this.characterVelocityY = this.upwardForce * this.gameSpeed;
    }

    // Terapkan velocity ke posisi karakter
    this.chara.y += this.characterVelocityY;

    // Boundary checks
    const minY = this.screenHeight * 0.05; // Batas atas
    const maxY = this.screenHeight * 0.95; // Batas bawah

    if (this.chara.y > maxY) {
      this.chara.y = maxY;
      this.gameOver("hit_ground");
    }

    if (this.chara.y < minY) {
      this.chara.y = minY;
      this.gameOver("hit_ceiling");
    }
  },

  updateBackground() {
    const bgWidth = Math.max(this.screenWidth, 1366);

    for (let i = 0; i < this.background.length; i++) {
      for (let j = 0; j < this.background[i].length; j++) {
        const bgElement = this.background[i][j];
        const speed = bgElement.getData("kecepatan") * this.gameSpeed;
        bgElement.x -= speed;

        // Reset position when off screen
        if (bgElement.x <= -(bgWidth / 2)) {
          const diff = bgElement.x + bgWidth / 2;
          bgElement.x = bgWidth * 2 + bgWidth / 2 + diff;
        }
      }
    }
  },

  updateObstacles() {
    // Spawn new obstacles
    if (this.timerHalangan <= 0) {
      this.spawnObstacle();
      this.timerHalangan = Math.floor(Math.random() * 40 + 20) / this.gameSpeed;
    }
    this.timerHalangan--;

    // Update existing obstacles
    for (let i = this.halangan.length - 1; i >= 0; i--) {
      const obstacle = this.halangan[i];
      const speed = obstacle.getData("kecepatan") * this.gameSpeed;
      obstacle.x -= speed;

      // Remove off-screen obstacles
      if (obstacle.x < -200) {
        obstacle.destroy();
        this.halangan.splice(i, 1);
        continue;
      }

      // Score when passing obstacle
      if (this.chara.x > obstacle.x + 50 && obstacle.getData("status_aktif")) {
        obstacle.setData("status_aktif", false);
        this.score++;
        this.label_score.setText(this.score);
      }
    }
  },

  spawnObstacle() {
    // Calculate spawn position relative to screen
    const spawnX = this.screenWidth + 100;
    const minY = this.screenHeight * 0.1;
    const maxY = this.screenHeight * 0.8;
    const randomY = Math.floor(Math.random() * (maxY - minY) + minY);

    // Create obstacle
    const obstacle = this.add.image(spawnX, randomY, "obstc");
    obstacle.setOrigin(0, 0);
    obstacle.setData("status_aktif", true);
    obstacle.setData("kecepatan", Math.floor(Math.random() * 10 + 8));
    obstacle.setDepth(5);

    // Scale obstacle for screen size
    const obstacleScale = Math.min(
      this.screenWidth / 1024,
      this.screenHeight / 768
    );
    obstacle.setScale(obstacleScale);

    this.halangan.push(obstacle);
  },

  updateDifficulty() {
    this.difficultyTimer++;

    // Increase game speed every 10 seconds (600 frames at 60fps)
    if (this.difficultyTimer >= 600) {
      this.gameSpeed = Math.min(this.gameSpeed + 0.1, 3);
      this.difficultyTimer = 0;
    }
  },

  checkCollisions() {
    const charBounds = this.chara.getBounds();

    for (let i = this.halangan.length - 1; i >= 0; i--) {
      const obstacle = this.halangan[i];
      const obstBounds = obstacle.getBounds();

      // Check collision with more precise bounds
      if (Phaser.Geom.Rectangle.Overlaps(charBounds, obstBounds)) {
        obstacle.setData("status_aktif", false);
        this.gameOver("collision");
        break;
      }
    }
  },

  handleKeyboardInput() {
    // Handle keyboard input dengan logika yang sama
    const spacePressed = this.spacebar.isDown;
    const upPressed = this.cursors.up.isDown;
    const downPressed = this.cursors.down.isDown;

    // Untuk kontrol keyboard, kita gunakan tombol bawah untuk turun
    // dan otomatis naik saat tidak ada tombol yang ditekan
    if (downPressed || spacePressed) {
      if (!this.isInputPressed) {
        this.handleInputStart();
      }
    } else {
      if (this.isInputPressed) {
        this.handleInputEnd();
      }
    }
  },

  gameOver(reason) {
    this.isGameRunning = false;
    this.isInputPressed = false; // Reset input state

    // Play death sound
    if (this.snd_dead) {
      this.snd_dead.play();
    }

    // Stop character animation
    if (this.charaTweens) {
      this.charaTweens.stop();
    }

    // Save high score
    this.saveHighScore();

    // Game over animation
    const self = this;
    this.charaTweens = this.tweens.add({
      targets: this.chara,
      ease: "Elastic.easeOut",
      duration: 2000,
      alpha: 0,
      angle: reason === "collision" ? 360 : 0,
      scaleX: 0.5,
      scaleY: 0.5,
      onComplete: function () {
        self.returnToMenu();
      },
    });
  },

  saveHighScore() {
    try {
      const currentHighScore = parseInt(
        localStorage.getItem("highscore") || "0"
      );
      if (this.score > currentHighScore) {
        localStorage.setItem("highscore", this.score.toString());
      }
    } catch (error) {
      console.warn("Could not save high score:", error);
    }
  },

  returnToMenu() {
    // Fade out and return to menu
    this.cameras.main.fadeOut(500, 0, 0, 0);

    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start("sceneMenu");
    });
  },
});
