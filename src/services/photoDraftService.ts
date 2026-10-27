let photos: string[] = [];

export function getDraftPhotos(): string[] {
  return photos;
}

export function addDraftPhoto(uri: string) {
  photos = [...photos, uri];
}

export function removeDraftPhoto(uri: string) {
  photos = photos.filter((p) => p !== uri);
}

export function clearDraftPhotos() {
  photos = [];
}
