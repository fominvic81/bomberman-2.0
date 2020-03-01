import { imgLoader } from '../../load';

const img = imgLoader('assets/player');

export default {
    width: 0.8,
    height: 0.8,
    rendWidth: 1.3,
    rendHeight: 1.3,
    speed: 3,
    upFrames: img(['player_up1.png', 'player_up2.png', 'player_up3.png', 'player_up4.png']),
    downFrames: img(['player_down1.png', 'player_down2.png', 'player_down3.png', 'player_down4.png']),
    leftFrames: img(['player_left1.png', 'player_left2.png', 'player_left3.png', 'player_left4.png']),
    rightFrames: img(['player_right1.png', 'player_right2.png', 'player_right3.png', 'player_right4.png']),
    deadFrames: img(['player_dead1.png', 'player_dead2.png', 'player_dead3.png']),
};
