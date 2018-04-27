export function getSlides() {
  const context = require.context('../slides', true, /\.md|markdown|\.pug$/);

  return context
    .keys()
    .sort((a, b) => {
      const getSortObject = name => {
        const [, folderName, fileName] = name.split('/');
        return {
          folder: parseInt(folderName.split('-').shift(), 10),
          file: parseInt(fileName.split('.').shift(), 10),
          fileName
        };
      };

      const aSort = getSortObject(a);
      const bSort = getSortObject(b);

      const folderDiff = aSort.folder - bSort.folder;

      if (folderDiff === 0) {
        const fileDiff = aSort.file - bSort.file;
        if (fileDiff === 0) {
          const aSplit = aSort.fileName.split('-');
          const bSplit = bSort.fileName.split('-');
          if (aSplit.length === 1 || bSplit.length === 1) {
            return aSplit.length === 1 && bSplit.length === 1
              ? 0
              : aSplit.length - bSplit.length;
          }
          return aSort.fileName.localeCompare(bSort.fileName);
        }
        return fileDiff;
      }
      return folderDiff;
    })
    .reduce((newSlides, key) => {
      const [, folderName] = key.split('/');
      const index = parseInt(folderName.split('-').shift(), 10);
      if (!newSlides[index]) {
        newSlides[index] = [];
      }

      //To help with reworking React Workshop, allow for single file with multiple slides
      const slide = context(key);
      if (slide.indexOf('<section>') !== -1) {
        const sections = slide
          .replace(/\<section\>/g, '')
          .split('</section>')
          .filter(it => it.length > 0);
        Array.prototype.push.apply(newSlides[index], sections);
      } else {
        newSlides[index].push(slide);
      }

      return newSlides;
    }, []);
}
