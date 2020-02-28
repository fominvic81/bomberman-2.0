function isCollide(e1, e2) {
    if (e1.x < e2.x + e2.width/2 + e2.width/2 &&
        e1.x + e1.width/2 + e2.width/2 > e2.x &&
        e1.y < e2.y + e2.height/2 + e2.height/2 &&
        e1.y + e1.height/2 + e2.height/2 > e2.y) {
        return true;
     } else {
         return false;
     }
}

function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 2);
}

