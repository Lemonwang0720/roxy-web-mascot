/** Current registered artwork. Layer order is the shader joint contract.
 * Replace public/layers/*.webp while preserving the registered canvas.
 * Slots 6 and 10 are intentionally empty; neither requires an image request.
 */
const parts = [
  'body',
  'cape-left',
  'cape-right',
  'braid-left',
  'braid-right',
  'hat-tip',
  null,
  'free-arm',
  'staff',
  'collar',
  null,
  'lower-body',
] as const;
export async function loadMascotLayers(baseUrl: string) {
  return Promise.all(
    parts.map(async (name) => {
      const canvas = document.createElement('canvas');
      canvas.width = name ? 1024 : 1;
      canvas.height = name ? 1536 : 1;
      if (name) {
        const image = new Image();
        image.src = baseUrl + name + '.webp';
        await image.decode();
        if (image.naturalWidth !== 1024 || image.naturalHeight !== 1536)
          throw Error('Invalid registered mascot layer: ' + name);
        canvas.getContext('2d')!.drawImage(image, 0, 0);
      }
      return canvas;
    }),
  );
}
