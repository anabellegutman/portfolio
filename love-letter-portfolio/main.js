const MainScene = {
    key: 'MainScene',
    preload: function () {
      this.load.image('background', 'assets/above-ground2.png');
      this.load.image('player', 'assets/Anabelle.png');
      this.load.image('partner', 'assets/Gregor.png');
    },
    
    create: function () {
      let dialogueIndex = 0;
      let dialogue = [
        { speaker: "PARTNER", text: "Wow, it's beautiful out tonight..." },
        { speaker: "PLAYER", text: "Yeah... I'm so glad we're doing this together." },
        { speaker: "PARTNER", text: "Me too! I'm so glad you decided you want to go cave exploring!" },
        { speaker: "PLAYER", text: "Dude I'm so excited! I'm kind of scared though..." },
        { speaker: "PARTNER", text: "Awww don't be scared, I've got you :)" },
        { speaker: "PLAYER", text: "Hehe true, I know it'll be really awesome!" },
        { speaker: "PARTNER", text: "Ready to go?" },
        { speaker: "PLAYER", text: "Let's do it!" }
      ];
    
      let dialogueText;
      let nameText;
      let textBox;
      let canClick = true;
    
      // Background
      const bg = this.add.image(0, 0, 'background').setOrigin(0);
      bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
    
      // Characters
      this.add.image(270, 520, 'player').setScale(14);
      this.add.image(790, 500, 'partner').setScale(16);
    
      // Text box background
      textBox = this.add.rectangle(200, 200, 300, 120, 0x000000, 0.6).setStrokeStyle(2, 0xffffff).setOrigin(0.5);
    
      // Name and dialogue text
      nameText = this.add.text(60, 160, '', { font: '20px monospace', fill: '#fff' });
      dialogueText = this.add.text(60, 190, '', { font: '18px monospace', fill: '#fff', wordWrap: { width: 300 } });
    
      // Start first dialogue
      showNextDialogue.call(this);
    
      // Click anywhere to advance dialogue
      this.input.on('pointerdown', () => {
        if (canClick) {
          canClick = false;
          this.time.delayedCall(100, () => {
            showNextDialogue.call(this);
            canClick = true;
          });
        }
      });
  
      function showNextDialogue() {
        if (dialogueIndex < dialogue.length) {
          const line = dialogue[dialogueIndex];
          nameText.setText(line.speaker);
          dialogueText.setText(line.text);
          dialogueIndex++;
        } else {
          this.scene.start('EntranceScene'); // Transition to EntranceScene
        }
      }
    },
  
    update: function () {
    }
  };
  
  // Entrance Scene (Cave Entrance)
  const EntranceScene = {
    key: 'EntranceScene',
    preload: function () {
      this.load.image('entrance', 'assets/entrance.png');
      this.load.image('player', 'assets/Anabelle.png');
      this.load.image('partner', 'assets/Gregor.png');
      this.load.image('a-backpack', 'assets/a_backpack.png');
      this.load.image('g-backpack', 'assets/g_backpack.png');
    },
  
    create: function () {
      const bg = this.add.image(0, 0, 'entrance').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
      this.add.image(680, 530, 'player').setScale(16);
      this.add.image(890, 500, 'partner').setScale(18);
      this.add.image(280, 650, 'a-backpack').setScale(10);
      this.add.image(100, 650, 'g-backpack').setScale(11);
      
      let dialogueIndex = 0;
      let dialogue = [
        { speaker: "PLAYER", text: "Woah that was a tight squeeze!" },
        { speaker: "PARTNER", text: "Yeah, everyone tries to make it as difficult as possible to get here haha." },
        { speaker: "PLAYER", text: "Haha figures." },
        { speaker: "PARTNER", text: "Okay so where do you want to go?" }
      ];
    
      let nameText = this.add.text(50, 60, '', { font: '18px monospace', fill: '#fff' });
      let dialogueText = this.add.text(50, 90, '', { font: '16px monospace', fill: '#fff', wordWrap: { width: 500 } });
    
      let canClick = true;
      textBox = this.add.rectangle(270, 100, 480, 100, 0x000000, 0.2).setStrokeStyle(2, 0xffffff).setOrigin(0.5);
    
      function showNextDialogue() {
        if (dialogueIndex < dialogue.length) {
          const line = dialogue[dialogueIndex];
          nameText.setText(line.speaker);
          dialogueText.setText(line.text);
          dialogueIndex++;
        } else {
          this.scene.start('MapScene');
        }
      }
    
      showNextDialogue.call(this);
    
      this.input.on('pointerdown', () => {
        if (canClick) {
          canClick = false;
          this.time.delayedCall(100, () => {
            showNextDialogue.call(this);
            canClick = true;
          });
        }
      });
    },
  
    update: function () {
    }
  };

  // MapScene
  const MapScene = {
    key: 'MapScene',
    preload: function () {
      this.load.image('map', 'assets/map.png');
    },
  
    create: function () {
      const map = this.add.image(0, 0, 'map')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      const bubbleStyle = {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 10, y: 5 }
      };
  
      const createRoomLabel = (x, y, label, targetScene) => {
        const bubble = this.add.text(x, y, label, bubbleStyle).setInteractive();
        bubble.on('pointerover', () => {
          bubble.setStyle({ fill: '#ff0000' });
        });
        bubble.on('pointerout', () => {
          bubble.setStyle({ fill: '#ffffff' });
        });
        bubble.on('pointerdown', () => {
          console.log(`${label} clicked!`);
          this.scene.start(targetScene);
        });
      };
  
      createRoomLabel(280, 300, 'INFERNO', 'FlashlightScene');
      createRoomLabel(600, 640, 'HEARTSTONE HOLLOW', 'Room2Scene');
      createRoomLabel(750, 200, 'AMETHYST GROTTO', 'HallApproach');
      createRoomLabel(120, 680, 'EXIT', 'GetOut');
      createRoomLabel(650, 430, 'CABINET OF CURIOSITIES', 'Cabinet');
    },
  
    update: function () {}
  };
  
  // FlashlightScene
  const FlashlightScene = {
    key: 'FlashlightScene',
    preload: function () {
      this.load.image('flashlight', 'assets/flashlight.png');
    },
    create: function () {
      this.add.image(0, 0, 'flashlight').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      const bubble = this.add.text(400, 750, "Oooo what's that in the distance?", {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 }
      });
  
      this.input.once('pointerdown', () => {
        this.scene.start('SkullScene');
      });
    }
  };
  
  // SkullScene
  const SkullScene = {
    key: 'SkullScene',
    preload: function () {
      this.load.image('skull', 'assets/skull.png');
    },
    create: function () {
      this.add.image(0, 0, 'skull').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      const bubble = this.add.text(350, 700, "Oh my god it's a skull!", {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 }
      });
  
      this.input.once('pointerdown', () => {
        this.scene.start('Room1Scene');
      });
    }
  };  
  
  // Hell
  const Room1Scene = {
    key: 'Room1Scene',
    preload: function () {
      this.load.image('room1bg', 'assets/lenfer.png');
      this.load.image('player', 'assets/Anabelle.png');
      this.load.image('partner', 'assets/Gregor.png');
      this.load.image('letter_crack', 'assets/letter4.png'); // The clickable box
    },
    create: function () {
      this.add.image(0, 0, 'room1bg')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      this.add.image(350, 520, 'player').setScale(14);
      this.add.image(700, 500, 'partner').setScale(16);
  
  
      const dialogueLines = [
        "PARTNER: Welcome to hell!",
        "PLAYER: Woah this place is crazy! So many bones!",
        "PLAYER: Wait... look over there.",
        "PARTNER: What is it?",
        "PLAYER: Something's sticking out of the wall..."
      ];
  
      let dialogueIndex = 0;
      const dialogueBox = this.add.text(70, 100, dialogueLines[dialogueIndex], {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 },
        wordWrap: { width: 400 }
      });
  
      let boxSprite;
  
      this.input.on('pointerdown', () => {
        dialogueIndex++;
        if (dialogueIndex < dialogueLines.length) {
          dialogueBox.setText(dialogueLines[dialogueIndex]);
        } else if (!boxSprite) {
          dialogueBox.setText("Click the letter...");
          boxSprite = this.add.image(550, 300, 'letter_crack').setInteractive().setScale(3);
          boxSprite.on('pointerdown', () => {
            this.scene.start('LetterScene');
          });
        }
      });
    }
  };

  // LetterScene
  const LetterScene = {
    key: 'LetterScene',
    preload: function () {
      this.load.image('letter', 'assets/letter-hand.png');
    },
    create: function () {
      this.add.image(0, 0, 'letter')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
  
      this.input.once('pointerdown', () => {
        this.scene.start('MapScene');
      });
    }
  };
  
  
  // Coeur
  const Room2Scene = {
    key: 'Room2Scene',
    preload: function () {
      this.load.image('room2bg', 'assets/coeur1.png');
      this.load.image('player_sit', 'assets/Anabelle_sit.png');
      this.load.image('partner_sit', 'assets/Greg_sit.png');
      this.load.image('beer', 'assets/beer.png');
    },
    create: function () {
      this.add.image(0, 0, 'room2bg')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      this.add.image(350, 430, 'player_sit').setScale(14);
      this.add.image(700, 430, 'partner_sit').setScale(16);
      this.add.image(220, 570, 'beer').setScale(3);
      this.add.image(820, 530, 'beer').setScale(3);
  
      const dialogueLines = [
        "PLAYER: I think it's about time we crack our beers.",
        "PARTNER: Yeah definitely, cheers!",
        "PARTNER: Wanna see something cool?",
        "PLAYER: Always!",
        "PARTNER: Come sit by me and turn off your headlamp."
      ];
  
      let dialogueIndex = 0;
      const dialogueBox = this.add.text(200, 700, dialogueLines[dialogueIndex], {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 },
        wordWrap: { width: 600 }
      });
  
      this.input.on('pointerdown', () => {
        dialogueIndex++;
        if (dialogueIndex < dialogueLines.length) {
          dialogueBox.setText(dialogueLines[dialogueIndex]);
        } else {
          dialogueBox.setText("");
          this.time.delayedCall(500, () => {
            this.scene.start('CoeurDark');
          });
        }
      });
    }
  };
  

  // CoeurDark
  const CoeurDark = {
    key: 'CoeurDark',
    preload: function () {
      this.load.image('coeur2', 'assets/coeur2.png');
      this.load.image('player_sit', 'assets/Anabelle_sit.png');
      this.load.image('partner_sit', 'assets/Greg_sit.png');
      this.load.image('beer', 'assets/beer.png');
      this.load.image('kiss', 'assets/kiss.png');
      this.load.image('mushroom', 'assets/mushroom.png');
    },
    create: function () {
      this.add.image(0, 0, 'coeur2')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      const player = this.add.image(850, 430, 'player_sit').setScale(14);
      const partner = this.add.image(700, 430, 'partner_sit').setScale(16);
  
      this.add.image(220, 570, 'beer').setScale(3);
      this.add.image(320, 530, 'beer').setScale(3);
  
      const dialogueLines = [
        "PLAYER: Woah... it's beautiful.",
        "PARTNER: I know right?",
        "PLAYER: This is so cute...",
        "PARTNER: No you :)"
      ];
  
      let dialogueIndex = 0;
      const dialogueBox = this.add.text(200, 700, dialogueLines[dialogueIndex], {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 },
        wordWrap: { width: 600 }
      });
  
      this.input.on('pointerdown', () => {
        dialogueIndex++;
  
        if (dialogueIndex < dialogueLines.length) {
          dialogueBox.setText(dialogueLines[dialogueIndex]);
        } else {
          dialogueBox.setText("");
  
          player.setVisible(false);
          partner.setVisible(false);
  
          this.add.image(720, 430, 'kiss').setScale(15).setOrigin(0.5);
          this.add.image(650, 390, 'mushroom').setScale(2).setOrigin(0.5);
  
          this.input.once('pointerdown', () => {
            this.scene.start('MapScene');
          });
        }
      });
    }
  };

  // HallApproach
  const HallApproach = {
    key: 'HallApproach',
    preload: function () {
      this.load.image('flashlight', 'assets/flashlight.png');
    },
    create: function () {
      this.add.image(0, 0, 'flashlight').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      const bubble = this.add.text(400, 750, "Wait hold on I hear voices...", {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 }
      });
  
      this.input.once('pointerdown', () => {
        this.scene.start('People');
      });
    }
  };

  // People
  const People = {
    key: 'People',
    preload: function () {
      this.load.image('people', 'assets/bonsoir.png');
    },
    create: function () {
      this.add.image(0, 0, 'people').setOrigin(0).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      const dialogueLines = [
        "Good evening!",
        "Hello fellow explorers!",
        "Stay safe out here tonight!"
      ];
  
      let dialogueIndex = 0;
  
      const bonsoirBubble = this.add.text(750, 80, dialogueLines[0], {
        font: '18px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000cc',
        padding: { x: 8, y: 4 }
      });
  
      const mainBubble = this.add.text(100, 750, "", {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 },
        wordWrap: { width: 600 }
      }).setVisible(false);
  
      const hallwayBubble = this.add.text(100, 750, "", {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 },
        wordWrap: { width: 600 }
      }).setVisible(false);
  
      this.input.on('pointerdown', () => {
        dialogueIndex++;
  
        if (dialogueIndex === 1) {
          bonsoirBubble.setVisible(false);
          hallwayBubble.setText(dialogueLines[1]).setVisible(true);
        } else if (dialogueIndex === 2) {
          hallwayBubble.setText(dialogueLines[2]).setVisible(true);
        } else {
          this.scene.start('Room3Scene');
        }
      });
    }
  };
  

  // La Baise
  const Room3Scene = {
    key: 'Room3Scene',
    preload: function () {
      this.load.image('room3bg', 'assets/labaise.png');
      this.load.image('player_sit', 'assets/Anabelle_sit.png');
      this.load.image('partner_sit', 'assets/Greg_sit.png');
      this.load.image('demon', 'assets/demon.png');
    },
    create: function () {
      this.add.image(0, 0, 'room3bg')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      this.add.image(220, 430, 'player_sit').setScale(14);
      this.add.image(420, 400, 'partner_sit').setScale(16);
  
      const dialogueLines = [
        "PARTNER: Wow there are so many people out tonight!",
        "PLAYER: I know right! Crazy haha.",
        "PLAYER: I'm glad we were able to find a more quiet room though.",
        "PARTNER: Yeah me too! Except...",
        "PLAYER: What is it?",
        "PARTNER: I have this weird feeling that we aren't actually alone.",
        "PLAYER: ..."
      ];
  
      let dialogueIndex = 0;
      const dialogueBox = this.add.text(200, 700, dialogueLines[dialogueIndex], {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 },
        wordWrap: { width: 600 }
      });
  
      this.input.on('pointerdown', () => {
        dialogueIndex++;
        if (dialogueIndex < dialogueLines.length) {
          dialogueBox.setText(dialogueLines[dialogueIndex]);
          if (dialogueIndex === 5) {
            demonImage = this.add.image(890, 270, 'demon').setScale(5).setOrigin(0.5);
          }
        } else {
          dialogueBox.setText("");
          this.time.delayedCall(500, () => {
            this.scene.start('MapScene');
          });
        }
      });
    }
  };

  // TheEnd
  const TheEnd = {
    key: 'TheEnd',
    preload: function () {
      this.load.image('theend', 'assets/theend.png');
    },
    create: function () {
      this.add.image(0, 0, 'theend')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
  
      this.input.once('pointerdown', () => {
        this.scene.start('MapScene');
      });
    }
  };

  // Cabinet
  const Cabinet = {
    key: 'Cabinet',
    preload: function () {
      this.load.image('room4bg', 'assets/compassroom.png');
      this.load.image('player_sit', 'assets/Anabelle_sit.png');
      this.load.image('partner_sit', 'assets/Greg_sit.png');
      this.load.image('cheese', 'assets/cheese.png');
      this.load.image('baguette', 'assets/baguette.png');
    },
    create: function () {
      this.add.image(0, 0, 'room4bg')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      this.add.image(350, 430, 'player_sit').setScale(14);
      this.add.image(700, 430, 'partner_sit').setScale(16);
  
      const dialogueLines = [
        "PLAYER: Ooo this room is so cool, I love the compass!",
        "PARTNER: Me too! Wanna break out some dinner?",
        "PLAYER: Yessir!",
        "PLAYER: What did you bring this fine evening?",
        "PARTNER: I brought a baguette and some cheese! How about you?",
        "PLAYER: Yum! I brought your favorite breakfast hehe.",
        "PARTNER: Ooo breakfast for dinner! And what is my favorite breakfast?"
      ];
  
      let dialogueIndex = 0;
      const dialogueBox = this.add.text(200, 750, dialogueLines[dialogueIndex], {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 },
        wordWrap: { width: 600 }
      });
  
      this.input.on('pointerdown', () => {
        dialogueIndex++;
        if (dialogueIndex < dialogueLines.length) {
          dialogueBox.setText(dialogueLines[dialogueIndex]);
          if (dialogueIndex === 4) {
            cheeseImage = this.add.image(450, 700, 'cheese').setScale(3).setOrigin(0.5);
            baguetteImage = this.add.image(600, 700, 'baguette').setScale(7).setOrigin(0.5);
          }  
        } else {
          dialogueBox.setText("");
          this.time.delayedCall(500, () => {
            this.scene.start('PainChoco');
          });
        }
      });
    }
  };

  // PainChoco
  const PainChoco = {
    key: 'PainChoco',
    preload: function () {
      this.load.image('painchoco', 'assets/painchoco.png');
    },
    create: function () {
      this.add.image(0, 0, 'painchoco')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.add.text(500, 720, "PAIN AU CHOCOLAT!", {
            font: '60px monospace',
            fill: '#ffffff',
            backgroundColor: '#000000aa',
            padding: { x: 12, y: 6 }
          }).setOrigin(0.5);      
  
  
      this.input.once('pointerdown', () => {
        this.scene.start('CabinetPost');
      });
    }
  };

  // CabinetPost
  const CabinetPost = {
    key: 'CabinetPost',
    preload: function () {
      this.load.image('room4bg', 'assets/compassroom.png');
      this.load.image('player_sit', 'assets/Anabelle_sit.png');
      this.load.image('partner_sit', 'assets/Greg_sit.png');
    },
    create: function () {
      this.add.image(0, 0, 'room4bg')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      this.add.image(350, 430, 'player_sit').setScale(14);
      this.add.image(700, 430, 'partner_sit').setScale(16);
      this.add.image(450, 700, 'cheese').setScale(3);
      this.add.image(600, 700, 'baguette').setScale(7);
  
      const dialogueLines = [
        "PLAYER: It's PAIN AU CHOCOLAT, of course :)",
        "PARTNER: Hahaha that's so perfect!",
        "PLAYER: I thought you'd like it.",
        "PARTNER: Best dinner ever.",
      ];
  
      let dialogueIndex = 0;
      const dialogueBox = this.add.text(200, 730, dialogueLines[dialogueIndex], {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 },
        wordWrap: { width: 600 }
      });
  
      this.input.on('pointerdown', () => {
        dialogueIndex++;
        if (dialogueIndex < dialogueLines.length) {
          dialogueBox.setText(dialogueLines[dialogueIndex]);
        } else {
          this.scene.start('MapScene');
        }
      });
    }
  };
  
  // EXIT MAP
  const GetOut = {
    key: 'GetOut',
    preload: function () {
      this.load.image('denfert', 'assets/denfert.png');
      this.load.image('player', 'assets/Anabelle.png');
      this.load.image('partner', 'assets/Gregor.png');
      this.load.image('g_backpack', 'assets/g_backpack.png');
      this.load.image('a_backpack', 'assets/a_backpack.png');
    },
    create: function () {
      this.add.image(0, 0, 'denfert')
        .setOrigin(0)
        .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      this.add.image(640, 510, 'player').setScale(15);
      this.add.image(800, 500, 'partner').setScale(17);
      this.add.image(550, 700, 'a_backpack').setScale(9);
      this.add.image(930, 680, 'g_backpack').setScale(9);
  
      const dialogueLines = [
        "PLAYER: Thanks for walking me to the train station!",
        "PARTNER: It's my pleasure :)",
        "PLAYER: Awww my train is here...",
        "PARTNER: It's ok we can go exploring again tomorrow if you want!",
        "PLAYER: YES! SO DOWN!",
        "PARTNER: Hehe ok, I'll see you tomorrow then.",
        "PLAYER: Ok hehe I can't wait to check out the other rooms. Goodnight!",
        "PARTNER: Goodnight!"
      ];
  
      let dialogueIndex = 0;
      const dialogueBox = this.add.text(10, 750, dialogueLines[dialogueIndex], {
        font: '20px monospace',
        fill: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 10, y: 5 },
        wordWrap: { width: 600 }
      });
  
      this.input.on('pointerdown', () => {
        dialogueIndex++;
        if (dialogueIndex < dialogueLines.length) {
          dialogueBox.setText(dialogueLines[dialogueIndex]);
        } else {
          dialogueBox.setText("");
          this.time.delayedCall(500, () => {
            this.scene.start('TheEnd');
          });
        }
      });
    }
  };

  
  // Game Configuration
  const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 820,
    pixelArt: true,
    scene: [MainScene, EntranceScene, MapScene, FlashlightScene, SkullScene, Room1Scene, LetterScene, Room2Scene, CoeurDark, Room3Scene, HallApproach, People, GetOut, TheEnd, Cabinet, PainChoco, CabinetPost], // Add all your scenes here
  };
  
  // Create the Phaser game 
  const game = new Phaser.Game(config);
  