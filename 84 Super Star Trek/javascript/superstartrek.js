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

function print(...messages) {
  console.log(messages.join(""));
}

const RND = () => Math.random();

let G2$ = "";
let Q$ = "";

print("\n".repeat(10));
print("                                    ,------*------,");
print("                    ,-------------   '---  ------'");
print("                     '-------- --'      / /");
print("                         ,---' '-------/ /--,");
print("                          '----------------'");
print("");
print("                    THE USS ENTERPRISE --- NCC-1701");
print("\n".repeat(4));

const Z$ = "                         ";

// 330 DIM N(3),D(8)

let T = Math.floor(Math.random() * 20 + 20) * 100;
let T0 = T;
let T9 = 25 + Math.floor(Math.random() * 10);
let D0 = 0;
let E = 3000;
let E0 = E;
let P = 10;
let P0 = P;
let S9 = 200;
let S = 0;
let B9 = 2;
let K9 = 0;
let X$ = "";
let X0$ = " IS ";

const FND = (D) => sqrt((K(I, 1) - S1) ^ (2 + (K(I, 2) - S2)) ^ 2);
const FNR = () => Math.floor(Math.random() * 7.98 + 1.01);

// 480 REM INITIALIZE ENTERPRIZE'S POSITION
let Q1 = FNR();
let Q2 = FNR();
let S1 = FNR();
let S2 = FNR();

let C = [];
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

let D = [];
for (let i = 1; i <= 8; i++) {
  D[i] = 0;
}

const A1$ = "NAVSRSLRSPHATORSHEDAMCOMXXX";

// 810 REM SETUP WHAT EXHISTS IN GALAXY . . .
// 815 REM K3= # KLINGONS  B3= # STARBASES  S3 = # STARS

let K3 = 0;
let B3 = 0;
let S3 = 0;

const Z = [];
const G = [];

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

let K7 = K9;
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

//1310 REM HERE ANY TIME NEW QUADRANT ENTERED
Z4 = Q1;
Z5 = Q2;
K3 = 0;
B3 = 0;
S3 = 0;
G5 = 0;
D4 = 0.5 * Math.random();
Z[Q1][Q2] = G[Q1][Q2];

let K = [
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
    print("COMBAT AREA      CONDITION RED", K3);
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
  for (let i = 1; i <= K3; i++) {}
  // 1720 FORI=1TOK3:GOSUB8590:A$="+K+":Z1=R1:Z2=R2
// 1780 GOSUB8670:K(I,1)=R1:K(I,2)=R2:K(I,3)=S9*(0.5+RND(1)):NEXTI
}
// 1820 IFB3<1THEN1910
// 1880 GOSUB8590:A$=">!<":Z1=R1:B4=R1:Z2=R2:B5=R2:GOSUB8670
// 1910 FORI=1TOS3:GOSUB8590:A$=" * ":Z1=R1:Z2=R2:GOSUB8670:NEXTI

// 1980 GOSUB6430

// 8660 REM INSERT IN STRING ARRAY FOR QUADRANT
function insertInStringForQuadrant() {
  const S8 = Math.floor(Z2 - 0.5) * 3 + Math.floor(Z1 - 0.5) * 24 + 1;
  if (A$.length != 3) {
    throw "ERROR";
  }
  // 8680 IFS8=1THENQ$=A$+RIGHT$(Q$,189):RETURN
  // 8690 IFS8=190THENQ$=LEFT$(Q$,189)+A$:RETURN
  // 8700 Q$=LEFT$(Q$,S8-1)+A$+RIGHT$(Q$,190-S8):RETURN
  if (S8 == 1) {
    Q$ = A$ + Q$.substring(3, 192);
  } else if (S8 == 190) {
    Q$ = Q$.substring(0, 190) + A$;
  } else {
    Q$ = Q$.substring(0, S8 - 1) + A$ + Q$.substring(S8 + 1, 192);
  }
}

// 8780 REM PRINTS DEVICE NAME
function printDeviceName() {
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
