import { isVisible } from './utils';

interface SiteSpecificApi {
  getSubtitleElement: () => HTMLElement;
  getSubtitlePopupMountTarget: () => HTMLElement;
  pause: () => void;
}

const siteApiMap: Record<string, SiteSpecificApi> = {
  'www.netflix.com': {
    getSubtitleElement: () => document.querySelector<HTMLElement>('.player-timedtext')!,
    getSubtitlePopupMountTarget: () => document.querySelector<HTMLElement>('.watch-video')!,
    pause: () => {
      document.querySelector<HTMLButtonElement>(
        '[data-uia^="control-play-pause-pause"]',
      )?.click();
    }
  },
  'www.youtube.com': {
    getSubtitleElement: () => document.querySelector('#movie_player .ytp-caption-window-container')!,
    getSubtitlePopupMountTarget: () => document.querySelector('#movie_player')!,
    pause: () => {
      if (document.querySelector<HTMLVideoElement>('#movie_player video')!.paused) return;
      document.querySelector<HTMLButtonElement>('#movie_player .ytp-play-button')?.click();
    }
  },
  // 'www.amazon.*': {
  //   getSubtitleElement: () => document.querySelector('#movie_player .ytp-caption-window-container')!,
  //   getSubtitlePopupMountTarget: () => document.querySelector('#movie_player')!,
  //   pause: () => {
  //     if (document.querySelector<HTMLVideoElement>('#movie_player video')!.paused) return;
  //     document.querySelector<HTMLButtonElement>('#movie_player .ytp-play-button')?.click();
  //   }
  // },
  // 'www.disneyplus.com': {
  //   getSubtitleElement: () => document.querySelector('#movie_player .ytp-caption-window-container')!,
  //   getSubtitlePopupMountTarget: () => document.querySelector('#movie_player')!,
  //   pause: () => {
  //     if (document.querySelector<HTMLVideoElement>('#movie_player video')!.paused) return;
  //     document.querySelector<HTMLButtonElement>('#movie_player .ytp-play-button')?.click();
  //   }
  // },
  // 'www.max.com': {
  //   getSubtitleElement: () => document.querySelector('#movie_player .ytp-caption-window-container')!,
  //   getSubtitlePopupMountTarget: () => document.querySelector('#movie_player')!,
  //   pause: () => {
  //     if (document.querySelector<HTMLVideoElement>('#movie_player video')!.paused) return;
  //     document.querySelector<HTMLButtonElement>('#movie_player .ytp-play-button')?.click();
  //   }
  // },
};

export function getSiteSpecificApi() {
    return siteApiMap[location.host];
}
