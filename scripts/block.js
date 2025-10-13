const currentBrowser = typeof chrome === 'undefined' ? browser : chrome;

function removeSideBarIcon() {
  const sideBarIconMini = document.querySelector("ytd-mini-guide-entry-renderer[aria-label=Shorts]");
  if (sideBarIconMini) sideBarIconMini.remove();

  const sideBarIconNormal = document.querySelector("ytd-guide-entry-renderer a[title=Shorts]");
  if (sideBarIconNormal) sideBarIconNormal.remove();
}

function removeShortsCaroussel() {
  const videosCaroussel = document.querySelectorAll('ytd-rich-section-renderer ytd-rich-shelf-renderer');
  videosCaroussel.forEach(singleCaroussel => {
    const isShortsCaroussel = singleCaroussel.querySelector('#dismissible > #rich-shelf-header-container > #rich-shelf-header > h2 #title-container #title').textContent.trim() === 'Shorts';
    if (isShortsCaroussel) singleCaroussel.remove();
  });
}

function removeShortsCarousselFromSearch() {
  const videosCaroussel = document.querySelectorAll('grid-shelf-view-model');
  videosCaroussel.forEach(singleCaroussel => {
    const isShortsCaroussel = singleCaroussel.querySelector('yt-section-header-view-model yt-shelf-header-layout h2 > span').textContent.trim() === 'Shorts';
    if (isShortsCaroussel) singleCaroussel.remove();
  });
}

function removeShortsBetweenVideos() {
  const thumbnails = document.querySelectorAll('ytd-thumbnail a');
  thumbnails.forEach(singleThumbnail => {
    const isShortsThumbnail = singleThumbnail.href.includes('/shorts/');
    if (isShortsThumbnail) singleThumbnail.closest('ytd-video-renderer').remove();
  });
}

function removeShortsFromVideoArea() {
  const shortsInVideoSideBar = document.querySelector("ytd-reel-shelf-renderer");
  if (shortsInVideoSideBar) shortsInVideoSideBar.remove();
}

function blockShorts() {
  setInterval(() => {
    removeSideBarIcon();
    removeShortsCaroussel();
    removeShortsCarousselFromSearch();
    removeShortsFromVideoArea();
    removeShortsBetweenVideos();
  }, 1000); // Each 1 second
}

async function runWhenPageReady() {
  if (document.querySelector("body ytd-app #content")) {
    const isBlockingShorts = await currentBrowser.storage.local.get("isActive").then((result) => {
      return result.isActive ?? true;
    });

    if (isBlockingShorts) {
      blockShorts();
    }

  } else {
    setTimeout(runWhenPageReady, 500);
  }
}

(async () => {
  await runWhenPageReady();
})();
