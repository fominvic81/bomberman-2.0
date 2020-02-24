function isCollide(e1, e2) {
    if (e1.x < e2.x + e2.width/2 + e2.width/2 &&
        e1.x + e1.width/2 + e2.width/2 > e2.x &&
        e1.y < e2.y + e2.height/2 + e2.height/2 &&
        e1.y + e1.height/2 + e2.height/2 > e2.y) {
        return true;
     }
}

function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

