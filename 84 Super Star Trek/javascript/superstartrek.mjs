/**
 * Super StarTrek - Feb 15, 2021
 *
 *        **** STAR TREK ****        ****
 * SIMULATION OF A MISSION OF THE STARSHIP ENTERPRISE,
 * AS SEEN ON THE STAR TREK TV SHOW.
 * ORIGIONAL PROGRAM BY MIKE MAYFIELD, MODIFIED VERSION
 * PUBLISHED IN DEC'S "101 BASIC GAMES", BY DAVE AHL.
 * MODIFICATIONS TO THE LATTER (PLUS DEBUGGING) BY BOB
 * LEEDOM - APRIL & DECEMBER 1974,
 * WITH A LITTLE HELP FROM HIS FRIENDS . . .
 * COMMENTS, EPITHETS, AND SUGGESTIONS SOLICITED --
 * SEND TO:  R. C. LEEDOM
 *           WESTINGHOUSE DEFENSE & ELECTRONICS SYSTEMS CNTR.
 *           BOX 746, M.S. 338
 *           BALTIMORE, MD  21203
 *
 * CONVERTED TO MICROSOFT 8 K BASIC 3/16/78 BY JOHN GORDERS
 * LINE NUMBERS FROM VERSION STREK7 OF 1/12/75 PRESERVED AS
 * MUCH AS POSSIBLE WHILE USING MULTIPLE STATEMENTS PER LINE
 * SOME LINES ARE LONGER THAN 72 CHARACTERS; THIS WAS DONE
 * BY USING "?" INSTEAD OF "PRINT" WHEN ENTERING LINES
 */

const gameOptions = {
  stardateStart: Math.floor(Math.random() * 20 + 20) * 100,
  timeLimit: 25 + Math.floor(Math.random() * 10),
  energyMax: 3000,
  photonTorpedoesMax: 10,
  starbaseSpawnChance: 0.96,
  enemyMaxShield: 200,
  enemySpawnChance: [0.8, 0.85, 0.98],
  nameEnemy: "KLINGON",
  nameEnemies: "KLINGONS",
  nameScienceOfficer: "SPOCK",
  nameNavigationOfficer: "LT. SULU",
  nameWeaponsOfficer: "ENSIGN CHEKOV",
  nameCommunicationsOfficer: "LT. UHURA",
  nameChiefEngineer: "SCOTT",
};

let gameState = {};
let print = () => {};
let input = () => {};
let exit = () => {};

export const setGameOptions = (options = {}) =>
  Object.assign(gameOptions, options);
export const getGameState = () => ({ ...gameState });
export const onPrint = (fn) => (print = fn);
export const onInput = (fn) => (input = fn);
export const onExit = (fn) => (exit = fn);

const randomInt = (max, min = 0) =>
  Math.floor(min + Math.random() * (max - min));

const RND = () => Math.random();
const FNR = () => Math.floor(Math.random() * 7.98 + 1.01);
const FND = (I) =>
  Math.sqrt(
    Math.pow(gameState.sectorEnemies[I][1] - gameState.sectorPositionY, 2) +
      Math.pow(gameState.sectorEnemies[I][2] - gameState.sectorPositionX, 2)
  );

const Z$ = "                         ";

const SYSTEM_WARP_ENGINES = "WARP ENGINES";
const SYSTEM_SHORT_RANGE_SENSORS = "SHORT RANGE SENSORS";
const SYSTEM_LONG_RANGE_SENSORS = "LONG RANGE SENSORS";
const SYSTEM_PHASER_CONTROL = "PHASER CONTROL";
const SYSTEM_PHOTON_TUBES = "PHOTON TUBES";
const SYSTEM_DAMAGE_CONTROL = "DAMAGE CONTROL";
const SYSTEM_SHIELD_CONTROL = "SHIELD CONTROL";
const SYSTEM_LIBRARY_COMPUTER = "LIBRARY-COMPUTER";

const shipSystems = [
  SYSTEM_WARP_ENGINES,
  SYSTEM_SHORT_RANGE_SENSORS,
  SYSTEM_LONG_RANGE_SENSORS,
  SYSTEM_PHASER_CONTROL,
  SYSTEM_PHOTON_TUBES,
  SYSTEM_DAMAGE_CONTROL,
  SYSTEM_SHIELD_CONTROL,
  SYSTEM_LIBRARY_COMPUTER,
];

export async function gameMain() {
  await gameReset();

  // 10
  print("\n".repeat(10));
  print("                                    ,------*------,");
  print("                    ,-------------   '---  ------'");
  print("                     '-------- --'      / /");
  print("                         ,---' '-------/ /--,");
  print("                          '----------------'");
  print("");
  print("                    THE USS ENTERPRISE --- NCC-1701");
  print("\n".repeat(4));

  print("YOUR ORDERS ARE AS FOLLOWS:");
  print(
    `     DESTROY THE ${gameState.enemiesRemaining} ${gameOptions.nameEnemy} WARSHIPS WHICH HAVE INVADED`
  );
  print("   THE GALAXY BEFORE THEY CAN ATTACK FEDERATION HEADQUARTERS");
  print(
    `   ON STARDATE ${
      gameOptions.stardateStart + gameOptions.timeLimit
    } THIS GIVES YOU ${gameOptions.timeLimit} DAYS.  THERE${
      gameState.starbasesRemaining > 1 ? " ARE " : " IS "
    }`
  );
  print(
    `  ${gameState.starbasesRemaining} STARBASE${
      gameState.starbasesRemaining > 1 ? "S" : " ARE"
    } IN THE GALAXY FOR RESUPPLYING YOUR SHIP`
  );
  print();
  // REM PRINT"HIT ANY KEY EXCEPT RETURN WHEN READY TO ACCEPT COMMAND"
  //I = RND(1);
  //REM IF INP(1)=13 THEN 1300

  await newQuadrantEntered();
}

async function gameReset() {
  gameState.quadrantMap = "";
  gameState.alertCondition = "";
  gameState.stardateCurrent = gameOptions.stardateStart;
  gameState.isDocked = 0;
  gameState.energyRemaining = gameOptions.energyMax;
  gameState.photonTorpedoesRemaining = gameOptions.photonTorpedoesMax;
  gameState.shieldsCurrent = 0;
  // starbasesRemaining = 2; // Bug from original?
  gameState.starbasesRemaining = 0;
  gameState.enemiesRemaining = 0;
  gameState.quadrantPositionY = FNR();
  gameState.quadrantPositionX = FNR();
  gameState.sectorPositionY = FNR();
  gameState.sectorPositionX = FNR();

  gameState.systemsDamage = {};
  for (const systemName of shipSystems) {
    gameState.systemsDamage[systemName] = 0;
  }

  gameState.sectorEnemiesCount = 0;
  gameState.sectorStarbasesCount = 0;
  gameState.sectorStarsCount = 0;

  gameState.galacticMap = [];
  gameState.galacticMapDiscovered = [];

  for (let i = 1; i <= 8; i++) {
    gameState.galacticMap[i] = [];
    gameState.galacticMapDiscovered[i] = [];
    for (let j = 1; j <= 8; j++) {
      gameState.galacticMapDiscovered[i][j] = 0;

      gameState.sectorEnemiesCount = 0;
      const R1 = Math.random();

      // 850
      if (R1 > gameOptions.enemySpawnChance[2]) {
        gameState.sectorEnemiesCount = 3;
        gameState.enemiesRemaining = gameState.enemiesRemaining + 3;
      } else if (R1 > gameOptions.enemySpawnChance[1]) {
        gameState.sectorEnemiesCount = 2;
        gameState.enemiesRemaining = gameState.enemiesRemaining + 2;
      } else if (R1 > gameOptions.enemySpawnChance[0]) {
        gameState.sectorEnemiesCount = 1;
        gameState.enemiesRemaining = gameState.enemiesRemaining + 1;
      }

      // 980
      gameState.sectorStarbasesCount = 0;
      if (Math.random() > gameOptions.starbaseSpawnChance) {
        gameState.sectorStarbasesCount = 1;
        gameState.starbasesRemaining = gameState.starbasesRemaining + 1;
      }

      // 1040
      gameState.galacticMap[i][j] =
        gameState.sectorEnemiesCount * 100 +
        gameState.sectorStarbasesCount * 10 +
        FNR(1);
    }
  }

  if (gameState.enemiesRemaining > gameOptions.timeLimit) {
    gameOptions.timeLimit = gameState.enemiesRemaining + 1;
  }

  if (gameState.starbasesRemaining === 0) {
    if (
      gameState.galacticMap[gameState.quadrantPositionY][
        gameState.quadrantPositionX
      ] < 200
    ) {
      gameState.galacticMap[gameState.quadrantPositionY][
        gameState.quadrantPositionX
      ] =
        gameState.galacticMap[gameState.quadrantPositionY][
          gameState.quadrantPositionX
        ] + 120;
    }
    gameState.enemiesRemaining = gameState.enemiesRemaining + 1;
    gameState.starbasesRemaining = 1;
    gameState.galacticMap[gameState.quadrantPositionY][
      gameState.quadrantPositionX
    ] =
      gameState.galacticMap[gameState.quadrantPositionY][
        gameState.quadrantPositionX
      ] + 10;
    gameState.quadrantPositionY = FNR(1);
    gameState.quadrantPositionX = FNR(1);
  }

  gameState.enemiesInitialCount = gameState.enemiesRemaining;
}

async function newQuadrantEntered() {
  // 1310 REM HERE ANY TIME NEW QUADRANT ENTERED
  // 1320
  gameState.sectorEnemiesCount = 0;
  gameState.sectorStarbasesCount = 0;
  gameState.sectorStarsCount = 0;
  gameState.starbaseRepairDelay = 0.5 * Math.random();
  gameState.galacticMapDiscovered[gameState.quadrantPositionY][
    gameState.quadrantPositionX
  ] =
    gameState.galacticMap[gameState.quadrantPositionY][
      gameState.quadrantPositionX
    ];

  gameState.sectorEnemies = [
    null, //TODO fix zero-index
    [],
    [],
    [],
  ];

  if (
    gameState.quadrantPositionY >= 1 &&
    gameState.quadrantPositionY <= 8 &&
    gameState.quadrantPositionX >= 1 &&
    gameState.quadrantPositionX <= 8
  ) {
    let G2$ = buildQuadrantName(
      gameState.quadrantPositionY,
      gameState.quadrantPositionX
    );
    print();
    if (gameOptions.stardateStart == gameState.stardateCurrent) {
      print("YOUR MISSION BEGINS WITH YOUR STARSHIP LOCATED");
      print("IN THE GALACTIC QUADRANT, '", G2$, "'.");
    } else {
      print("NOW ENTERING ", G2$, " QUADRANT . . .");
    }
    print();
    gameState.sectorEnemiesCount = Math.floor(
      gameState.galacticMap[gameState.quadrantPositionY][
        gameState.quadrantPositionX
      ] * 0.01
    );
    gameState.sectorStarbasesCount =
      Math.floor(
        gameState.galacticMap[gameState.quadrantPositionY][
          gameState.quadrantPositionX
        ] * 0.1
      ) -
      10 * gameState.sectorEnemiesCount;
    gameState.sectorStarsCount =
      gameState.galacticMap[gameState.quadrantPositionY][
        gameState.quadrantPositionX
      ] -
      100 * gameState.sectorEnemiesCount -
      10 * gameState.sectorStarbasesCount;

    if (gameState.sectorEnemiesCount != 0) {
      print("COMBAT AREA      CONDITION RED");
      if (gameState.shieldsCurrent <= 200) {
        print("   SHIELDS DANGEROUSLY LOW");
      }
    }

    for (let i = 1; i <= 3; i++) {
      gameState.sectorEnemies[i][1] = 0;
      gameState.sectorEnemies[i][2] = 0;
    }
  }

  for (let i = 1; i <= 3; i++) {
    gameState.sectorEnemies[i][3] = 0;
  }

  gameState.quadrantMap = Z$ + Z$ + Z$ + Z$ + Z$ + Z$ + Z$ + Z$.substr(0, 17);

  insertInStringForQuadrant(
    "<*>",
    gameState.sectorPositionY,
    gameState.sectorPositionX
  );

  if (gameState.sectorEnemiesCount >= 1) {
    // 1720
    for (let i = 1; i <= gameState.sectorEnemiesCount; i++) {
      const [R1, R2] = findEmptyPlaceInQuadrant();
      insertInStringForQuadrant("+K+", R1, R2);
      gameState.sectorEnemies[i] = [
        undefined,
        R1,
        R2,
        gameOptions.enemyMaxShield * (0.5 + RND(1)),
      ];
    }
  }

  if (gameState.sectorStarbasesCount >= 1) {
    // 1820
    const [R1, R2] = findEmptyPlaceInQuadrant();
    gameState.sectorStarbaseY = R1;
    gameState.sectorStarbaseX = R2;
    insertInStringForQuadrant(">!<", R1, R2);
  }

  for (let i = 1; i <= gameState.sectorStarsCount; i++) {
    const [R1, R2] = findEmptyPlaceInQuadrant();
    insertInStringForQuadrant(" * ", R1, R2);
  }

  // 1980 GOSUB6430
  await shortRangeSensorScanAndStartup();

  const continueCommandLoop = true;
  while (continueCommandLoop) {
    await acceptCommand();
  }
}

async function acceptCommand() {
  // 1990
  if (
    gameState.shieldsCurrent + gameState.energyRemaining <= 10 ||
    (gameState.energyRemaining < 10 &&
      gameState.systemsDamage[SYSTEM_SHIELD_CONTROL] != 0)
  ) {
    print();
    print("** FATAL ERROR **   YOU'VE JUST STRANDED YOUR SHIP IN SPACE");
    print("YOU HAVE INSUFFICIENT MANEUVERING ENERGY, AND SHIELD CONTROL");
    print("IS PRESENTLY INCAPABLE OF CROSS-CIRCUITING TO ENGINE ROOM!!");
    endOfGame();
  }

  // 2060
  const A$ = await input("COMMAND");
  // 2140
  switch (A$.toUpperCase()) {
    case "NAV": {
      await commandCourseControl();
      break;
    }
    case "SRS": {
      await shortRangeSensorScanAndStartup();
      break;
    }
    case "LRS": {
      await commandLongRangeScan();
      break;
    }
    case "PHA": {
      await commandPhaserControl();
      break;
    }
    case "TOR": {
      await commandPhotonTorpedo();
      break;
    }
    case "SHE": {
      await commandShieldControl();
      break;
    }
    case "DAM": {
      await commandDamageControl();
      break;
    }
    case "COM": {
      await commandLibraryComputer();
      break;
    }
    case "XXX": {
      return endOfGame({ showStardate: false });
    }
    case "DUMP": {
      console.log(JSON.stringify(gameState));
      break;
    }
    default: {
      print("ENTER ONE OF THE FOLLOWING:");
      print("  NAV  (TO SET COURSE)");
      print("  SRS  (FOR SHORT RANGE SENSOR SCAN)");
      print("  LRS  (FOR LONG RANGE SENSOR SCAN)");
      print("  PHA  (TO FIRE PHASERS)");
      print("  TOR  (TO FIRE PHOTON TORPEDOES)");
      print("  SHE  (TO RAISE OR LOWER SHIELDS)");
      print("  DAM  (FOR DAMAGE CONTROL REPORTS)");
      print("  COM  (TO CALL ON LIBRARY-COMPUTER)");
      print("  XXX  (TO RESIGN YOUR COMMAND)");
      print();
      // GOTO 1990
    }
  }
}

/************************************************************************/

async function shortRangeSensorScanAndStartup() {
  // 6420 REM SHORT RANGE SENSOR SCAN & STARTUP SUBROUTINE
  // 6430
  const { sectorPositionY: sY, sectorPositionX: sX } = gameState;

  gameState.isDocked = 0;
  for (let i = sY - 1; i <= sY + 1; i++) {
    for (let j = sX - 1; j <= sX + 1; j++) {
      if (i >= 1 || i <= 8 || j >= 1 || j <= 8) {
        if (stringComparisonInQuadrantArray(">!<", i, j)) {
          gameState.isDocked = 1;
          break;
        }
      }
    }
  }

  if (gameState.isDocked == 1) {
    gameState.alertCondition = "DOCKED";
    gameState.energyRemaining = gameOptions.energyMax;
    gameState.photonTorpedoesRemaining = gameOptions.photonTorpedoesMax;
    print("SHIELDS DROPPED FOR DOCKING PURPOSES");
    gameState.shieldsCurrent = 0;
  } else {
    gameState.alertCondition = "GREEN";
    if (gameState.energyRemaining < gameOptions.energyMax * 0.1)
      gameState.alertCondition = "YELLOW";
    if (gameState.sectorEnemiesCount > 0) gameState.alertCondition = "RED";
  }

  if (gameState.systemsDamage[SYSTEM_SHORT_RANGE_SENSORS] < 0) {
    // 6730
    print();
    print("*** SHORT RANGE SENSORS ARE OUT ***");
    print();
    return;
  }

  // 6770
  const O1$ = "---------------------------------";
  print(O1$);
  for (let I = 1; I <= 8; I++) {
    print(
      " " +
        gameState.quadrantMap.substring((I - 1) * 24, (I - 1) * 24 + 24) +
        [
          "",
          `        STARDATE           ${
            Math.floor(gameState.stardateCurrent * 10) * 0.1
          }`,
          `        CONDITION          ${gameState.alertCondition}`,
          `        QUADRANT           ${gameState.quadrantPositionY} , ${gameState.quadrantPositionX}`,
          `        SECTOR             ${gameState.sectorPositionY} , ${gameState.sectorPositionX}`,
          `        PHOTON TORPEDOES   ${Math.floor(
            gameState.photonTorpedoesRemaining
          )}`,
          `        TOTAL ENERGY       ${Math.floor(
            gameState.energyRemaining + gameState.shieldsCurrent
          )}`,
          `        SHIELDS            ${Math.floor(gameState.shieldsCurrent)}`,
          `        ${gameOptions.nameEnemies} REMAINING ${Math.floor(
            gameState.enemiesRemaining
          )}`,
        ][I]
    );
  }
  print(O1$);
}

async function commandCourseControl() {
  // 2290 REM COURSE CONTROL BEGINS HERE
  let C1 = parseFloat(await input("COURSE (0-9)"));
  if (C1 == 9) C1 = 1;
  if (isNaN(C1) || C1 < 1 || C1 > 9) {
    print(
      `   ${gameOptions.nameNavigationOfficer} REPORTS, 'INCORRECT COURSE DATA, SIR!'`
    );
    return;
  }

  const W1 = parseFloat(
    await input(
      `WARP FACTOR (0-${
        gameState.systemsDamage[SYSTEM_WARP_ENGINES] < 0 ? "0.2" : "8"
      })`
    )
  );
  if (W1 == 0 || isNaN(W1)) return;
  if (gameState.systemsDamage[SYSTEM_WARP_ENGINES] < 0 && W1 > 0.2) {
    return print("WARP ENGINES ARE DAMAGED.  MAXIUM SPEED = WARP 0.2");
  }
  if (W1 < 0 && W1 > 8) {
    return print(
      `   CHIEF ENGINEER ${gameOptions.nameChiefEngineer} REPORTS 'THE ENGINES WON'T TAKE WARP ${W1}!'`
    );
  }

  const sectorsToWarp = Math.floor(W1 * 8 + 0.5);
  if (gameState.energyRemaining - sectorsToWarp < 0) {
    print("ENGINEERING REPORTS   'INSUFFICIENT ENERGY AVAILABLE");
    print("                       FOR MANEUVERING AT WARP ", W1, " !'");
    if (
      gameState.shieldsCurrent > sectorsToWarp - gameState.energyRemaining &&
      gameState.systemsDamage[SYSTEM_SHIELD_CONTROL] > 0
    ) {
      print(
        "DEFLECTOR CONTROL ROOM ACKNOWLEDGES ",
        gameState.shieldsCurrent,
        " UNITS OF ENERGY"
      );
      print("                         PRESENTLY DEPLOYED TO SHIELDS.");
    }
  }

  for (let I = 1; I <= 3; I++) {
    if (gameState.sectorEnemies[I][3] > 0) {
      insertInStringForQuadrant(
        "   ",
        gameState.sectorEnemies[I][1],
        gameState.sectorEnemies[I][2]
      );
      const [R1, R2] = findEmptyPlaceInQuadrant();
      gameState.sectorEnemies[I][1] = R1;
      gameState.sectorEnemies[I][2] = R2;
      insertInStringForQuadrant(
        "+K+",
        gameState.sectorEnemies[I][1],
        gameState.sectorEnemies[I][2]
      );
    }
  }
  enemiesShoot();

  let D1 = 0;
  let D6 = W1;
  if (W1 >= 1) D6 = 1;

  for (const systemName of shipSystems) {
    if (gameState.systemsDamage[systemName] >= 0) continue;
    gameState.systemsDamage[systemName] =
      gameState.systemsDamage[systemName] + D6;
    if (
      gameState.systemsDamage[systemName] > -0.1 &&
      gameState.systemsDamage[systemName] < 0
    ) {
      gameState.systemsDamage[systemName] = -0.1;
      continue;
    }
    if (gameState.systemsDamage[systemName] < 0) continue;
    if (D1 != 1) {
      D1 = 1;
      print("DAMAGE CONTROL REPORT:");
    }
    print(`        ${systemName} REPAIR COMPLETED.`);
  }

  // 20% chance of system being damaged or repaired in warp
  if (RND() < 0.2) {
    const systemIdx = randomInt(shipSystems.length);
    const systemName = shipSystems[systemIdx];
    if (RND(1) < 0.6) {
      gameState.systemsDamage[systemName] =
        gameState.systemsDamage[systemName] - (RND(1) * 5 + 1);
      if (D1 != 1) {
        D1 = 1;
        print("DAMAGE CONTROL REPORT:");
      }
      print(`        ${systemName} DAMAGED`);
    } else {
      gameState.systemsDamage[systemName] =
        gameState.systemsDamage[systemName] + RND(1) * 3 + 1;
      if (D1 != 1) {
        D1 = 1;
        print("DAMAGE CONTROL REPORT:");
      }
      print(`        ${systemName} STATE OF REPAIR IMPROVED`);
    }
    print();
  }

  // 3060 REM BEGIN MOVING STARSHIP
  insertInStringForQuadrant(
    "   ",
    Math.floor(gameState.sectorPositionY),
    Math.floor(gameState.sectorPositionX)
  );

  const [X1, X2] = courseToXY(C1);
  let X = gameState.sectorPositionY;
  let Y = gameState.sectorPositionX;
  let Q4 = gameState.quadrantPositionY;
  let Q5 = gameState.quadrantPositionX;

  for (let I = 1; I < sectorsToWarp; I++) {
    gameState.sectorPositionY = gameState.sectorPositionY + X1;
    gameState.sectorPositionX = gameState.sectorPositionX + X2;

    if (
      gameState.sectorPositionY < 1 ||
      gameState.sectorPositionY >= 9 ||
      gameState.sectorPositionX < 1 ||
      gameState.sectorPositionX >= 9
    ) {
      // 3490 REM EXCEEDED QUADRANT LIMITS
      X = 8 * gameState.quadrantPositionY + X + sectorsToWarp * X1;
      Y = 8 * gameState.quadrantPositionX + Y + sectorsToWarp * X2;

      gameState.quadrantPositionY = Math.floor(X / 8);
      gameState.quadrantPositionX = Math.floor(Y / 8);

      gameState.sectorPositionY = Math.floor(
        X - gameState.quadrantPositionY * 8
      );
      gameState.sectorPositionX = Math.floor(
        Y - gameState.quadrantPositionX * 8
      );

      if (gameState.sectorPositionY == 0) {
        gameState.quadrantPositionY = gameState.quadrantPositionY - 1;
        gameState.sectorPositionY = 8;
      }
      if (gameState.sectorPositionX == 0) {
        gameState.quadrantPositionX = gameState.quadrantPositionX - 1;
        gameState.sectorPositionX = 8;
      }

      let X5 = 0;
      if (gameState.quadrantPositionY < 1) {
        X5 = 1;
        gameState.quadrantPositionY = 1;
        gameState.sectorPositionY = 1;
      }
      if (gameState.quadrantPositionY > 8) {
        X5 = 1;
        gameState.quadrantPositionY = 8;
        gameState.sectorPositionY = 8;
      }
      if (gameState.quadrantPositionX < 1) {
        X5 = 1;
        gameState.quadrantPositionX = 1;
        gameState.sectorPositionX = 1;
      }
      if (gameState.quadrantPositionX > 8) {
        X5 = 1;
        gameState.quadrantPositionX = 8;
        gameState.sectorPositionX = 8;
      }

      if (X5 != 0) {
        print(
          `${gameOptions.nameCommunicationsOfficer} REPORTS MESSAGE FROM STARFLEET COMMAND:`
        );
        print("  'PERMISSION TO ATTEMPT CROSSING OF GALACTIC PERIMETER");
        print("  IS HEREBY *DENIED*.  SHUT DOWN YOUR ENGINES.'");
        print(
          `CHIEF ENGINEER ${gameOptions.nameChiefEngineer} REPORTS  'WARP ENGINES SHUT DOWN`
        );
        print(
          `  AT SECTOR ${gameState.sectorPositionY} , ${gameState.sectorPositionX} OF QUADRANT ${gameState.quadrantPositionY} , ${gameState.quadrantPositionX}.'`
        );

        if (
          gameState.stardateCurrent >
          gameOptions.stardateStart + gameOptions.timeLimit
        ) {
          return endOfGame();
        }
      }

      if (
        8 * gameState.quadrantPositionY + gameState.quadrantPositionX ==
        8 * Q4 + Q5
      ) {
        break;
      }

      gameState.stardateCurrent = gameState.stardateCurrent + 1;
      maneuverEnergy(sectorsToWarp);
      return await newQuadrantEntered();
    }

    // 3240
    const S8 =
      Math.floor(gameState.sectorPositionY) * 24 +
      Math.floor(gameState.sectorPositionX) * 3 -
      26;
    if (gameState.quadrantMap.substring(S8, S8 + 2) != "  ") {
      gameState.sectorPositionY = Math.floor(gameState.sectorPositionY - X1);
      gameState.sectorPositionX = Math.floor(gameState.sectorPositionX - X2);

      print(
        `WARP ENGINES SHUT DOWN AT SECTOR ${gameState.sectorPositionY} , ${gameState.sectorPositionX} DUE TO BAD NAVAGATION`
      );
      break;
    }
  }

  gameState.sectorPositionY = Math.floor(gameState.sectorPositionY);
  gameState.sectorPositionX = Math.floor(gameState.sectorPositionX);

  insertInStringForQuadrant(
    "<*>",
    Math.floor(gameState.sectorPositionY),
    Math.floor(gameState.sectorPositionX)
  );

  maneuverEnergy(sectorsToWarp);

  let T8 = 1;
  if (W1 < 1) {
    T8 = 0.1 * Math.floor(10 * W1);
  }

  gameState.stardateCurrent = gameState.stardateCurrent + T8;
  if (
    gameState.stardateCurrent >
    gameOptions.stardateStart + gameOptions.timeLimit
  ) {
    return endOfGame();
  }

  await shortRangeSensorScanAndStartup();

  // 3470 REM SEE IF DOCKED, THEN GET COMMAND
  return acceptCommand();
}

function maneuverEnergy(sectorsToWarp) {
  // 3900 REM MANEUVER ENERGY S/R **
  gameState.energyRemaining = gameState.energyRemaining - sectorsToWarp - 10;
  if (gameState.energyRemaining >= 0) {
    return;
  }
  print("SHIELD CONTROL SUPPLIES ENERGY TO COMPLETE THE MANEUVER.");
  gameState.shieldsCurrent =
    gameState.shieldsCurrent + gameState.energyRemaining;
  gameState.energyRemaining = 0;
  if (gameState.shieldsCurrent <= 0) {
    gameState.shieldsCurrent = 0;
  }
}

async function commandLongRangeScan() {
  // 3990 REM LONG RANGE SENSOR SCAN CODE
  if (gameState.systemsDamage[SYSTEM_LONG_RANGE_SENSORS] < 0) {
    print("LONG RANGE SENSORS ARE INOPERABLE");
    return;
  }
  print(
    "LONG RANGE SCAN FOR QUADRANT ",
    gameState.quadrantPositionY,
    " , ",
    gameState.quadrantPositionX
  );
  const N = [];
  const O1$ = "-------------------";
  print(O1$);
  for (
    let I = gameState.quadrantPositionY - 1;
    I <= gameState.quadrantPositionY + 1;
    I++
  ) {
    let out = "";
    N[1] = -1;
    N[2] = -2;
    N[3] = -3;
    for (
      let J = gameState.quadrantPositionX - 1;
      J <= gameState.quadrantPositionX + 1;
      J++
    ) {
      if (I > 0 && I < 9 && J > 0 && J < 9) {
        N[J - gameState.quadrantPositionX + 2] = gameState.galacticMap[I][J];
        gameState.galacticMapDiscovered[I][J] = gameState.galacticMap[I][J];
      }
    }
    for (let L = 1; L <= 3; L++) {
      out = out + ": ";
      if (N[L] < 0) {
        out += "*** ";
      } else {
        out += ("" + N[L]).padStart(3, "0") + " ";
      }
    }
    out += ":";
    print(out);
    print(O1$);
  }
}

async function commandPhaserControl() {
  // 4250 REM PHASER CONTROL CODE BEGINS HERE
  if (gameState.systemsDamage[SYSTEM_PHASER_CONTROL] < 0) {
    print("PHASERS INOPERATIVE");
    return;
  }

  if (gameState.sectorEnemiesCount <= 0) {
    print(
      `SCIENCE OFFICER ${gameOptions.nameScienceOfficer} REPORTS  'SENSORS SHOW NO ENEMY SHIPS`
    );
    print("                                IN THIS QUADRANT'");
    return;
  }

  if (gameState.systemsDamage[SYSTEM_LIBRARY_COMPUTER] < 0) {
    print("COMPUTER FAILURE HAMPERS ACCURACY");
  }

  print(
    "PHASERS LOCKED ON TARGET;  ENERGY AVAILABLE = ",
    gameState.energyRemaining,
    " UNITS"
  );
  let X;
  const continueCommandLoop = true;
  while (continueCommandLoop) {
    X = parseFloat(await input("NUMBER OF UNITS TO FIRE"));
    if (X <= 0) return;
    if (gameState.energyRemaining - X >= 0) {
      break;
    }
    print("ENERGY AVAILABLE = ", gameState.energyRemaining, " UNITS");
  }

  gameState.energyRemaining = gameState.energyRemaining - X;

  // TODO: is this a bug? D[8] is computer, D[7] is shields - but D[7] is what was in the original source!
  if (gameState.systemsDamage[SYSTEM_SHIELD_CONTROL] < 0) {
    X = X * Math.random();
  }

  let H1 = Math.floor(X / gameState.sectorEnemiesCount);

  for (let I = 1; I <= 3; I++) {
    if (gameState.sectorEnemies[I][3] <= 0) {
      continue;
    }
    let H = Math.floor((H1 / FND(I)) * (RND(1) + 2));
    if (H <= 0.15 * gameState.sectorEnemies[I][3]) {
      print(
        "SENSORS SHOW NO DAMAGE TO ENEMY AT ",
        gameState.sectorEnemies[I][1],
        " , ",
        gameState.sectorEnemies[I][2]
      );
      continue;
    }
    gameState.sectorEnemies[I][3] = gameState.sectorEnemies[I][3] - H;

    print(
      `${H} UNIT HIT ON ${gameOptions.nameEnemy} AT SECTOR ${gameState.sectorEnemies[I][1]} , ${gameState.sectorEnemies[I][2]}`
    );
    if (gameState.sectorEnemies[I][3] <= 0) {
      print(`*** ${gameOptions.nameEnemy} DESTROYED ***`);
      gameState.sectorEnemiesCount = gameState.sectorEnemiesCount - 1;
      gameState.enemiesRemaining = gameState.enemiesRemaining - 1;

      insertInStringForQuadrant(
        "   ",
        gameState.sectorEnemies[I][1],
        gameState.sectorEnemies[I][2]
      );

      gameState.sectorEnemies[I][3] = 0;
      gameState.galacticMap[gameState.quadrantPositionY][
        gameState.quadrantPositionX
      ] =
        gameState.galacticMap[gameState.quadrantPositionY][
          gameState.quadrantPositionX
        ] - 100;
      gameState.galacticMapDiscovered[gameState.quadrantPositionY][
        gameState.quadrantPositionX
      ] =
        gameState.galacticMap[gameState.quadrantPositionY][
          gameState.quadrantPositionX
        ];

      if (gameState.enemiesRemaining <= 0) {
        return endOfGame({ won: true });
      }
    } else {
      print(
        "   (SENSORS SHOW ",
        gameState.sectorEnemies[I][3],
        " UNITS REMAINING)"
      );
    }
  }
  enemiesShoot();
}

async function commandPhotonTorpedo() {
  // 4690 REM PHOTON TORPEDO CODE BEGINS HERE
  // 4700
  if (gameState.photonTorpedoesRemaining <= 0) {
    return print("ALL PHOTON TORPEDOES EXPENDED");
  }
  if (gameState.systemsDamage[SYSTEM_PHOTON_TUBES] < 0) {
    return print("PHOTON TUBES ARE NOT OPERATIONAL");
  }

  let C1 = parseFloat(await input("PHOTON TORPEDO COURSE (1-9)"));
  if (C1 == 9) C1 = 1;

  if (C1 < 1 || C1 > 9) {
    print(
      `${gameOptions.nameWeaponsOfficer} REPORTS,  'INCORRECT COURSE DATA, SIR!'`
    );
  }

  const [X1, X2] = courseToXY(C1);
  let X3, Y3;

  gameState.energyRemaining = gameState.energyRemaining - 2;
  gameState.photonTorpedoesRemaining = gameState.photonTorpedoesRemaining - 1;
  let X = gameState.sectorPositionY;
  let Y = gameState.sectorPositionX;

  print("TORPEDO TRACK:");

  const forever = true;
  while (forever) {
    // 4920
    X = X + X1;
    Y = Y + X2;
    X3 = Math.floor(X + 0.5);
    Y3 = Math.floor(Y + 0.5);

    if (X3 < 1 || X3 > 8 || Y3 < 1 || Y3 > 8) {
      // 5490
      print("TORPEDO MISSED");
      enemiesShoot();
      return;
    }

    print(`               ${X3} , ${Y3}`);
    if (!stringComparisonInQuadrantArray("   ", X, Y)) {
      break;
    }
  }

  // 5060
  if (stringComparisonInQuadrantArray("+K+", X, Y)) {
    print(`*** ${gameOptions.nameEnemy} DESTROYED ***`);
    gameState.sectorEnemiesCount = gameState.sectorEnemiesCount - 1;
    gameState.enemiesRemaining = gameState.enemiesRemaining - 1;
    if (gameState.enemiesRemaining <= 0) {
      return endOfGame({ won: true });
    }
    // 5150
    for (let I = 1; I <= 3; I++) {
      if (
        X3 == gameState.sectorEnemies[I][1] &&
        Y3 == gameState.sectorEnemies[I][2]
      ) {
        gameState.sectorEnemies[I][3] = 0;
        break;
      }
    }
  }

  // 5210
  if (stringComparisonInQuadrantArray(" * ", X, Y)) {
    print(`STAR AT ${X3} , ${Y3} ABSORBED TORPEDO ENERGY.`);
    enemiesShoot();
    return;
  }

  if (stringComparisonInQuadrantArray(">!<", X, Y)) {
    print("*** STARBASE DESTROYED ***");
    gameState.sectorStarbasesCount = gameState.sectorStarbasesCount - 1;
    gameState.starbasesRemaining = gameState.starbasesRemaining - 1;
    if (
      gameState.starbasesRemaining <= 0 ||
      gameState.enemiesRemaining <=
        gameState.stardateCurrent -
          gameOptions.stardateStart -
          gameOptions.timeLimit
    ) {
      print("THAT DOES IT, CAPTAIN!!  YOU ARE HEREBY RELIEVED OF COMMAND");
      print("AND SENTENCED TO 99 STARDATES AT HARD LABOR ON CYGNUS 12!!");
      return endOfGame();
    } else {
      print("STARFLEET COMMAND REVIEWING YOUR RECORD TO CONSIDER");
      print("COURT MARTIAL!");
      gameState.isDocked = 0;
    }
  }

  // 5430
  insertInStringForQuadrant("   ", X, Y);
  gameState.galacticMap[gameState.quadrantPositionY][
    gameState.quadrantPositionX
  ] =
    gameState.sectorEnemiesCount * 100 +
    gameState.sectorStarbasesCount * 10 +
    gameState.sectorStarsCount;
  gameState.galacticMapDiscovered[gameState.quadrantPositionY][
    gameState.quadrantPositionX
  ] =
    gameState.galacticMap[gameState.quadrantPositionY][
      gameState.quadrantPositionX
    ];
  enemiesShoot();
}

async function enemiesShoot() {
  if (gameState.sectorEnemiesCount <= 0) {
    return;
  }
  if (gameState.isDocked != 0) {
    print("STARBASE SHIELDS PROTECT THE ENTERPRISE");
    return;
  }
  for (let I = 1; I <= 3; I++) {
    if (gameState.sectorEnemies[I][3] <= 0) {
      continue;
    }

    const H = Math.floor(
      (gameState.sectorEnemies[I][3] / FND(I)) * (2 + RND(1))
    );
    gameState.shieldsCurrent = gameState.shieldsCurrent - H;
    gameState.sectorEnemies[I][3] = Math.floor(
      gameState.sectorEnemies[I][3] / (3 + RND(0))
    );

    print(
      H,
      " UNIT HIT ON ENTERPRISE FROM SECTOR ",
      gameState.sectorEnemies[I][1],
      " , ",
      gameState.sectorEnemies[I][2]
    );

    if (gameState.shieldsCurrent <= 0) {
      return endOfGame({ destroyed: true });
    }

    print("      <SHIELDS DOWN TO ", gameState.shieldsCurrent, " UNITS>");
    if (H < 20) {
      continue;
    }
    if (RND(1) > 0.6 || H / gameState.shieldsCurrent <= 0.02) {
      continue;
    }

    const systemIdx = randomInt(shipSystems.length);
    const systemName = shipSystems[systemIdx];
    gameState.systemsDamage[systemName] =
      gameState.systemsDamage[systemName] -
      H / gameState.shieldsCurrent -
      0.5 * RND(1);
    print(`DAMAGE CONTROL REPORTS ${systemName} DAMAGED BY THE HIT`);
  }
}

async function commandShieldControl() {
  // 5520 REM SHIELD CONTROL
  if (gameState.systemsDamage[SYSTEM_SHIELD_CONTROL] < 0) {
    print("SHIELD CONTROL INOPERABLE");
    return;
  }

  print(
    "ENERGY AVAILABLE = ",
    gameState.energyRemaining + gameState.shieldsCurrent
  );
  const X = parseFloat(await input("NUMBER OF UNITS TO SHIELDS"));
  if (X < 0 || gameState.shieldsCurrent == X) {
    print("<SHIELDS UNCHANGED>");
    return;
  }
  if (X > gameState.energyRemaining + gameState.shieldsCurrent) {
    print("SHIELD CONTROL REPORTS  'THIS IS NOT THE FEDERATION TREASURY.'");
    print("<SHIELDS UNCHANGED>");
    return;
  }

  gameState.energyRemaining =
    gameState.energyRemaining + gameState.shieldsCurrent - X;
  gameState.shieldsCurrent = X;

  print("DEFLECTOR CONTROL ROOM REPORT:");
  print(
    "  'SHIELDS NOW AT ",
    Math.floor(gameState.shieldsCurrent),
    " UNITS PER YOUR COMMAND.'"
  );
}

async function commandDamageControl() {
  // 5680 REM DAMAGE CONTROL
  // 5690
  if (gameState.systemsDamage[SYSTEM_DAMAGE_CONTROL] < 0) {
    print("DAMAGE CONTROL REPORT NOT AVAILABLE");
    return;
  }

  // 5910
  print();
  print("DEVICE             STATE OF REPAIR");
  for (const systemName of shipSystems) {
    print(
      systemName,
      Z$.substring(0, 25 - systemName.length),
      Math.floor(gameState.systemsDamage[systemName] * 100) * 0.01
    );
  }
  print();

  if (gameState.isDocked != 0) {
    let repairTimeEstimate = 0;
    for (const systemName of shipSystems) {
      if (gameState.systemsDamage[systemName] < 0) {
        repairTimeEstimate = repairTimeEstimate + 0.1;
      }
    }
    if (repairTimeEstimate == 0) {
      return;
    }
    print();
    repairTimeEstimate = repairTimeEstimate + gameState.starbaseRepairDelay;
    if (repairTimeEstimate >= 1) {
      repairTimeEstimate = 0.9;
    }
    print("TECHNICIANS STANDING BY TO EFFECT REPAIRS TO YOUR SHIP;");
    print(
      "ESTIMATED TIME TO REPAIR: ",
      0.01 * Math.floor(100 * repairTimeEstimate),
      " STARDATES"
    );
    const A$ = await input("WILL YOU AUTHORIZE THE REPAIR ORDER (Y/N)");
    if (A$.toUpperCase() != "Y") {
      return;
    }
    for (const systemName of shipSystems) {
      gameState.systemsDamage[systemName] = 0;
    }
    gameState.stardateCurrent =
      gameState.stardateCurrent + repairTimeEstimate + 0.1;
  }
}

async function commandLibraryComputer() {
  // 7280 REM LIBRARY COMPUTER CODE
  // 7290
  if (gameState.systemsDamage[SYSTEM_LIBRARY_COMPUTER] < 0) {
    print("COMPUTER DISABLED");
    return;
  }

  await computerHelp();

  const A = parseInt(await input("COMPUTER ACTIVE AND AWAITING COMMAND"));
  if (A < 0) return;

  // 7350
  print();
  switch (A) {
    case 0:
      await computerCumulativeRecord();
      break;
    case 1:
      await computerStatusReport();
      break;
    case 2:
      await computerPhotonData();
      break;
    case 3:
      await computerStarbaseData();
      break;
    case 4:
      await computerDirectionData();
      break;
    case 5:
      await computerGalaxyMap();
      break;
    default: {
      await computerHelp();
      break;
    }
  }
}

async function computerHelp() {
  print("FUNCTIONS AVAILABLE FROM LIBRARY-COMPUTER:");
  print("   0 = CUMULATIVE GALACTIC RECORD");
  print("   1 = STATUS REPORT");
  print("   2 = PHOTON TORPEDO DATA");
  print("   3 = STARBASE NAV DATA");
  print("   4 = DIRECTION/DISTANCE CALCULATOR");
  print("   5 = GALAXY 'REGION NAME' MAP");
  print();
  // :GOTO7320
}

async function computerPhotonData() {
  // 8070
  if (gameState.sectorEnemiesCount <= 0) {
    print(
      `SCIENCE OFFICER ${gameOptions.nameScienceOfficer} REPORTS  'SENSORS SHOW NO ENEMY SHIPS`
    );
    print("                                IN THIS QUADRANT'");
    return;
  }
  // 8080
  print(
    `FROM ENTERPRISE TO ${gameOptions.nameEnemy} BATTLE CRUISER${
      gameState.sectorEnemiesCount > 1 ? "S" : ""
    }`
  );

  for (let I = 1; I <= 3; I++) {
    if (gameState.sectorEnemies[I][3] <= 0) continue;
    computerDirectionCommon({
      fromY: gameState.sectorPositionY,
      fromX: gameState.sectorPositionX,
      toY: gameState.sectorEnemies[I][1],
      toX: gameState.sectorEnemies[I][2],
    });
  }
}

async function computerStarbaseData() {
  // 8500
  if (gameState.sectorStarbasesCount == 0) {
    print(
      `MR. ${gameOptions.nameScienceOfficer} REPORTS,  'SENSORS SHOW NO STARBASES IN THIS QUADRANT.'`
    );
    return;
  }
  print("FROM ENTERPRISE TO STARBASE:");
  computerDirectionCommon({
    fromY: gameState.sectorPositionY,
    fromX: gameState.sectorPositionX,
    toY: gameState.sectorStarbaseY,
    toX: gameState.sectorStarbaseX,
  });
}

const parseCoords = async (prompt) =>
  (await input(prompt)).split(",").map((s) => parseInt(s.trim()));

async function computerDirectionData() {
  print("DIRECTION/DISTANCE CALCULATOR:");
  print(
    `YOU ARE AT QUADRANT ${gameState.quadrantPositionY} , ${gameState.quadrantPositionX} SECTOR ${gameState.sectorPositionY} , ${gameState.sectorPositionX}`
  );
  print("PLEASE ENTER");
  const [fromY, fromX] = await parseCoords("  INITIAL COORDINATES (Y,X)");
  const [toY, toX] = await parseCoords("  FINAL COORDINATES (Y,X)");
  computerDirectionCommon({ fromX, fromY, toX, toY });
}

async function computerDirectionCommon({ fromX, fromY, toX, toY }) {
  const distance = Math.sqrt(
    Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)
  );
  const direction =
    1 +
    (8 / (Math.PI * 2)) *
      ((Math.atan2(0 - fromY - (0 - toY), fromX - toX) + Math.PI) %
        (Math.PI * 2));

  print(`DISTANCE = ${distance}`);
  print(`DIRECTION = ${direction}`);
}

async function computerStatusReport() {
  print("   STATUS REPORT:");
  print(
    `${
      gameState.enemiesRemaining > 1
        ? gameOptions.nameEnemies
        : gameOptions.nameEnemy
    } LEFT: ${gameState.enemiesRemaining}`
  );
  print(
    `MISSION MUST BE COMPLETED IN ${
      0.1 *
      Math.floor(
        (gameOptions.stardateStart +
          gameOptions.timeLimit -
          gameState.stardateCurrent) *
          10
      )
    }  STARDATES`
  );
  if (gameState.starbasesRemaining < 1) {
    print("YOUR STUPIDITY HAS LEFT YOU ON YOUR ON IN");
    print("  THE GALAXY -- YOU HAVE NO STARBASES LEFT!");
  } else {
    print(
      `THE FEDERATION IS MAINTAINING ${gameState.starbasesRemaining} STARBASE${
        gameState.starbasesRemaining < 2 ? "" : "S"
      } IN THE GALAXY`
    );
  }
  commandDamageControl();
}

async function computerGalaxyMap() {
  // 7390 REM SETUP TO CHANGE CUM GAL RECORD TO GALAXY MAP
  // 7400
  print("                        THE GALAXY");
  computerCommonMap(0, 1);
}

async function computerCumulativeRecord() {
  // 7530 REM CUM GALACTIC RECORD
  // 7540 REM INPUT"DO YOU WANT A HARDCOPY? IS THE TTY ON (Y/N)";A$
  // 7542 REM IFA$="Y"THENPOKE1229,2:POKE1237,3:NULL1
  print();
  print("        ");
  print(
    `COMPUTER RECORD OF GALAXY FOR QUADRANT ${gameState.quadrantPositionY} , ${gameState.quadrantPositionX}`
  );
  print();
  computerCommonMap(1, 0);
}

async function computerCommonMap(H8, G5) {
  // 7550
  print("       1     2     3     4     5     6     7     8");
  const O1$ = "     ----- ----- ----- ----- ----- ----- ----- -----";
  print(O1$);
  for (let I = 1; I <= 8; I++) {
    let out = `  ${I}`;
    if (H8 == 1) {
      // 7630
      for (let J = 1; J <= 8; J++) {
        out += `   ${
          gameState.galacticMapDiscovered[I][J] == 0
            ? "***"
            : ("" + gameState.galacticMapDiscovered[I][J]).padStart(3, "0")
        }`;
      }
    } else {
      let G2$;
      G2$ = buildQuadrantName(I, 1, G5);
      let J0 = Math.floor(12 - 0.5 * G2$.length);
      out += `  ${" ".repeat(J0)}${G2$}${" ".repeat(J0)}`;
      G2$ = buildQuadrantName(I, 5, G5);
      J0 = Math.floor(12 - 0.5 * G2$.length);
      out += `${" ".repeat(J0)}${G2$}`;
    }
    print(out);
    print(O1$);
  }
}

async function endOfGame({
  showStardate = true,
  destroyed = false,
  won = false,
} = {}) {
  // 6210 REM END OF GAME
  if (destroyed) {
    print();
    print(
      "THE ENTERPRISE HAS BEEN DESTROYED.  THEN FEDERATION WILL BE CONQUERED"
    );
  }

  if (showStardate) {
    print("IT IS STARDATE ", gameState.stardateCurrent);
  }

  if (!won) {
    print(
      `THERE WERE ${gameState.enemiesRemaining} ${gameOptions.nameEnemy} BATTLE CRUISERS LEFT AT`
    );
    print("THE END OF YOUR MISSION.");
  } else {
    // 6370
    print(
      `CONGRULATION, CAPTAIN!  THEN LAST ${gameOptions.nameEnemy} BATTLE CRUISER`
    );
    print("MENACING THE FDERATION HAS BEEN DESTROYED.");
    print();
    print(
      "YOUR EFFICIENCY RATING IS ",
      (1000 *
        (gameState.enemiesInitialCount /
          (gameState.stardateCurrent - gameOptions.stardateStart))) ^
        2
    );
  }

  print();
  print();

  if (gameState.starbasesRemaining > 0) {
    print("THE FEDERATION IS IN NEED OF A NEW STARSHIP COMMANDER");
    //print("FOR A SIMILAR MISSION -- IF THERE IS A VOLUNTEER,");
    //const A$ = await input("LET HIM STEP FORWARD AND ENTER 'AYE'");
    // HACK: recursive call to main seem dirty, but better than a GOTO
    //if (A$.toUpperCase() == 'AYE') return main();
  }

  // 6360 END
  exit();
}

const COURSE_TO_XY = [
  undefined,
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
];

function courseToXY(course) {
  const courseIdx = Math.floor(course);
  //3110 X1=C(C1,1)+(C(C1+1,1)-C(C1,1))*(C1-INT(C1)):X=S1:Y=S2
  //3140 X2=C(C1,2)+(C(C1+1,2)-C(C1,2))*(C1-INT(C1)):Q4=Q1:Q5=Q2
  const X1 =
    COURSE_TO_XY[courseIdx][0] +
    (COURSE_TO_XY[courseIdx + 1][0] - COURSE_TO_XY[courseIdx][0]) *
      (course - Math.floor(course));
  const X2 =
    COURSE_TO_XY[courseIdx][1] +
    (COURSE_TO_XY[courseIdx + 1][1] - COURSE_TO_XY[courseIdx][1]) *
      (course - Math.floor(course));
  return [X1, X2];
}

function findEmptyPlaceInQuadrant() {
  let R1, R2;
  let foundEmptyPlace = false;
  while (foundEmptyPlace == 0) {
    R1 = FNR(1);
    R2 = FNR(1);
    foundEmptyPlace = stringComparisonInQuadrantArray("   ", R1, R2);
  }
  return [R1, R2];
}

// 8820 REM STRING COMPARISON IN QUADRANT ARRAY
function stringComparisonInQuadrantArray(A$, Z1, Z2) {
  const S8 = (Z2 - 1) * 3 + (Z1 - 1) * 24;
  return gameState.quadrantMap.substring(S8, S8 + 3) == A$;
}

// 8660 REM INSERT IN STRING ARRAY FOR QUADRANT
function insertInStringForQuadrant(A$, Z1, Z2) {
  // 8670
  const S8 = Math.floor(Z2 - 0.5) * 3 + Math.floor(Z1 - 0.5) * 24;
  if (A$.length != 3) {
    throw "ERROR";
  }
  gameState.quadrantMap =
    gameState.quadrantMap.slice(0, S8) +
    A$ +
    gameState.quadrantMap.slice(S8 + 3);
}

// 9010 REM QUADRANT NAME IN G2$ FROM Z4,Z5 (=Q1,Q2)
// 9030
function buildQuadrantName(Z4, Z5, G5) {
  let G2$;
  if (Z5 <= 4) {
    G2$ = [
      "", // FIXME: 1-based index
      "ANTARES",
      "RIGEL",
      "PROCYON",
      "VEGA",
      "CANOPUS",
      "ALTAIR",
      "SAGITTARIUS",
      "POLLUX",
    ][Z4];
  } else {
    G2$ = [
      "", // FIXME: 1-based index
      "SIRIUS",
      "DENEB",
      "CAPELLA",
      "BETELGEUSE",
      "ALDEBARAN",
      "REGULUS",
      "ARCTURUS",
      "SPICA",
    ][Z4];
  }
  if (G5 != 1) {
    G2$ = G2$ + ["", " I", " II", " III", " IV"][Z5 % 4];
  }
  return G2$;
}
