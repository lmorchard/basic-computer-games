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
const util = require("util");
const readline = require("readline");

function print(...messages) {
  console.log(messages.join(""));
}

async function input(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  return new Promise((resolve, reject) => {
    rl.question(`${prompt}? `, (response) => {
      rl.close();
      resolve(response);
    });
  });
}

const RND = () => Math.random();
const FNR = () => Math.floor(Math.random() * 7.98 + 1.01);
const FND = (I) =>
  Math.sqrt(Math.pow(K[I][1] - S1, 2) + Math.pow(K[I][2] - S2, 2));

let G2$, Q$, C$, Z1, Z2, Z3, Z4, Z5, R1, R2;
let T, T0, T9, D0, E, E0, P, P0, S9, S, B9, K9, X$, X0$;
let Q1, Q2, Q4, Q5, S1, S2;
let C, D, Z, G;
let K, K3, K7, B3, S3, G5, D1, D4, D6;
let C1;
let N;

const Z$ = "                         ";

async function main() {
  // 10
  G2$ = "";
  Q$ = "";
  C$ = "";
  Z1 = 0;
  Z2 = 0;
  Z3 = 0;
  R1 = 0;
  R2 = 0;

  print("\n".repeat(10));
  print("                                    ,------*------,");
  print("                    ,-------------   '---  ------'");
  print("                     '-------- --'      / /");
  print("                         ,---' '-------/ /--,");
  print("                          '----------------'");
  print("");
  print("                    THE USS ENTERPRISE --- NCC-1701");
  print("\n".repeat(4));

  T = Math.floor(Math.random() * 20 + 20) * 100;
  T0 = T;
  T9 = 25 + Math.floor(Math.random() * 10);
  D0 = 0;
  E = 3000;
  E0 = E;
  P = 10;
  P0 = P;
  S9 = 200;
  S = 0;
  // B9 = 2; // Bug from original?
  B9 = 0;
  K9 = 0;
  X$ = "";
  X0$ = " IS ";

  // 480 REM INITIALIZE ENTERPRIZE'S POSITION
  Q1 = FNR();
  Q2 = FNR();
  S1 = FNR();
  S2 = FNR();

  C = [];
  for (let i = 1; i <= 9; i++) {
    // FIXME: danged zero-based arrays
    C[i] = [undefined, 0, 0];
  }

  C[3][1] = -1;
  C[2][1] = -1;
  C[4][1] = -1;
  C[4][2] = -1;
  C[5][2] = -1;
  C[6][2] = -1;
  C[1][2] = 1;
  C[2][2] = 1;
  C[6][1] = 1;
  C[7][1] = 1;
  C[8][1] = 1;
  C[8][2] = 1;
  C[9][2] = 1;

  D = [];
  for (let i = 1; i <= 8; i++) {
    D[i] = 0;
  }

  // 810 REM SETUP WHAT EXHISTS IN GALAXY . . .
  // 815 REM K3= # KLINGONS  B3= # STARBASES  S3 = # STARS

  K3 = 0;
  B3 = 0;
  S3 = 0;

  Z = [];
  G = [];

  for (let i = 1; i <= 8; i++) {
    G[i] = [];
    Z[i] = [];
    for (let j = 1; j <= 8; j++) {
      Z[i][j] = 0;

      K3 = 0;
      const R1 = Math.random();
      // 850
      if (R1 > 0.98) {
        K3 = 3;
        K9 = K9 + 3;
      } else if (R1 > 0.95) {
        K3 = 2;
        K9 = K9 + 2;
      } else if (R1 > 0.8) {
        K3 = 1;
        K9 = K9 + 1;
      }

      // 980
      B3 = 0;
      if (Math.random() > 0.96) {
        B3 = 1;
        B9 = B9 + 1;
      }

      // 1040
      G[i][j] = K3 * 100 + B3 * 10 + FNR(1);
    }
  }

  if (K9 > T9) {
    T9 = K9 + 1;
  }

  if (B9 === 0) {
    if (G[Q1][Q2] < 200) {
      G[Q1][Q2] = G[Q1][Q2] + 120;
    }
    K9 = K9 + 1;
    B9 = 1;
    G[Q1][Q2] = G[Q1][Q2] + 10;
    Q1 = FNR(1);
    Q2 = FNR(1);
  }

  K7 = K9;
  if (B9 !== 1) {
    X$ = "S";
    X0$ = " ARE ";
  }

  print("YOUR ORDERS ARE AS FOLLOWS:");
  print("     DESTROY THE ", K9, " KLINGON WARSHIPS WHICH HAVE INVADED");
  print("   THE GALAXY BEFORE THEY CAN ATTACK FEDERATION HEADQUARTERS");
  print(
    "   ON STARDATE ",
    T0 + T9,
    "  THIS GIVES YOU ",
    T9,
    " DAYS.  THERE",
    X0$
  );
  print("  ", B9, " STARBASE", X$, " IN THE GALAXY FOR RESUPPLYING YOUR SHIP");
  print();
  // REM PRINT"HIT ANY KEY EXCEPT RETURN WHEN READY TO ACCEPT COMMAND"
  I = RND(1);
  //REM IF INP(1)=13 THEN 1300

  await newQuadrantEntered();
}

async function newQuadrantEntered() {
  // 1310 REM HERE ANY TIME NEW QUADRANT ENTERED
  // 1320
  Z4 = Q1;
  Z5 = Q2;
  K3 = 0;
  B3 = 0;
  S3 = 0;
  G5 = 0;
  D4 = 0.5 * Math.random();
  Z[Q1][Q2] = G[Q1][Q2];

  K = [
    null, //TODO fix zero-index
    [],
    [],
    [],
  ];

  if (Q1 >= 1 && Q1 <= 8 && Q2 >= 1 && Q2 <= 8) {
    buildQuadrantName();
    print();
    if (T0 == T) {
      print("YOUR MISSION BEGINS WITH YOUR STARSHIP LOCATED");
      print("IN THE GALACTIC QUADRANT, '", G2$, "'.");
    } else {
      print("NOW ENTERING ", G2$, " QUADRANT . . .");
    }
    print();
    K3 = Math.floor(G[Q1][Q2] * 0.01);
    B3 = Math.floor(G[Q1][Q2] * 0.1) - 10 * K3;
    S3 = G[Q1][Q2] - 100 * K3 - 10 * B3;

    if (K3 != 0) {
      print("COMBAT AREA      CONDITION RED");
      if (S <= 200) {
        print("   SHIELDS DANGEROUSLY LOW");
      }
    }

    for (let i = 1; i <= 3; i++) {
      K[i][1] = 0;
      K[i][2] = 0;
    }
  }

  for (let i = 1; i <= 3; i++) {
    K[i][3] = 0;
  }

  Q$ = Z$ + Z$ + Z$ + Z$ + Z$ + Z$ + Z$ + Z$.substr(0, 17);

  // 1660 REM POSITION ENTERPRISE IN QUADRANT, THEN PLACE "K3" KLINGONS, &
  // 1670 REM "B3" STARBASES, & "S3" STARS ELSEWHERE.
  A$ = "<*>";
  Z1 = S1;
  Z2 = S2;
  insertInStringForQuadrant();

  if (K3 >= 1) {
    // 1720
    for (let i = 1; i <= K3; i++) {
      findEmptyPlaceInQuadrant();
      A$ = "+K+";
      Z1 = R1;
      Z2 = R2;
      insertInStringForQuadrant();
      K[i][1] = R1;
      K[i][2] = R2;
      K[i][3] = S9 * (0.5 + RND(1));
    }
  }

  if (B3 >= 1) {
    // 1820
    findEmptyPlaceInQuadrant();
    A$ = ">!<";
    Z1 = R1;
    B4 = R1;
    Z2 = R2;
    B5 = R2;
    insertInStringForQuadrant();
  }

  for (let i = 1; i <= S3; i++) {
    findEmptyPlaceInQuadrant();
    A$ = " * ";
    Z1 = R1;
    Z2 = R2;
    insertInStringForQuadrant();
  }

  // 1980 GOSUB6430
  await shortRangeSensorScanAndStartup();

  while (true) {
    await acceptCommand();
  }
}

async function acceptCommand() {
  // 1990
  if (S + E <= 10 || (E < 10 && D[7] != 0)) {
    print();
    print("** FATAL ERROR **   YOU'VE JUST STRANDED YOUR SHIP IN SPACE");
    print("YOU HAVE INSUFFICIENT MANEUVERING ENERGY, AND SHIELD CONTROL");
    print("IS PRESENTLY INCAPABLE OF CROSS-CIRCUITING TO ENGINE ROOM!!");
    endOfGame();
  }

  // 2060
  A$ = await input("COMMAND");
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
  D0 = 0;
  for (let i = S1 - 1; i <= S1 + 1; i++) {
    for (let j = S1 - 1; j <= S2 + 1; j++) {
      if (
        Math.floor(i + 0.5) < 1 ||
        Math.floor(i + 0.5) > 8 ||
        Math.floor(j + 0.5) < 1 ||
        Math.floor(j + 0.5) > 8
      ) {
        continue;
      }

      A$ = ">!<";
      Z1 = i;
      Z2 = j;
      stringComparisonInQuadrantArray();

      if (Z3 == 1) {
        D0 = 1;
        break;
      }
    }
  }

  if (D0 == 1) {
    C$ = "DOCKED";
    E = E0;
    P = P0;
    print("SHIELDS DROPPED FOR DOCKING PURPOSES");
    S = 0;
  } else {
    C$ = "GREEN";
    if (E < E0 * 0.1) C$ = "YELLOW";
    if (K3 > 0) C$ = "RED";
  }

  if (D[2] < 0) {
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
        Q$.substring((I - 1) * 24, (I - 1) * 24 + 24) +
        [
          "",
          `        STARDATE           ${Math.floor(T * 10) * 0.1}`,
          `        CONDITION          ${C$}`,
          `        QUADRANT           ${Q1} , ${Q2}`,
          `        SECTOR             ${S1} , ${S2}`,
          `        PHOTON TORPEDOES   ${Math.floor(P)}`,
          `        TOTAL ENERGY       ${Math.floor(E + S)}`,
          `        SHIELDS            ${Math.floor(S)}`,
          `        KLINGONS REMAINING ${Math.floor(K9)}`,
        ][I]
    );
  }
  print(O1$);
}

async function commandCourseControl() {
  // 2290 REM COURSE CONTROL BEGINS HERE
  C1 = parseFloat(await input("COURSE (0-9)"));
  if (C1 == 9) C1 = 1;
  if (C1 < 1 || C1 > 9) {
    print("   LT. SULU REPORTS, 'INCORRECT COURSE DATA, SIR!'");
    return;
  }

  X$ = "8";
  if (D[1] < 0) X$ = "0.2";

  W1 = parseFloat(await input(`WARP FACTOR (0-${X$})`));
  if (W1 == 0) return;
  if (D[1] < 0 && W1 > 0.2) {
    return print("WARP ENGINES ARE DAMAGED.  MAXIUM SPEED = WARP 0.2");
  }
  if (W1 < 0 && W1 > 8) {
    return print(
      `   CHIEF ENGINEER SCOTT REPORTS 'THE ENGINES WON'T TAKE WARP ${W1}!'`
    );
  }

  N = Math.floor(W1 * 8 + 0.5);
  if (E - N < 0) {
    print("ENGINEERING REPORTS   'INSUFFICIENT ENERGY AVAILABLE");
    print("                       FOR MANEUVERING AT WARP ", W1, " !'");
    if (S > N - E && D[7] > 0) {
      print("DEFLECTOR CONTROL ROOM ACKNOWLEDGES ", S, " UNITS OF ENERGY");
      print("                         PRESENTLY DEPLOYED TO SHIELDS.");
    }
  }

  // 2580 REM KLINGONS MOVE/FIRE ON MOVING STARSHIP . . .
  for (let I = 1; I <= 3; I++) {
    if (K[I][3] > 0) {
      A$ = "   ";
      Z1 = K[I][1];
      Z2 = K[I][2];
      insertInStringForQuadrant();
      findEmptyPlaceInQuadrant();
      K[I][1] = Z1;
      K[I][2] = Z2;
      A$ = "+K+";
      insertInStringForQuadrant();
    }
  }
  klingonsShoot();

  D1 = 0;
  D6 = W1;
  if (W1 >= 1) D6 = 1;

  for (let I = 1; I <= 8; I++) {
    if (D[I] >= 0) continue;
    D[I] = D[I] + D6;
    if (D[I] > -0.1 && D[I] < 0) {
      D[I] = -0.1;
      continue;
    }
    if (D[I] < 0) continue;
    if (D1 != 1) {
      D1 = 1;
      print("DAMAGE CONTROL REPORT:");
    }
    R1 = I;
    deviceNameByIndex(R1);
    print(`        ${G2$} REPAIR COMPLETED.`);
  }

  // 20% chance of system being damaged or repaired in warp
  if (RND(1) < 0.2) {
    R1 = FNR(1);
    deviceNameByIndex(R1);
    if (RND(1) < 0.6) {
      D[R1] = D[R1] - (RND(1) * 5 + 1);
      if (D1 != 1) {
        D1 = 1;
        print("DAMAGE CONTROL REPORT:");
      }
      print(`        ${G2$} DAMAGED`);
    } else {
      D[R1] = D[R1] + RND(1) * 3 + 1;
      if (D1 != 1) {
        D1 = 1;
        print("DAMAGE CONTROL REPORT:");
      }
      print(`        ${G2$} STATE OF REPAIR IMPROVED`);
    }
    print();
  }

  // 3060 REM BEGIN MOVING STARSHIP
  A$ = "   ";
  Z1 = Math.floor(S1);
  Z2 = Math.floor(S2);
  insertInStringForQuadrant();

  const fC1 = Math.floor(C1);
  X1 = C[fC1][1] + (C[fC1 + 1][1] - C[fC1][1]) * (C1 - Math.floor(C1));
  X2 = C[fC1][2] + (C[fC1 + 1][2] - C[fC1][2]) * (C1 - Math.floor(C1));
  X = S1;
  Y = S2;
  Q4 = Q1;
  Q5 = Q2;

  for (let I = 1; I < N; I++) {
    S1 = S1 + X1;
    S2 = S2 + X2;

    if (S1 < 1 || S1 >= 9 || S2 < 1 || S2 >= 9) {
      // 3490 REM EXCEEDED QUADRANT LIMITS
      X = 8 * Q1 + X + N * X1;
      Y = 8 * Q2 + Y + N * X2;

      Q1 = Math.floor(X / 8);
      Q2 = Math.floor(Y / 8);

      S1 = Math.floor(X - Q1 * 8);
      S2 = Math.floor(Y - Q2 * 8);

      if (S1 == 0) {
        Q1 = Q1 - 1;
        S1 = 8;
      }
      if (S2 == 0) {
        Q2 = Q2 - 1;
        S2 = 8;
      }

      X5 = 0;
      if (Q1 < 1) {
        X5 = 1;
        Q1 = 1;
        S1 = 1;
      }
      if (Q1 > 8) {
        X5 = 1;
        Q1 = 8;
        S1 = 8;
      }
      if (Q2 < 1) {
        X5 = 1;
        Q2 = 1;
        S2 = 1;
      }
      if (Q2 > 8) {
        X5 = 1;
        Q2 = 8;
        S2 = 8;
      }

      if (X5 != 0) {
        print("LT. UHURA REPORTS MESSAGE FROM STARFLEET COMMAND:");
        print("  'PERMISSION TO ATTEMPT CROSSING OF GALACTIC PERIMETER");
        print("  IS HEREBY *DENIED*.  SHUT DOWN YOUR ENGINES.'");
        print("CHIEF ENGINEER SCOTT REPORTS  'WARP ENGINES SHUT DOWN");
        print(`  AT SECTOR ${S1} , ${S2} OF QUADRANT ${Q1} , ${Q2}.'`);

        if (T > T0 + T9) {
          return endOfGame();
        }
      }

      if (8 * Q1 + Q2 == 8 * Q4 + Q5) {
        break;
      }

      T = T + 1;
      maneuverEnergy();
      return await newQuadrantEntered();
    }

    // 3240
    S8 = Math.floor(S1) * 24 + Math.floor(S2) * 3 - 26;
    if (Q$.substring(S8, S8 + 2) != "  ") {
      S1 = Math.floor(S1 - X1);
      S2 = Math.floor(S2 - X2);

      print(
        `WARP ENGINES SHUT DOWN AT SECTOR ${S1} , ${S2} DUE TO BAD NAVAGATION`
      );
      break;
    }
  }

  S1 = Math.floor(S1);
  S2 = Math.floor(S2);

  A$ = "<*>";
  Z1 = Math.floor(S1);
  Z2 = Math.floor(S2);
  insertInStringForQuadrant();

  maneuverEnergy();

  T8 = 1;
  if (W1 < 1) {
    T8 = 0.1 * Math.floor(10 * W1);
  }

  T = T + T8;
  if (T > T0 + T9) {
    return endOfGame();
  }

  // 3470 REM SEE IF DOCKED, THEN GET COMMAND
  return acceptCommand();
}

function maneuverEnergy() {
  // 3900 REM MANEUVER ENERGY S/R **
  E = E - N - 10;
  if (E >= 0) {
    return;
  }
  print("SHIELD CONTROL SUPPLIES ENERGY TO COMPLETE THE MANEUVER.");
  S = S + E;
  E = 0;
  if (S <= 0) {
    S = 0;
  }
}

async function commandLongRangeScan() {
  // 3990 REM LONG RANGE SENSOR SCAN CODE
  if (D[3] < 0) {
    print("LONG RANGE SENSORS ARE INOPERABLE");
    return;
  }
  print("LONG RANGE SCAN FOR QUADRANT ", Q1, " , ", Q2);
  const N = [];
  const O1$ = "-------------------";
  print(O1$);
  for (let I = Q1 - 1; I <= Q1 + 1; I++) {
    let out = "";
    N[1] = -1;
    N[2] = -2;
    N[3] = -3;
    for (let J = Q2 - 1; J <= Q2 + 1; J++) {
      if (I > 0 && I < 9 && J > 0 && J < 9) {
        N[J - Q2 + 2] = G[I][J];
        Z[I][J] = G[I][J];
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
  if (D[4] < 0) {
    print("PHASERS INOPERATIVE");
    return;
  }

  if (K3 <= 0) {
    print("SCIENCE OFFICER SPOCK REPORTS  'SENSORS SHOW NO ENEMY SHIPS");
    print("                                IN THIS QUADRANT'");
    return;
  }

  if (D[8] < 0) {
    print("COMPUTER FAILURE HAMPERS ACCURACY");
  }

  print("PHASERS LOCKED ON TARGET;  ENERGY AVAILABLE = ", E, " UNITS");
  let X;
  while (true) {
    X = parseFloat(await input("NUMBER OF UNITS TO FIRE"));
    if (X <= 0) return;
    if (E - X >= 0) {
      break;
    }
    print("ENERGY AVAILABLE = ", E, " UNITS");
  }

  E = E - X;

  // TODO: is this a bug? D[8] is computer, D[7] is shields - but D[7] is what was in the original source!
  if (D[7] < 0) {
    X = X * Math.random();
  }

  H1 = Math.floor(X / K3);

  for (let I = 1; I <= 3; I++) {
    if (K[I][3] <= 0) {
      continue;
    }
    H = Math.floor((H1 / FND(I)) * (RND(1) + 2));
    if (H <= 0.15 * K[I][3]) {
      print("SENSORS SHOW NO DAMAGE TO ENEMY AT ", K[I][1], " , ", K[I][2]);
      continue;
    }
    K[I][3] = K[I][3] - H;

    print(H, " UNIT HIT ON KLINGON AT SECTOR ", K[I][1], " , ", K[I][2]);
    if (K[I][3] <= 0) {
      print("*** KLINGON DESTROYED ***");
      K3 = K3 - 1;
      K9 = K9 - 1;

      Z1 = K[I][1];
      Z2 = K[I][2];
      A$ = "   ";
      insertInStringForQuadrant();

      K[I][3] = 0;
      G[Q1][Q2] = G[Q1][Q2] - 100;
      Z[Q1][Q2] = G[Q1][Q2];

      if (K9 <= 0) {
        return endOfGame({ won: true });
      }
    } else {
      print("   (SENSORS SHOW ", K[I][3], " UNITS REMAINING)");
    }
  }
  klingonsShoot();
}

async function commandPhotonTorpedo() {
  // 4690 REM PHOTON TORPEDO CODE BEGINS HERE
  // 4700
  if (P <= 0) {
    return print("ALL PHOTON TORPEDOES EXPENDED");
  }
  if (D[5] < 0) {
    return print("PHOTON TUBES ARE NOT OPERATIONAL");
  }

  const C1 = parseFloat(await input("PHOTON TORPEDO COURSE (1-9)"));
  if (C1 == 9) C1 = 1;

  if (C1 < 1 || C1 > 9) {
    print("ENSIGN CHEKOV REPORTS,  'INCORRECT COURSE DATA, SIR!'");
  }

  X1 = C[C1][1] + (C[C1 + 1][1] - C[C1][1]) * (C1 - Math.floor(C1));
  E = E - 2;
  P = P - 1;
  X2 = C[C1][2] + (C[C1 + 1][2] - C[C1][2]) * (C1 - Math.floor(C1));
  X = S1;
  Y = S2;

  print("TORPEDO TRACK:");

  while (true) {
    // 4920
    X = X + X1;
    Y = Y + X2;
    X3 = Math.floor(X + 0.5);
    Y3 = Math.floor(Y + 0.5);

    if (X3 < 1 || X3 > 8 || Y3 < 1 || Y3 > 8) {
      // 5490
      print("TORPEDO MISSED");
      klingonsShoot();
      return;
    }

    print(`               ${X3} , ${Y3}`);
    A$ = "   ";
    Z1 = X;
    Z2 = Y;
    stringComparisonInQuadrantArray();
    if (Z3 == 0) {
      break;
    }
  }

  // 5060
  A$ = "+K+";
  Z1 = X;
  Z2 = Y;
  stringComparisonInQuadrantArray();
  if (Z3 != 0) {
    print("*** KLINGON DESTROYED ***");
    K3 = K3 - 1;
    K9 = K9 - 1;
    if (K9 <= 0) {
      return endOfGame({ won: true });
    }
    // 5150
    for (let I = 1; I <= 3; I++) {
      if (X3 == K[I][1] && Y3 == K[I][2]) {
        K[I][3] = 0;
        break;
      }
    }
  }

  // 5210
  A$ = " * ";
  Z1 = X;
  Z2 = Y;
  stringComparisonInQuadrantArray();
  if (Z3 != 0) {
    print(`STAR AT ${X3} , ${Y3} ABSORBED TORPEDO ENERGY.`);
    klingonsShoot();
    return;
  }

  A$ = ">!<";
  Z1 = X;
  Z2 = Y;
  stringComparisonInQuadrantArray();
  if (Z3 != 0) {
    print("*** STARBASE DESTROYED ***");
    B3 = B3 - 1;
    B9 = B9 - 1;
    if (B9 <= 0 || K9 <= T - T0 - T9) {
      print("THAT DOES IT, CAPTAIN!!  YOU ARE HEREBY RELIEVED OF COMMAND");
      print("AND SENTENCED TO 99 STARDATES AT HARD LABOR ON CYGNUS 12!!");
      return endOfGame();
    } else {
      print("STARFLEET COMMAND REVIEWING YOUR RECORD TO CONSIDER");
      print("COURT MARTIAL!");
      D0 = 0;
    }
  }

  // 5430
  Z1 = X;
  Z2 = Y;
  A$ = "   ";
  insertInStringForQuadrant();
  G[Q1][Q2] = K3 * 100 + B3 * 10 + S3;
  Z[Q1][Q2] = G[Q1][Q2];
  klingonsShoot();
}

async function klingonsShoot() {
  //  5990 REM KLINGONS SHOOTING
  if (K3 <= 0) {
    return;
  }
  if (D0 != 0) {
    print("STARBASE SHIELDS PROTECT THE ENTERPRISE");
    return;
  }
  for (let I = 1; I <= 3; I++) {
    if (K[I][3] <= 0) {
      continue;
    }

    H = Math.floor((K[I][3] / FND(I)) * (2 + RND(1)));
    S = S - H;
    K[I][3] = Math.floor(K[I][3] / (3 + RND(0)));

    print(H, " UNIT HIT ON ENTERPRISE FROM SECTOR ", K[I][1], " , ", K[I][2]);

    if (S <= 0) {
      return endOfGame({ destroyed: true });
    }

    print("      <SHIELDS DOWN TO ", S, " UNITS>");
    if (H < 20) {
      continue;
    }
    if (RND(1) > 0.6 || H / S <= 0.02) {
      continue;
    }

    R1 = FNR(1);
    D[R1] = D[R1] - H / S - 0.5 * RND(1);
    deviceNameByIndex(R1);
    print(`DAMAGE CONTROL REPORTS ${G2$} DAMAGED BY THE HIT`);
  }
}

async function commandShieldControl() {
  // 5520 REM SHIELD CONTROL
  if (D[7] < 0) {
    print("SHIELD CONTROL INOPERABLE");
    return;
  }

  print("ENERGY AVAILABLE = ", E + S);
  const X = parseFloat(await input("NUMBER OF UNITS TO SHIELDS"));
  if (X < 0 || S == X) {
    print("<SHIELDS UNCHANGED>");
    return;
  }
  if (X > E + S) {
    print("SHIELD CONTROL REPORTS  'THIS IS NOT THE FEDERATION TREASURY.'");
    print("<SHIELDS UNCHANGED>");
    return;
  }

  E = E + S - X;
  S = X;

  print("DEFLECTOR CONTROL ROOM REPORT:");
  print("  'SHIELDS NOW AT ", Math.floor(S), " UNITS PER YOUR COMMAND.'");
}

async function commandDamageControl() {
  // 5680 REM DAMAGE CONTROL
  // 5690
  if (D[6] < 0) {
    print("DAMAGE CONTROL REPORT NOT AVAILABLE");
    return;
  }

  // 5910
  print();
  print("DEVICE             STATE OF REPAIR");
  for (R1 = 1; R1 <= 8; R1++) {
    deviceNameByIndex(R1);
    print(
      G2$,
      Z$.substring(0, 25 - G2$.length),
      Math.floor(D[R1] * 100) * 0.01
    );
  }
  print();

  if (D0 != 0) {
    D3 = 0;
    for (let I = 1; I <= 8; I++) {
      if (D[I] < 0) {
        D3 = D3 + 0.1;
      }
    }
    if (D3 == 0) {
      return;
    }
    print();
    D3 = D3 + D4;
    if (D3 >= 1) {
      D3 = 0.9;
    }
    print("TECHNICIANS STANDING BY TO EFFECT REPAIRS TO YOUR SHIP;");
    print(
      "ESTIMATED TIME TO REPAIR: ",
      0.01 * Math.floor(100 * D3),
      " STARDATES"
    );
    const A$ = await input("WILL YOU AUTHORIZE THE REPAIR ORDER (Y/N)");
    if (A$.toUpperCase() != "Y") {
      return;
    }
    for (let I = 1; I <= 8; I++) {
      D[I] = 0;
    }
    T = T + D3 + 0.1;
  }
}

async function commandLibraryComputer() {
  // 7280 REM LIBRARY COMPUTER CODE
  // 7290
  if (D[8] < 0) {
    print("COMPUTER DISABLED");
    return;
  }

  const A = parseInt(await input("COMPUTER ACTIVE AND AWAITING COMMAND"));
  if (A < 0) return;

  // 7350
  print();
  //ONA+1GOTO7540,7900,8070,8500,8150,7400
  switch (A) {
    case 0:
      await computerCumulativeRecord();
      break;
    case 1:
      await computerStatusReport();
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      await computerGalaxyMap();
      break;
    default: {
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
  }

  // 8060 REM TORPEDO, BASE NAV, D/D CALCULATOR
  // 8070 IFK3<=0THEN4270
  // 8080 X$="":IFK3>1THENX$="S"
  // 8090 PRINT"FROM ENTERPRISE TO KLINGON BATTLE CRUSER";X$
  // 8100 H8=0:FORI=1TO3:IFK(I,3)<=0THEN8480
  // 8110 W1=K(I,1):X=K(I,2)
  // 8120 C1=S1:A=S2:GOTO8220
  // 8150 PRINT"DIRECTION/DISTANCE CALCULATOR:"
  // 8160 PRINT"YOU ARE AT QUADRANT ";Q1;",";Q2;" SECTOR ";S1;",";S2
  // 8170 PRINT"PLEASE ENTER":INPUT"  INITIAL COORDINATES (X,Y)";C1,A
  // 8200 INPUT"  FINAL COORDINATES (X,Y)";W1,X
  // 8220 X=X-A:A=C1-W1:IFX<0THEN8350
  // 8250 IFA<0THEN8410
  // 8260 IFX>0THEN8280
  // 8270 IFA=0THENC1=5:GOTO8290
  // 8280 C1=1
  // 8290 IFABS(A)<=ABS(X)THEN8330
  // 8310 PRINT"DIRECTION =";C1+(((ABS(A)-ABS(X))+ABS(A))/ABS(A)):GOTO8460
  // 8330 PRINT"DIRECTION =";C1+(ABS(A)/ABS(X)):GOTO8460
  // 8350 IFA>0THENC1=3:GOTO8420
  // 8360 IFX<>0THENC1=5:GOTO8290
  // 8410 C1=7
  // 8420 IFABS(A)>=ABS(X)THEN8450
  // 8430 PRINT"DIRECTION =";C1+(((ABS(X)-ABS(A))+ABS(X))/ABS(X)):GOTO8460
  // 8450 PRINT"DIRECTION =";C1+(ABS(X)/ABS(A))
  // 8460 PRINT"DISTANCE =";SQR(X^2+A^2):IFH8=1THEN1990
  // 8480 NEXTI:GOTO1990

  // 8500 IFB3<>0THENPRINT"FROM ENTERPRISE TO STARBASE:":W1=B4:X=B5:GOTO8120
  // 8510 PRINT"MR. SPOCK REPORTS,  'SENSORS SHOW NO STARBASES IN THIS";
  // 8520 PRINT" QUADRANT.'":GOTO1990
}

async function computerStatusReport() {
  // 7890 REM STATUS REPORT
  // 7900
  print("   STATUS REPORT:");
  X$ = "";
  if (K9 > 1) X$ = "S";
  print(`KLINGON${X$} LEFT: ${K9}`);
  print(
    `MISSION MUST BE COMPLETED IN ${
      0.1 * Math.floor((T0 + T9 - T) * 10)
    }  STARDATES`
  );
  X$ = "S";
  if (B9 < 2) X$ = "";
  if (B9 < 1) {
    print("YOUR STUPIDITY HAS LEFT YOU ON YOUR ON IN");
    print("  THE GALAXY -- YOU HAVE NO STARBASES LEFT!");
  } else {
    print(`THE FEDERATION IS MAINTAINING ${B9} STARBASE${X$} IN THE GALAXY`);
  }
  commandDamageControl();
}

async function computerGalaxyMap() {
  // 7390 REM SETUP TO CHANGE CUM GAL RECORD TO GALAXY MAP
  // 7400
  H8 = 0;
  G5 = 1;
  print("                        THE GALAXY");
  computerCommonMap(0);
}

async function computerCumulativeRecord() {
  // 7530 REM CUM GALACTIC RECORD
  // 7540 REM INPUT"DO YOU WANT A HARDCOPY? IS THE TTY ON (Y/N)";A$
  // 7542 REM IFA$="Y"THENPOKE1229,2:POKE1237,3:NULL1
  print();
  print("        ");
  print(`COMPUTER RECORD OF GALAXY FOR QUADRANT ${Q1} , ${Q2}`);
  print();
  computerCommonMap(1);
}

async function computerCommonMap(H8) {
  // 7550
  print("       1     2     3     4     5     6     7     8");
  const O1$ = "     ----- ----- ----- ----- ----- ----- ----- -----";
  print(O1$);
  for (let I = 1; I <= 8; I++) {
    out = `  ${I}`;
    if (H8 == 1) {
      // 7630
      for (let J = 1; J <= 8; J++) {
        out += `   ${Z[I][J] == 0 ? "***" : ("" + Z[I][J]).padStart(3, "0")}`;
      }
    } else {
      Z4 = I;
      Z5 = 1;
      buildQuadrantName();
      J0 = Math.floor(12 - 0.5 * G2$.length);
      out += `  ${" ".repeat(J0)}${G2$}${" ".repeat(J0)}`;
      Z5 = 5;
      buildQuadrantName();
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
    print("IT IS STARDATE ", T);
  }

  if (!won) {
    print("THERE WERE ", K9, " KLINGON BATTLE CRUISERS LEFT AT");
    print("THE END OF YOUR MISSION.");
  } else {
    // 6370
    print("CONGRULATION, CAPTAIN!  THEN LAST KLINGON BATTLE CRUISER");
    print("MENACING THE FDERATION HAS BEEN DESTROYED.");
    print();
    print("YOUR EFFICIENCY RATING IS ", (1000 * (K7 / (T - T0))) ^ 2);
  }

  print();
  print();

  if (B9 > 0) {
    print("THE FEDERATION IS IN NEED OF A NEW STARSHIP COMMANDER");
    print("FOR A SIMILAR MISSION -- IF THERE IS A VOLUNTEER,");
    A$ = await input("LET HIM STEP FORWARD AND ENTER 'AYE'");
    // HACK: recursive call to main seem dirty, but better than a GOTO
    //if (A$.toUpperCase() == 'AYE') return main();
  }

  // 6360 END
  process.exit();
}

// 8580 REM FIND EMPTY PLACE IN QUADRANT (FOR THINGS)
function findEmptyPlaceInQuadrant() {
  // 8590
  Z3 = 0;
  while (Z3 == 0) {
    R1 = FNR(1);
    R2 = FNR(1);
    A$ = "   ";
    Z1 = R1;
    Z2 = R2;
    stringComparisonInQuadrantArray();
  }
}

// 8820 REM STRING COMPARISON IN QUADRANT ARRAY
function stringComparisonInQuadrantArray() {
  Z1 = Math.floor(Z1 + 0.5);
  Z2 = Math.floor(Z2 + 0.5);
  const S8 = (Z2 - 1) * 3 + (Z1 - 1) * 24;
  Z3 = 0;
  if (Q$.substring(S8, S8 + 3) != A$) return;
  Z3 = 1;
}

// 8660 REM INSERT IN STRING ARRAY FOR QUADRANT
function insertInStringForQuadrant() {
  // 8670
  const S8 = Math.floor(Z2 - 0.5) * 3 + Math.floor(Z1 - 0.5) * 24;
  if (A$.length != 3) {
    throw "ERROR";
  }
  Q$ = Q$.slice(0, S8) + A$ + Q$.slice(S8 + 3);
}

// 8780 REM PRINTS DEVICE NAME
function deviceNameByIndex(R1) {
  G2$ = [
    "", // FIXME: 1-based index
    "WARP ENGINES",
    "SHORT RANGE SENSORS",
    "LONG RANGE SENSORS",
    "PHASER CONTROL",
    "PHOTON TUBES",
    "DAMAGE CONTROL",
    "SHIELD CONTROL",
    "LIBRARY-COMPUTER",
  ][R1];
}

// 9010 REM QUADRANT NAME IN G2$ FROM Z4,Z5 (=Q1,Q2)
// 9030
function buildQuadrantName() {
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
}

main().then(process.exit).catch(console.log);
