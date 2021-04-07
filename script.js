
/* Initial am presupus: -pentru găsirea unui dreptunghi este necesar să căutăm 4 puncte diferite cu proprietatea ca:
   cele două colțuri din stânga(puncte) trebuie să fie pe aceeași linie, adică să aibă același x, dar trebuie sa aibă y-ul diferit.
   Colțurile din dreapta, trebuie să aibă din nou același x, cele de sus să aibă același y, iar cele de jos din nou să fie cu același y.
   Aceste proprietăți ne ajută in momentul in care presupunem că fiecare punct găsit este un potențial colț stânga al dreptughiului și parcurgând
   in sens orar colțurile acestuia pentru a găsi potențiale colțuri.

   Ulterior am găsit o soluție mai simplă, nu mai este necesară parcurgerea orară a punctelor.
   Tratăm din nou fiecare punct ca fiind un potențial colț stânga, după căutăm puncte care sunt potențiale  puncte dreapta sus,fiecare
   punct poate insemna un dreptunghi, dacă validăm și colțul stânga sus și colțul dreapta jos,colțul stânga sus având ca și coordonate x-ul din punctul initial si y-ul 
   punctului din dreapta sus, respectiv invers pentru punctul din dreapta jos.

   Pe scurt mi-am pus toate punctele intr-un tabel, am parcurs fiecare punct și l-am tratat ca fiind un colț stânga jos, in momentul in care
   găsim un colț dreapta sus(isInUpperRight) cu conditia respectivă, căutăm ulterior in tabel dacă există colțul stânga sus și colțul dreapta jos,
   in cazul in care acestea se află in tabel, creștem numărul dreptunghiurilor găsite.
*/

function rectangleCount(coords) {
  //introducem coordonatele sub forma unui hashtable,se poate folosi si set
  const coordsTable = getCoordsTable(coords);
  //functia care ne calculeaza numarul de dreptunghiuri
  return getRectangleCount(coords, coordsTable);
}


function getCoordsTable(coords) {
   const coordsTable = {};
   for( const coord of coords) {
       //le punem sub forma [x-y]
       const coordString = coordToString(coord);
       //validam fiecare punct
       coordsTable[coordString] = true;
   }
   return coordsTable;
}

function getRectangleCount(coords, coordsTable) {
    let rectangleCount = 0;
    for(const [x1, y1] of coords) {
        for(const [x2, y2] of coords) {
            //cautam poteantiale puncte care sa fie coltul din dreapta al dreptunghiului, adica opusul celui din stanga jos [x1, y1]
            if(!isInUpperRight([x1, y1], [x2, y2])) continue;
            const upperCoordString = coordToString([x1, y2]); // acesta va fi punctul din stanga sus are acelasi x cu punctul de pornire si acelasi y cu cel gasit.
            const rightCoordString = coordToString([x2, y1]);  // acesta va fi punctul din dreapta jos 
            //cautam acesta puncte in tabel,daca ele exista inseamna ca exista si un dreptunghi
            if (upperCoordString in coordsTable && rightCoordString in coordsTable) rectangleCount++;
        }

    }
    return rectangleCount;
}

function isInUpperRight(coord1, coord2) {
    //conditia ca sa fie un potential punct din coltul drept sus este ca x2 > x1 si y2 > y1
    const[x1, y1] = coord1;
    const[x2, y2] = coord2;
    return x2 > x1 && y2 > y1;
}


function coordToString(coord) {
    const [x, y] = coord;
    return `${x}-${y}`;
}  


const coords = [
    [1, 1],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 1],
    [3, 3]
];

console.log(rectangleCount(coords));