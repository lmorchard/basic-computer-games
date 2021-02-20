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
const util = require('util');
const readline = require('readline');

function print(...messages) {
  console.log(messages.join(''));
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
const FND = (I) => Math.sqrt((K[I][1] - S1) ^ (2 + (K[I][2] - S2)) ^ 2);

let G2$, Q$, C$, Z1, Z2, Z3, Z4, Z5, R1, R2;
let T, T0, T9, D0, E, E0, P, P0, S9, S, B9, K9, X$, X0$;
let Q1, Q2, S1, S2;
let C, D, Z, G;
let K, K3, K7, B3, S3, G5, D4;
let N;

const Z$ = '                         ';

async function main() {
  // 10
  G2$ = '';
  Q$ = '';
  C$ = '';
  Z1 = 0;
  Z2 = 0;
  Z3 = 0;
  R1 = 0;
  R2 = 0;

  print('\n'.repeat(10));
  print('                                    ,------*------,');
  print("                    ,-------------   '---  ------'");
  print("                     '-------- --'      / /");
  print("                         ,---' '-------/ /--,");
  print("                          '----------------'");
  print('');
  print('                    THE USS ENTERPRISE --- NCC-1701');
  print('\n'.repeat(4));

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
  B9 = 2;
  K9 = 0;
  X$ = '';
  X0$ = ' IS ';

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
    X$ = 'S';
    X0$ = ' ARE ';
  }

  print('YOUR ORDERS ARE AS FOLLOWS:');
  print('     DESTROY THE ', K9, ' KLINGON WARSHIPS WHICH HAVE INVADED');
  print('   THE GALAXY BEFORE THEY CAN ATTACK FEDERATION HEADQUARTERS');
  print(
    '   ON STARDATE ',
    T0 + T9,
    '  THIS GIVES YOU ',
    T9,
    ' DAYS.  THERE',
    X0$
  );
  print('  ', B9, ' STARBASE', X$, ' IN THE GALAXY FOR RESUPPLYING YOUR SHIP');
  print();
  // REM PRINT"HIT ANY KEY EXCEPT RETURN WHEN READY TO ACCEPT COMMAND"
  I = RND(1);
  //REM IF INP(1)=13 THEN 1300

  //1310 REM HERE ANY TIME NEW QUADRANT ENTERED
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
      print('YOUR MISSION BEGINS WITH YOUR STARSHIP LOCATED');
      print("IN THE GALACTIC QUADRANT, '", G2$, "'.");
    } else {
      print('NOW ENTERING ', G2$, ' QUADRANT . . .');
    }
    print();
    K3 = Math.floor(G[Q1][Q2] * 0.01);
    B3 = Math.floor(G[Q1][Q2] * 0.1) - 10 * K3;
    S3 = G[Q1][Q2] - 100 * K3 - 10 * B3;

    if (K3 != 0) {
      print('COMBAT AREA      CONDITION RED');
      if (S <= 200) {
        print('   SHIELDS DANGEROUSLY LOW');
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
  A$ = '<*>';
  Z1 = S1;
  Z2 = S2;
  insertInStringForQuadrant();

  if (K3 >= 1) {
    // 1720
    for (let i = 1; i <= K3; i++) {
      findEmptyPlaceInQuadrant();
      A$ = '+K+';
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
    A$ = '>!<';
    Z1 = R1;
    B4 = R1;
    Z2 = R2;
    B5 = R2;
    insertInStringForQuadrant();
  }

  for (let i = 1; i <= 5; i++) {
    findEmptyPlaceInQuadrant();
    A$ = ' * ';
    Z1 = R1;
    Z2 = R2;
    insertInStringForQuadrant();
  }

  // 1980 GOSUB6430
  await shortRangeSensorScanAndStartup();

  while (true) {
    // 1990
    if (S + E <= 10 || (E < 10 && D[7] != 0)) {
      print();
      print("** FATAL ERROR **   YOU'VE JUST STRANDED YOUR SHIP IN SPACE");
      print('YOU HAVE INSUFFICIENT MANEUVERING ENERGY, AND SHIELD CONTROL');
      print('IS PRESENTLY INCAPABLE OF CROSS-CIRCUITING TO ENGINE ROOM!!');
      endOfGame();
    }

    // 2060
    A$ = await input('COMMAND');
    // 2140
    switch (A$.toUpperCase()) {
      case 'NAV': {
      }
      case 'SRS': {
        await shortRangeSensorScanAndStartup();
        break;
      }
      case 'LRS': {
        await commandLongRangeScan();
        break;
      }
      case 'PHA': {
        await commandPhaserControl();
        break;
      }
      case 'TOR': {
      }
      case 'SHE': {
        await commandShieldControl();
        break;
      }
      case 'DAM': {
        await commandDamageControl();
        break;
      }
      case 'COM': {
      }
      case 'XXX': {
        return endOfGame({ showStardate: false });
      }
      default: {
        print('ENTER ONE OF THE FOLLOWING:');
        print('  NAV  (TO SET COURSE)');
        print('  SRS  (FOR SHORT RANGE SENSOR SCAN)');
        print('  LRS  (FOR LONG RANGE SENSOR SCAN)');
        print('  PHA  (TO FIRE PHASERS)');
        print('  TOR  (TO FIRE PHOTON TORPEDOES)');
        print('  SHE  (TO RAISE OR LOWER SHIELDS)');
        print('  DAM  (FOR DAMAGE CONTROL REPORTS)');
        print('  COM  (TO CALL ON LIBRARY-COMPUTER)');
        print('  XXX  (TO RESIGN YOUR COMMAND)');
        print();
        // GOTO 1990
      }
    }
  }
}

/************************************************************************/

async function commandLongRangeScan() {
  // 3990 REM LONG RANGE SENSOR SCAN CODE
  if (D[3] < 0) {
    print('LONG RANGE SENSORS ARE INOPERABLE');
    return;
  }
  print('LONG RANGE SCAN FOR QUADRANT ', Q1, ' , ', Q2);
  const N = [];
  const O1$ = '-------------------';
  print(O1$);
  for (let I = Q1 - 1; I <= Q1 + 1; I++) {
    let out = '';
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
      out = out + ': ';
      if (N[L] < 0) {
        out += '*** ';
      } else {
        out += ('' + N[L]).padStart(3, '0') + ' ';
      }
    }
    out += ':';
    print(out);
    print(O1$);
  }
}

async function commandPhaserControl() {
  // 4250 REM PHASER CONTROL CODE BEGINS HERE
  if (D[4] < 0) {
    print('PHASERS INOPERATIVE');
    return;
  }
  if (K3 <= 0) {
    print("SCIENCE OFFICER SPOCK REPORTS  'SENSORS SHOW NO ENEMY SHIPS");
    print("                                IN THIS QUADRANT'");
    return;
  }
  if (D[8] < 0) {
    print('COMPUTER FAILURE HAMPERS ACCURACY');
  }
  print('PHASERS LOCKED ON TARGET;  ENERGY AVAILABLE = ', E, ' UNITS');
  let X;
  while (true) {
    X = parseInt(await input('NUMBER OF UNITS TO FIRE'));
    if (X <= 0) return;
    if (E - X >= 0) {
      break;
    }
    print('ENERGY AVAILABLE = ', E, ' UNITS');
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
    print("X ", X, " H1 ", H1, " H ", H);
    if (H <= 0.15 * K[I][3]) {
      print('SENSORS SHOW NO DAMAGE TO ENEMY AT ', K[I][1], ' , ', K[I][2]);
      continue;
    }
    K[I][3] = K[I][3] - H;

    print(H, ' UNIT HIT ON KLINGON AT SECTOR ', K[I][1], ' , ', K[I][2]);
    if (K[I][3] <= 0) {
      print('*** KLINGON DESTROYED ***');
      K3 = K3 - 1;
      K9 = K9 - 1;

      Z1 = K[I][1];
      Z2 = K[I][2];
      A$ = '   ';
      insertInStringForQuadrant();

      K[(I, 3)] = 0;
      G[Q1][Q2] = G[Q1][Q2] - 100;
      Z[Q1][Q2] = G[Q1][Q2];

      if (K9 <= 0) {
        return endOfGame({ won: true });
      }
    } else {
      print('   (SENSORS SHOW ', K[I][3], ' UNITS REMAINING)');
    }
  }
  klingonsShoot();
}

async function klingonsShoot() {
  //  5990 REM KLINGONS SHOOTING
  if (K3 <= 0) {
    return;
  }
  if (D0 != 0) {
    print('STARBASE SHIELDS PROTECT THE ENTERPRISE');
    return;
  }
  for (let I = 1; I <= 3; I++) {
    if (K[I][3] <= 0) {
      continue;
    }

    H = Math.floor((K[I][3] / FND(I)) * (2 + RND(1)));
    S = S - H;
    K[I][3] = K[I][3] / (3 + RND(0));

    print(H, ' UNIT HIT ON ENTERPRISE FROM SECTOR ', K[I][1], ' , ', K[I][2]);

    if (S <= 0) {
      return endOfGame({ destroyed: true });
    }

    print('      <SHIELDS DOWN TO ', S, ' UNITS>');
    if (H < 20) {
      continue;
    }
    if (RND(1) > 0.6 || H / S <= 0.02) {
      continue;
    }

    R1 = FNR(1);
    D[R1] = D[R1] - H / S - 0.5 * RND(1);
    deviceNameByIndex();
    print('DAMAGE CONTROL REPORTS ', G2$, " DAMAGED BY THE HIT");
  }
}

async function commandShieldControl() {
  // 5520 REM SHIELD CONTROL
  if (D[7] < 0) {
    print('SHIELD CONTROL INOPERABLE');
    return;
  }

  print('ENERGY AVAILABLE = ', E + S);
  const X = parseInt(await input('NUMBER OF UNITS TO SHIELDS'));
  if (X < 0 || S == X) {
    print('<SHIELDS UNCHANGED>');
    return;
  }
  if (X > E + S) {
    print("SHIELD CONTROL REPORTS  'THIS IS NOT THE FEDERATION TREASURY.'");
    print('<SHIELDS UNCHANGED>');
    return;
  }

  E = E + S - X;
  S = X;

  print('DEFLECTOR CONTROL ROOM REPORT:');
  print("  'SHIELDS NOW AT ", Math.floor(S), " UNITS PER YOUR COMMAND.'");
}

async function commandDamageControl() {
  // 5680 REM DAMAGE CONTROL
  if (D[6] < 0) {
    print('DAMAGE CONTROL REPORT NOT AVAILABLE');
    return;
  }

  // 5910
  print();
  print('DEVICE             STATE OF REPAIR');
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
    print('TECHNICIANS STANDING BY TO EFFECT REPAIRS TO YOUR SHIP;');
    print(
      'ESTIMATED TIME TO REPAIR: ',
      0.01 * Math.floor(100 * D3),
      ' STARDATES'
    );
    const A$ = await input('WILL YOU AUTHORIZE THE REPAIR ORDER (Y/N)');
    if (A$.toUpperCase() != 'Y') {
      return;
    }
    for (let I = 1; I <= 8; I++) {
      D[I] = 0;
    }
    T = T + D3 + 0.1;
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
      'THE ENTERPRISE HAS BEEN DESTROYED.  THEN FEDERATION WILL BE CONQUERED'
    );
  }

  if (showStardate) {
    print('IT IS STARDATE ', T);
  }

  if (!won) {
    print('THERE WERE ', K9, ' KLINGON BATTLE CRUISERS LEFT AT');
    print('THE END OF YOUR MISSION.');
  } else {
    // 6370
    print('CONGRULATION, CAPTAIN!  THEN LAST KLINGON BATTLE CRUISER');
    print('MENACING THE FDERATION HAS BEEN DESTROYED.');
    print();
    print('YOUR EFFICIENCY RATING IS ', (1000 * (K7 / (T - T0))) ^ 2);
  }

  print();
  print();

  if (B9 > 0) {
    print('THE FEDERATION IS IN NEED OF A NEW STARSHIP COMMANDER');
    print('FOR A SIMILAR MISSION -- IF THERE IS A VOLUNTEER,');
    A$ = await input("LET HIM STEP FORWARD AND ENTER 'AYE'");
    // HACK: recursive call to main seem dirty, but better than a GOTO
    if (A$.toUpperCase() == 'AYE') return main();
  }

  // 6360 END
  process.exit();
}

async function shortRangeSensorScanAndStartup() {
  // 6420 REM SHORT RANGE SENSOR SCAN & STARTUP SUBROUTINE
  // 6430
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

      A$ = '>!<';
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
    C$ = 'DOCKED';
    E = E0;
    P = P0;
    print('SHIELDS DROPPED FOR DOCKING PURPOSES');
    S = 0;
  } else {
    // 6650 IFK3>0THENC$="*RED*":GOTO6720
    if (K3 > 0) {
      C$ = 'RED';
    }
    // 6660 C$="GREEN":IFE<E0*.1THENC$="YELLOW"
    C$ = 'GREEN';
    if (E < E0 * 0.1) {
      C$ = 'YELLOW';
    }
  }

  if (D[2] < 0) {
    // 6730
    print();
    print('*** SHORT RANGE SENSORS ARE OUT ***');
    print();
    return;
  }

  // 6770
  const O1$ = '---------------------------------';
  print(O1$);
  for (let I = 1; I <= 8; I++) {
    print(
      ' ' +
        Q$.substring((I - 1) * 24, (I - 1) * 24 + 24) +
        [
          '',
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

// 8580 REM FIND EMPTY PLACE IN QUADRANT (FOR THINGS)
function findEmptyPlaceInQuadrant() {
  Z3 = 0;
  while (Z3 == 0) {
    R1 = FNR(1);
    R2 = FNR(1);
    A$ = '   ';
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
  const S8 = Math.floor(Z2 - 0.5) * 3 + Math.floor(Z1 - 0.5) * 24;
  if (A$.length != 3) {
    throw 'ERROR';
  }
  Q$ = Q$.slice(0, S8) + A$ + Q$.slice(S8 + 3);
}

// 8780 REM PRINTS DEVICE NAME
function deviceNameByIndex(R1) {
  G2$ = [
    '', // FIXME: 1-based index
    'WARP ENGINES',
    'SHORT RANGE SENSORS',
    'LONG RANGE SENSORS',
    'PHASER CONTROL',
    'PHOTON TUBES',
    'DAMAGE CONTROL',
    'SHIELD CONTROL',
    'LIBRARY-COMPUTER',
  ][R1];
}

// 9010 REM QUADRANT NAME IN G2$ FROM Z4,Z5 (=Q1,Q2)
function buildQuadrantName() {
  if (Z5 <= 4) {
    G2$ = [
      '', // FIXME: 1-based index
      'ANTARES',
      'RIGEL',
      'PROCYON',
      'VEGA',
      'CANOPUS',
      'ALTAIR',
      'SAGITTARIUS',
      'POLLUX',
    ][Z4];
  } else {
    G2$ = [
      '', // FIXME: 1-based index
      'SIRIUS',
      'DENEB',
      'CAPELLA',
      'BETELGEUSE',
      'ALDEBARAN',
      'REGULUS',
      'ARCTURUS',
      'SPICA',
    ][Z4];
  }
  if (G5 != 1) {
    G2$ = G2$ + ['', ' I', ' II', ' III', ' IV'][Z5 % 4];
  }
}

main().then(process.exit).catch(console.log);
