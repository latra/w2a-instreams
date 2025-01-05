export const pickPlaceholders = [
  './assets/top_splash_placeholder.svg',
  './assets/jung_splash_placeholder.svg',
  './assets/mid_splash_placeholder.svg',
  './assets/bot_splash_placeholder.svg',
  './assets/sup_splash_placeholder.svg'
];

export const banPlaceholderImage = './assets/ban_placeholder.svg';

export const isValidPick = (pick: any) => {
  return pick?.champion?.name && !pick.champion.name.startsWith('-');
};

export const isValidBan = (ban: any) => {
  return ban?.champion?.name && !ban.champion.name.startsWith('-');
}; 