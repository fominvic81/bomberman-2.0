import { imgLoader, img } from '../../load';

const imgs = imgLoader('assets/player');

export default {
    width: 0.8,
    height: 0.8,
    rendWidth: 1.6,
    rendHeight: 1.6,
    speed: 4,
    upFrames: imgs(['player_up1.png', 'player_up2.png', 'player_up3.png', 'player_up4.png']),
    downFrames: imgs(['player_down1.png', 'player_down2.png', 'player_down3.png', 'player_down4.png']),
    leftFrames: imgs(['player_left1.png', 'player_left2.png', 'player_left3.png', 'player_left4.png']),
    rightFrames: imgs(['player_right1.png', 'player_right2.png', 'player_right3.png', 'player_right4.png']),
    deadFrames: imgs(['player_dead1.png', 'player_dead2.png', 'player_dead3.png']),
    translateY: -0.1,
    shadowWidth: 1.1,
    shadowHeight: 1.1,
    translateShadowX: 0.15,
    translateShadowY: 0.45,
    shadow: img('assets/player/shadow.png'),
};
