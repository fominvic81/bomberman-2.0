import { imgLoader } from '../../load';

const img = imgLoader('assets/explos');

export default {
    width: 0.6,
    height: 0.6,
    rendWidth: 1,
    rendHeight: 1,
    centerFrames: img(['explos_center1.png', 'explos_center2.png', 'explos_center3.png', 'explos_center4.png', 'explos_center5.png', 'explos_center6.png']),
    upFrames: img(['explos_up1.png', 'explos_up2.png', 'explos_up3.png', 'explos_up4.png', 'explos_up5.png', 'explos_up6.png']),
    upEndFrames: img(['explos_up_end1.png', 'explos_up_end2.png', 'explos_up_end3.png', 'explos_up_end4.png', 'explos_up_end5.png', 'explos_up_end6.png']),
    downFrames: img(['explos_down1.png', 'explos_down2.png', 'explos_down3.png', 'explos_down4.png', 'explos_down5.png', 'explos_down6.png']),
    downEndFrames: img(['explos_down_end1.png', 'explos_down_end2.png', 'explos_down_end3.png', 'explos_down_end4.png', 'explos_down_end5.png', 'explos_down_end6.png']),
    leftFrames: img(['explos_left1.png', 'explos_left2.png', 'explos_left3.png', 'explos_left4.png', 'explos_left5.png', 'explos_left6.png']),
    leftEndFrames: img(['explos_left_end1.png', 'explos_left_end2.png', 'explos_left_end3.png', 'explos_left_end4.png', 'explos_left_end5.png', 'explos_left_end6.png']),
    rightFrames: img(['explos_right1.png', 'explos_right2.png', 'explos_right3.png', 'explos_right4.png', 'explos_right5.png', 'explos_right6.png']),
    rightEndFrames: img(['explos_right_end1.png', 'explos_right_end2.png', 'explos_right_end3.png', 'explos_right_end4.png', 'explos_right_end5.png', 'explos_right_end6.png']),
    life_time: 0.3,
};
