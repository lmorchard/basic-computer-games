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

// 330 DIM K(3,3),N(3),D(8)

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

const Z = [];
const G = [];

for (let i = 1; i <= 8; i++) {
  G[i] = [];
  Z[i] = [];
  for (let j = 1; j <= 8; j++) {
    Z[i][j] = 0;
    const R1 = Math.random();
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
    B3 = 0;
    if (Math.random() > 0.96) {
      B3 = 1;
      B9 = B9 + 1;
    }
    G[i][i] = K3 * 100 + B3 * 10 + FNR(1);
  }
}

if (K9 > T9) {
  T9 = K9 + 1;
}

// 1100 IFB9<>0THEN1200
// 1150 IFG(Q1,Q2)<200THENG(Q1,Q2)=G(Q1,Q2)+120:K9=K9+1
// 1160 B9=1:G(Q1,Q2)=G(Q1,Q2)+10:Q1=FNR(1):Q2=FNR(1)
if (B9 === 0) {
  if (G[Q1][Q2] < 200) { G[Q1][Q2] = G[Q1][Q2] + 120 }
  K9=K9+1;
  B9=1;
  G[Q1][Q2] = G[Q1][Q2] + 10;
  Q1 = FNR(1);
  Q2 = FNR(1);
}

let K7 = K9;
if (B9 !== 1) { X$="S"; X0$=" ARE " }

print("YOUR ORDERS ARE AS FOLLOWS:");
print("     DESTROY THE ",K9," KLINGON WARSHIPS WHICH HAVE INVADED");
print("   THE GALAXY BEFORE THEY CAN ATTACK FEDERATION HEADQUARTERS");
print("   ON STARDATE ",T0+T9,"  THIS GIVES YOU ",T9," DAYS.  THERE",X0$);
print("  ",B9," STARBASE",X$," IN THE GALAXY FOR RESUPPLYING YOUR SHIP");
print();
// REM PRINT"HIT ANY KEY EXCEPT RETURN WHEN READY TO ACCEPT COMMAND"
I=RND(1);
//REM IF INP(1)=13 THEN 1300

