import { imgLoader } from '../../load';

const img = imgLoader('assets/bosses/snake');

export default {
    width: 1,
    height: 1,
    rendWidth: 1,
    rendHeight: 1.5,
    speed: 1,
    frames: {
        dead: img(['snake_dead1.png', 'snake_dead2.png', 'snake_dead3.png', 'snake_dead4.png', 'snake_dead5.png', 'snake_dead6.png']),
        headUp: img(['snake_head_up.png']),
        headDown: img(['snake_head_down.png']),
        headLeft: img(['snake_head_left1.png', 'snake_head_left2.png', 'snake_head_left3.png','snake_head_left4.png']),
        headRight: img(['snake_head_right1.png', 'snake_head_right2.png', 'snake_head_right3.png','snake_head_right4.png']),
        segUp: img(['snake_seg_up1.png', 'snake_seg_up2.png']),
        segDown: img(['snake_seg_down1.png', 'snake_seg_down2.png']),
        segLeft: img(['snake_seg_left1.png', 'snake_seg_left2.png']),
        segRight: img(['snake_seg_right1.png', 'snake_seg_right2.png']),
        hvostUp: img(['snake_hvost_up1.png','snake_hvost_up2.png', 'snake_hvost_up3.png','snake_hvost_up4.png']),
        hvostDown: img(['snake_hvost_down1.png','snake_hvost_down2.png', 'snake_hvost_down3.png','snake_hvost_down4.png']),
        hvostLeft: img(['snake_hvost_left1.png','snake_hvost_left2.png', 'snake_hvost_left3.png','snake_hvost_left4.png']),
        hvostRight: img(['snake_hvost_right1.png','snake_hvost_right2.png', 'snake_hvost_right3.png','snake_hvost_right4.png']),
    },
};
